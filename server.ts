import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getAvailableSlots,
  bookSlot,
  getCalendarStatus,
} from './server/calendarService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// The dev server must always listen on port 3000
const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Milimakeupart',
    time: new Date().toISOString(),
  });
});

app.get('/api/calendar/status', async (req, res) => {
  try {
    const status = await getCalendarStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error al obtener estado' });
  }
});

app.get('/api/calendar/availability', async (req, res) => {
  try {
    const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
    const duration = parseInt(req.query.duration as string) || 60;

    const availableSlots = await getAvailableSlots(date, duration);
    res.json({
      date,
      duration,
      availableSlots,
    });
  } catch (err: any) {
    console.error('Error in /api/calendar/availability:', err);
    res.status(500).json({ error: err.message || 'Error al obtener disponibilidad' });
  }
});

app.post('/api/calendar/book', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.date || !payload.time || !payload.clientName || !payload.clientPhone) {
      res.status(400).json({ error: 'Faltan campos obligatorios para la reserva.' });
      return;
    }

    const result = await bookSlot(payload);
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/calendar/book:', err);
    res.status(500).json({ error: err.message || 'Error al registrar turno' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const port = Number(PORT);
  app.listen(port, '0.0.0.0', () => {
    console.log(`[Milimakeupart] Server running on http://0.0.0.0:${port} (${isProduction ? 'prod' : 'dev'})`);
  });
}

startServer();
