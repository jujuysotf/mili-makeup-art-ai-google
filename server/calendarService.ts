import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'jujuysotf@gmail.com';
const OPEN_HOUR = 9;
const CLOSE_HOUR = 22;
const TIMEZONE = 'America/Argentina/Tucuman';
const TIMEZONE_OFFSET = '-03:00';

interface BookingPayload {
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  modality: 'estudio' | 'domicilio';
  address?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  notes?: string;
  bookingCode: string;
}

// In-memory store for fallback / dev bookings
const inMemoryBookings: BookingPayload[] = [];

function getAuthClient() {
  try {
    // 1. JSON en variable de entorno
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      return new google.auth.JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
      });
    }

    // 2. Email y Private Key separados
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
      return new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/calendar'],
      });
    }

    // 3. Archivo google-credentials.json
    const credsPath = path.resolve(process.cwd(), 'google-credentials.json');
    if (fs.existsSync(credsPath)) {
      const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
      return new google.auth.JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
      });
    }
  } catch (err) {
    console.warn('[CalendarService] Error al inicializar credenciales de Google:', err);
  }

  return null;
}

export async function getCalendarStatus() {
  const auth = getAuthClient();
  const base = {
    calendarId: CALENDAR_ID,
    openHour: OPEN_HOUR,
    closeHour: CLOSE_HOUR,
  };

  if (!auth) {
    return {
      ...base,
      configured: false,
      connected: false,
      message: 'Modo simulación activo (agrega GOOGLE_SERVICE_ACCOUNT_KEY o google-credentials.json para sincronizar en vivo).',
    };
  }

  try {
    if (process.env.ALLOW_INSECURE_TLS === '1') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }
    const calendar = google.calendar({ version: 'v3', auth });
    const today = new Date().toISOString().split('T')[0];
    const eventsRes = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date(`${today}T00:00:00-03:00`).toISOString(),
      timeMax: new Date(`${today}T23:59:59-03:00`).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });
    return {
      ...base,
      configured: true,
      connected: true,
      busySlotsTodayCount: eventsRes.data.items?.length ?? 0,
      message: `Google Calendar API conectado con ${CALENDAR_ID}`,
    };
  } catch (err: any) {
    const message = err?.message || 'Error al conectar con Google Calendar API';
    console.error('Error in /api/calendar/status:', message);
    return {
      ...base,
      configured: true,
      connected: false,
      error: message,
      message,
      hint: String(message).includes('self-signed certificate')
        ? 'En esta PC hay un proxy/antivirus. Agregá ALLOW_INSECURE_TLS=1 al .env (solo local) y reiniciá.'
        : undefined,
    };
  }
}

export async function getAvailableSlots(dateStr: string, durationMinutes: number): Promise<string[]> {
  const allSlots: string[] = [];
  const maxEndMinutes = CLOSE_HOUR * 60; // 22:00 = 1320

  for (let m = OPEN_HOUR * 60; m < maxEndMinutes; m += 30) {
    if (m + durationMinutes <= maxEndMinutes) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      allSlots.push(`${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
    }
  }

  const auth = getAuthClient();
  const bookedIntervals: { start: number; end: number }[] = [];

  for (const b of inMemoryBookings) {
    if (b.date === dateStr) {
      const start = new Date(`${b.date}T${b.time}:00${TIMEZONE_OFFSET}`).getTime();
      bookedIntervals.push({ start, end: start + b.durationMinutes * 60 * 1000 });
    }
  }

  if (auth) {
    try {
      const calendar = google.calendar({ version: 'v3', auth });
      const timeMin = `${dateStr}T00:00:00${TIMEZONE_OFFSET}`;
      const timeMax = `${dateStr}T23:59:59${TIMEZONE_OFFSET}`;

      const eventsRes = await calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin,
        timeMax,
        timeZone: TIMEZONE,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = eventsRes.data.items || [];
      for (const ev of events) {
        if (ev.status === 'cancelled') continue;
        if (ev.start?.dateTime && ev.end?.dateTime) {
          bookedIntervals.push({
            start: new Date(ev.start.dateTime).getTime(),
            end: new Date(ev.end.dateTime).getTime(),
          });
        } else if (ev.start?.date) {
          bookedIntervals.push({
            start: new Date(`${ev.start.date}T00:00:00${TIMEZONE_OFFSET}`).getTime(),
            end: new Date(`${ev.start.date}T23:59:59${TIMEZONE_OFFSET}`).getTime(),
          });
        }
      }
    } catch (err) {
      console.warn('[CalendarService] Error al consultar Google Calendar, usando simulación local:', err);
    }
  }

  const freeSlots = allSlots.filter((slot) => {
    const candidateStart = new Date(`${dateStr}T${slot}:00${TIMEZONE_OFFSET}`).getTime();
    const candidateEnd = candidateStart + durationMinutes * 60 * 1000;
    const hasOverlap = bookedIntervals.some((b) => candidateStart < b.end && candidateEnd > b.start);
    return !hasOverlap;
  });

  return freeSlots;
}

export async function bookSlot(booking: BookingPayload) {
  // Guardar en memoria local
  inMemoryBookings.push(booking);

  const auth = getAuthClient();
  if (auth) {
    try {
      const calendar = google.calendar({ version: 'v3', auth });

      const [startH, startM] = booking.time.split(':').map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = startMinutes + booking.durationMinutes;

      const endH = Math.floor(endMinutes / 60);
      const endM = endMinutes % 60;

      const startDateTime = `${booking.date}T${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}:00-03:00`;
      const endDateTime = `${booking.date}T${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}:00-03:00`;

      const modalityText = booking.modality === 'domicilio' ? 'A Domicilio' : 'En Estudio (Gral. Paz 1060)';
      const location = booking.modality === 'domicilio'
        ? (booking.address || 'Domicilio acordado en Tucumán')
        : 'General Paz 1060, San Miguel de Tucumán';

      await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: {
          summary: `Turno ${booking.serviceName} - ${booking.clientName} (${booking.bookingCode})`,
          description: `Turno de maquillaje agendado desde Milimakeupart:
• Servicio: ${booking.serviceName} (${booking.durationMinutes} min)
• Modalidad: ${modalityText}
• Clienta: ${booking.clientName}
• Teléfono: ${booking.clientPhone}
• Email: ${booking.clientEmail || 'No informado'}
• Notas: ${booking.notes || 'Ninguna'}
• Código: ${booking.bookingCode}`,
          location,
          start: { dateTime: startDateTime, timeZone: 'America/Argentina/Tucuman' },
          end: { dateTime: endDateTime, timeZone: 'America/Argentina/Tucuman' },
        },
      });

      console.log(`[CalendarService] Evento creado en Google Calendar (${CALENDAR_ID}) para ${booking.bookingCode}`);
    } catch (err) {
      console.error('[CalendarService] Error al crear evento en Google Calendar:', err);
    }
  }

  return {
    success: true,
    bookingCode: booking.bookingCode,
    date: booking.date,
    time: booking.time,
    calendarUpdated: auth !== null,
  };
}
