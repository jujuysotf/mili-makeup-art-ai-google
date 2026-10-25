import express from 'express';
import { bookSlot, getAvailableSlots, getCalendarStatus } from './calendarService';
import {
  buildSessionCookie,
  createSessionToken,
  isAuthenticatedRequest,
  isReelsAdminConfigured,
  loadReelsFile,
  saveReelsFile,
  verifyPassword,
} from './reelsStore';

export function healthHandler(_req: express.Request, res: express.Response) {
  res.status(200).json({
    status: 'ok',
    app: 'Milimakeupart',
    time: new Date().toISOString(),
  });
}

export async function calendarStatusHandler(_req: express.Request, res: express.Response) {
  const status = await getCalendarStatus();
  res.status(200).json(status);
}

export async function calendarAvailabilityHandler(req: express.Request, res: express.Response) {
  try {
    const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
    const duration = parseInt(req.query.duration as string, 10) || 60;
    const availableSlots = await getAvailableSlots(date, duration);
    res.json({ date, duration, availableSlots });
  } catch (err: any) {
    console.error('Error in /api/calendar/availability:', err);
    res.status(500).json({ error: err.message || 'Error al obtener disponibilidad' });
  }
}

export async function calendarBookHandler(req: express.Request, res: express.Response) {
  try {
    const payload = req.body;
    if (!payload?.date || !payload?.time || !payload?.clientName || !payload?.clientPhone) {
      res.status(400).json({ error: 'Faltan campos obligatorios para la reserva.' });
      return;
    }
    const result = await bookSlot(payload);
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/calendar/book:', err);
    res.status(500).json({ error: err.message || 'Error al registrar turno' });
  }
}

export async function reelsListHandler(req: express.Request, res: express.Response) {
  try {
    const data = await loadReelsFile();
    const wantAll = String(req.query?.all || '') === '1';
    if (wantAll) {
      if (!isAuthenticatedRequest(req)) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }
      res.json({ reels: data.reels });
      return;
    }
    res.json({ reels: data.reels.filter((r) => r.active !== false) });
  } catch (err: any) {
    console.error('Error in /api/reels:', err);
    res.status(500).json({ error: err.message || 'Error al leer reels' });
  }
}

export async function reelsSaveHandler(req: express.Request, res: express.Response) {
  try {
    if (!isAuthenticatedRequest(req)) {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }
    if (!Array.isArray(req.body?.reels)) {
      res.status(400).json({ error: 'Formato inválido: se espera { reels: [] }' });
      return;
    }
    const result = await saveReelsFile({ reels: req.body.reels });
    if (!result.ok) {
      res.status(500).json({ error: result.error || 'No se pudo guardar' });
      return;
    }
    res.json({ ok: true, storage: result.storage, reels: (await loadReelsFile()).reels });
  } catch (err: any) {
    console.error('Error in PUT /api/reels:', err);
    res.status(500).json({ error: err.message || 'Error al guardar reels' });
  }
}

export function reelsLoginHandler(req: express.Request, res: express.Response) {
  if (!isReelsAdminConfigured()) {
    res.status(503).json({
      error: 'Falta REELS_ADMIN_PASSWORD en las variables de entorno.',
    });
    return;
  }
  const password = String(req.body?.password || '');
  if (!verifyPassword(password)) {
    res.status(401).json({ error: 'PIN incorrecto' });
    return;
  }
  const token = createSessionToken();
  if (!token) {
    res.status(503).json({ error: 'No se pudo crear la sesión' });
    return;
  }
  res.setHeader('Set-Cookie', buildSessionCookie(token));
  res.json({ ok: true });
}

export function reelsLogoutHandler(_req: express.Request, res: express.Response) {
  res.setHeader('Set-Cookie', buildSessionCookie('', true));
  res.json({ ok: true });
}

export function createApiApp() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  app.get('/api/health', healthHandler);
  app.get('/api/calendar/status', calendarStatusHandler);
  app.get('/api/calendar/availability', calendarAvailabilityHandler);
  app.post('/api/calendar/book', calendarBookHandler);
  app.get('/api/reels', reelsListHandler);
  app.put('/api/reels', reelsSaveHandler);
  app.post('/api/reels/login', reelsLoginHandler);
  app.post('/api/reels/logout', reelsLogoutHandler);
  return app;
}
