// server/createApp.ts
import express from "express";

// server/calendarService.ts
import { google } from "googleapis";
import fs from "fs";
import path from "path";
var CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "jujuysotf@gmail.com";
var inMemoryBookings = [];
function getAuthClient() {
  try {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      return new google.auth.JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ["https://www.googleapis.com/auth/calendar"]
      });
    }
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
      return new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/calendar"]
      });
    }
    const credsPath = path.resolve(process.cwd(), "google-credentials.json");
    if (fs.existsSync(credsPath)) {
      const creds = JSON.parse(fs.readFileSync(credsPath, "utf8"));
      return new google.auth.JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ["https://www.googleapis.com/auth/calendar"]
      });
    }
  } catch (err) {
    console.warn("[CalendarService] Error al inicializar credenciales de Google:", err);
  }
  return null;
}
async function bookSlot(booking) {
  inMemoryBookings.push(booking);
  const auth = getAuthClient();
  if (auth) {
    try {
      const calendar = google.calendar({ version: "v3", auth });
      const [startH, startM] = booking.time.split(":").map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = startMinutes + booking.durationMinutes;
      const endH = Math.floor(endMinutes / 60);
      const endM = endMinutes % 60;
      const startDateTime = `${booking.date}T${startH.toString().padStart(2, "0")}:${startM.toString().padStart(2, "0")}:00-03:00`;
      const endDateTime = `${booking.date}T${endH.toString().padStart(2, "0")}:${endM.toString().padStart(2, "0")}:00-03:00`;
      const modalityText = booking.modality === "domicilio" ? "A Domicilio" : "En Estudio (Gral. Paz 1060)";
      const location = booking.modality === "domicilio" ? booking.address || "Domicilio acordado en Tucum\xE1n" : "General Paz 1060, San Miguel de Tucum\xE1n";
      await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: {
          summary: `Turno ${booking.serviceName} - ${booking.clientName} (${booking.bookingCode})`,
          description: `Turno de maquillaje agendado desde Milimakeupart:
\u2022 Servicio: ${booking.serviceName} (${booking.durationMinutes} min)
\u2022 Modalidad: ${modalityText}
\u2022 Clienta: ${booking.clientName}
\u2022 Tel\xE9fono: ${booking.clientPhone}
\u2022 Email: ${booking.clientEmail || "No informado"}
\u2022 Notas: ${booking.notes || "Ninguna"}
\u2022 C\xF3digo: ${booking.bookingCode}`,
          location,
          start: { dateTime: startDateTime, timeZone: "America/Argentina/Tucuman" },
          end: { dateTime: endDateTime, timeZone: "America/Argentina/Tucuman" }
        }
      });
      console.log(`[CalendarService] Evento creado en Google Calendar (${CALENDAR_ID}) para ${booking.bookingCode}`);
    } catch (err) {
      console.error("[CalendarService] Error al crear evento en Google Calendar:", err);
    }
  }
  return {
    success: true,
    bookingCode: booking.bookingCode,
    date: booking.date,
    time: booking.time,
    calendarUpdated: auth !== null
  };
}

// server/createApp.ts
async function calendarBookHandler(req, res) {
  try {
    const payload = req.body;
    if (!payload?.date || !payload?.time || !payload?.clientName || !payload?.clientPhone) {
      res.status(400).json({ error: "Faltan campos obligatorios para la reserva." });
      return;
    }
    const result = await bookSlot(payload);
    res.json(result);
  } catch (err) {
    console.error("Error in /api/calendar/book:", err);
    res.status(500).json({ error: err.message || "Error al registrar turno" });
  }
}

// server/handlers/http.ts
async function runNodeHandler(request, handler) {
  const url = new URL(request.url);
  let statusCode = 200;
  let payload = null;
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
    }
  };
  await handler(req, res);
  return Response.json(payload, { status: statusCode });
}

// server/handlers/calendarBook.ts
function POST(request) {
  return runNodeHandler(request, calendarBookHandler);
}
export {
  POST
};
