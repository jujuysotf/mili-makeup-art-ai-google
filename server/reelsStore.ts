import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export type ReelItem = {
  id: string;
  title: string;
  badge?: string;
  description?: string;
  /** Link de Instagram (reel o post). Si está, la web usa el embed. */
  url?: string;
  /** Video local opcional (fallback mientras no haya link de Instagram). */
  src?: string;
  active: boolean;
};

export type ReelsFile = {
  reels: ReelItem[];
};

const FILE_PATH = path.resolve(process.cwd(), 'data', 'reels.json');
const BLOB_NAME = 'milimakeupart-reels.json';
const COOKIE_NAME = 'reels_admin';
const SESSION_MS = 12 * 60 * 60 * 1000;

function getAdminPassword(): string {
  return (process.env.REELS_ADMIN_PASSWORD || '').trim();
}

export function isReelsAdminConfigured(): boolean {
  return getAdminPassword().length > 0;
}

function defaultReels(): ReelsFile {
  return { reels: [] };
}

function readLocalFile(): ReelsFile {
  try {
    if (!fs.existsSync(FILE_PATH)) return defaultReels();
    const raw = fs.readFileSync(FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as ReelsFile;
    if (!Array.isArray(parsed?.reels)) return defaultReels();
    return parsed;
  } catch {
    return defaultReels();
  }
}

function writeLocalFile(data: ReelsFile): void {
  const dir = path.dirname(FILE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

type BlobWriteResult = { ok: true } | { ok: false; error: string };

/** El store de Vercel de este proyecto es privado: hay que usar access: 'private'. */
const BLOB_ACCESS = 'private' as const;

async function readBlobFile(): Promise<ReelsFile | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return null;
  try {
    const { get } = await import('@vercel/blob');
    const result = await get(BLOB_NAME, { access: BLOB_ACCESS, token, useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const raw = await new Response(result.stream).text();
    const parsed = JSON.parse(raw) as ReelsFile;
    if (!Array.isArray(parsed?.reels)) return null;
    return parsed;
  } catch (err) {
    // Primer guardado: el blob todavía no existe
    console.warn('[reelsStore] No se pudo leer Blob (puede ser la primera vez):', err);
    return null;
  }
}

async function writeBlobFile(data: ReelsFile): Promise<BlobWriteResult> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return { ok: false, error: 'Falta BLOB_READ_WRITE_TOKEN' };
  try {
    const { put } = await import('@vercel/blob');
    await put(BLOB_NAME, JSON.stringify(data, null, 2), {
      access: BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      token,
    });
    return { ok: true };
  } catch (err: any) {
    const message = err?.message || String(err);
    console.warn('[reelsStore] No se pudo escribir Blob:', message);
    return { ok: false, error: message };
  }
}

export async function loadReelsFile(): Promise<ReelsFile> {
  const fromBlob = await readBlobFile();
  if (fromBlob) return fromBlob;
  return readLocalFile();
}

export async function saveReelsFile(data: ReelsFile): Promise<{ ok: boolean; storage: string; error?: string }> {
  const normalized: ReelsFile = {
    reels: (data.reels || []).map((r, index) => ({
      id: String(r.id || `reel-${Date.now()}-${index}`),
      title: String(r.title || 'Reel').trim() || 'Reel',
      badge: r.badge ? String(r.badge).trim() : undefined,
      description: r.description ? String(r.description).trim() : undefined,
      url: r.url ? String(r.url).trim() : undefined,
      src: r.src ? String(r.src).trim() : undefined,
      active: r.active !== false,
    })),
  };

  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
  const onVercel = Boolean(process.env.VERCEL);

  if (hasBlobToken) {
    const wroteBlob = await writeBlobFile(normalized);
    if (wroteBlob.ok) return { ok: true, storage: 'blob' };
    return {
      ok: false,
      storage: 'none',
      error: `No se pudo escribir en Blob: ${wroteBlob.error}`,
    };
  }

  if (onVercel) {
    return {
      ok: false,
      storage: 'none',
      error:
        'Falta BLOB_READ_WRITE_TOKEN en Vercel. En el Blob Store abrí la pestaña ".env.local", copiá BLOB_READ_WRITE_TOKEN (empieza con vercel_blob_rw_) a Environment Variables y redeployá. BLOB_STORE_ID solo no alcanza.',
    };
  }

  try {
    writeLocalFile(normalized);
    return { ok: true, storage: 'file' };
  } catch (err: any) {
    return {
      ok: false,
      storage: 'none',
      error: err?.message || 'No se pudo guardar data/reels.json en local.',
    };
  }
}

export function createSessionToken(): string | null {
  const password = getAdminPassword();
  if (!password) return null;
  const exp = String(Date.now() + SESSION_MS);
  const sig = crypto.createHmac('sha256', password).update(exp).digest('hex');
  return `${exp}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const password = getAdminPassword();
  if (!password || !token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = crypto.createHmac('sha256', password).update(exp).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword();
  if (!expected) return false;
  const a = Buffer.from(String(password || ''));
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function readSessionFromCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [key, ...rest] = part.trim().split('=');
    if (key === COOKIE_NAME) return decodeURIComponent(rest.join('=') || '');
  }
  return null;
}

export function buildSessionCookie(token: string, clear = false): string {
  const secure = process.env.VERCEL || process.env.NODE_ENV === 'production' ? '; Secure' : '';
  if (clear) {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
  }
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_MS / 1000)}${secure}`;
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}

export function isAuthenticatedRequest(req: { headers?: Record<string, string | string[] | undefined> }): boolean {
  const header = req.headers?.cookie;
  const cookieValue = Array.isArray(header) ? header.join(';') : header;
  const token = readSessionFromCookie(cookieValue);
  return verifySessionToken(token);
}
