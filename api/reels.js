// server/createApp.ts
import express from "express";

// server/calendarService.ts
import { google } from "googleapis";
var CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "jujuysotf@gmail.com";

// server/reelsStore.ts
import fs from "fs";
import path from "path";
import crypto from "crypto";
var FILE_PATH = path.resolve(process.cwd(), "data", "reels.json");
var BLOB_NAME = "milimakeupart-reels.json";
var COOKIE_NAME = "reels_admin";
var SESSION_MS = 12 * 60 * 60 * 1e3;
function getAdminPassword() {
  return (process.env.REELS_ADMIN_PASSWORD || "").trim();
}
function defaultReels() {
  return { reels: [] };
}
function readLocalFile() {
  try {
    if (!fs.existsSync(FILE_PATH)) return defaultReels();
    const raw = fs.readFileSync(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.reels)) return defaultReels();
    return parsed;
  } catch {
    return defaultReels();
  }
}
function writeLocalFile(data) {
  const dir = path.dirname(FILE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}
var BLOB_ACCESS = "private";
async function readBlobFile() {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return null;
  try {
    const { get } = await import("@vercel/blob");
    const result = await get(BLOB_NAME, { access: BLOB_ACCESS, token, useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const raw = await new Response(result.stream).text();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.reels)) return null;
    return parsed;
  } catch (err) {
    console.warn("[reelsStore] No se pudo leer Blob (puede ser la primera vez):", err);
    return null;
  }
}
async function writeBlobFile(data) {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return { ok: false, error: "Falta BLOB_READ_WRITE_TOKEN" };
  try {
    const { put } = await import("@vercel/blob");
    await put(BLOB_NAME, JSON.stringify(data, null, 2), {
      access: BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token
    });
    return { ok: true };
  } catch (err) {
    const message = err?.message || String(err);
    console.warn("[reelsStore] No se pudo escribir Blob:", message);
    return { ok: false, error: message };
  }
}
async function loadReelsFile() {
  const fromBlob = await readBlobFile();
  if (fromBlob) return fromBlob;
  return readLocalFile();
}
async function saveReelsFile(data) {
  const normalized = {
    reels: (data.reels || []).map((r, index) => ({
      id: String(r.id || `reel-${Date.now()}-${index}`),
      title: String(r.title || "Reel").trim() || "Reel",
      badge: r.badge ? String(r.badge).trim() : void 0,
      description: r.description ? String(r.description).trim() : void 0,
      url: r.url ? String(r.url).trim() : void 0,
      src: r.src ? String(r.src).trim() : void 0,
      active: r.active !== false
    }))
  };
  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
  const onVercel = Boolean(process.env.VERCEL);
  if (hasBlobToken) {
    const wroteBlob = await writeBlobFile(normalized);
    if (wroteBlob.ok) return { ok: true, storage: "blob" };
    return {
      ok: false,
      storage: "none",
      error: `No se pudo escribir en Blob: ${wroteBlob.error}`
    };
  }
  if (onVercel) {
    return {
      ok: false,
      storage: "none",
      error: 'Falta BLOB_READ_WRITE_TOKEN en Vercel. En el Blob Store abr\xED la pesta\xF1a ".env.local", copi\xE1 BLOB_READ_WRITE_TOKEN (empieza con vercel_blob_rw_) a Environment Variables y redeploy\xE1. BLOB_STORE_ID solo no alcanza.'
    };
  }
  try {
    writeLocalFile(normalized);
    return { ok: true, storage: "file" };
  } catch (err) {
    return {
      ok: false,
      storage: "none",
      error: err?.message || "No se pudo guardar data/reels.json en local."
    };
  }
}
function verifySessionToken(token) {
  const password = getAdminPassword();
  if (!password || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = crypto.createHmac("sha256", password).update(exp).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}
function readSessionFromCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [key, ...rest] = part.trim().split("=");
    if (key === COOKIE_NAME) return decodeURIComponent(rest.join("=") || "");
  }
  return null;
}
function isAuthenticatedRequest(req) {
  const header = req.headers?.cookie;
  const cookieValue = Array.isArray(header) ? header.join(";") : header;
  const token = readSessionFromCookie(cookieValue);
  return verifySessionToken(token);
}

// server/createApp.ts
async function reelsListHandler(req, res) {
  try {
    const data = await loadReelsFile();
    const wantAll = String(req.query?.all || "") === "1";
    if (wantAll) {
      if (!isAuthenticatedRequest(req)) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }
      res.json({ reels: data.reels });
      return;
    }
    res.json({ reels: data.reels.filter((r) => r.active !== false) });
  } catch (err) {
    console.error("Error in /api/reels:", err);
    res.status(500).json({ error: err.message || "Error al leer reels" });
  }
}
async function reelsSaveHandler(req, res) {
  try {
    if (!isAuthenticatedRequest(req)) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }
    if (!Array.isArray(req.body?.reels)) {
      res.status(400).json({ error: "Formato inv\xE1lido: se espera { reels: [] }" });
      return;
    }
    const result = await saveReelsFile({ reels: req.body.reels });
    if (!result.ok) {
      res.status(500).json({ error: result.error || "No se pudo guardar" });
      return;
    }
    res.json({ ok: true, storage: result.storage, reels: (await loadReelsFile()).reels });
  } catch (err) {
    console.error("Error in PUT /api/reels:", err);
    res.status(500).json({ error: err.message || "Error al guardar reels" });
  }
}

// server/handlers/http.ts
async function runNodeHandler(request, handler) {
  const url = new URL(request.url);
  let statusCode = 200;
  let payload = null;
  const responseHeaders = new Headers();
  const req = {
    url: `${url.pathname}${url.search}`,
    query: Object.fromEntries(url.searchParams.entries()),
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: void 0
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      req.body = await request.json();
    } catch {
      req.body = {};
    }
  }
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      payload = body;
    },
    setHeader(name, value) {
      responseHeaders.set(name, value);
    }
  };
  await handler(req, res);
  responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(payload), { status: statusCode, headers: responseHeaders });
}

// server/handlers/reels.ts
function GET(request) {
  return runNodeHandler(request, reelsListHandler);
}
function PUT(request) {
  return runNodeHandler(request, reelsSaveHandler);
}
export {
  GET,
  PUT
};
