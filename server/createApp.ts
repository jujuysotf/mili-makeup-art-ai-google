import express from 'express';
import { bookSlot, getAvailableSlots, getCalendarStatus } from './calendarService';

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

export function createApiApp() {
  const app = express();
  app.use(express.json());
  app.get('/api/health', healthHandler);
  app.get('/api/calendar/status', calendarStatusHandler);
  app.get('/api/calendar/availability', calendarAvailabilityHandler);
  app.post('/api/calendar/book', calendarBookHandler);
  return app;
}
