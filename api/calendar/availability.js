// server/createApp.ts
import express from "express";

// server/calendarService.ts
import { google } from "googleapis";
import fs from "fs";
import path from "path";
var CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "jujuysotf@gmail.com";
var OPEN_HOUR = 9;
var CLOSE_HOUR = 22;
var TIMEZONE = "America/Argentina/Tucuman";
var TIMEZONE_OFFSET = "-03:00";
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
async function getAvailableSlots(dateStr, durationMinutes) {
  const allSlots = [];
  const maxEndMinutes = CLOSE_HOUR * 60;
  for (let m = OPEN_HOUR * 60; m < maxEndMinutes; m += 30) {
    if (m + durationMinutes <= maxEndMinutes) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      allSlots.push(`${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
    }
  }
  const auth = getAuthClient();
  const bookedIntervals = [];
  for (const b of inMemoryBookings) {
    if (b.date === dateStr) {
      const start = (/* @__PURE__ */ new Date(`${b.date}T${b.time}:00${TIMEZONE_OFFSET}`)).getTime();
      bookedIntervals.push({ start, end: start + b.durationMinutes * 60 * 1e3 });
    }
  }
  if (auth) {
    try {
      const calendar = google.calendar({ version: "v3", auth });
      const timeMin = `${dateStr}T00:00:00${TIMEZONE_OFFSET}`;
      const timeMax = `${dateStr}T23:59:59${TIMEZONE_OFFSET}`;
      const eventsRes = await calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin,
        timeMax,
        timeZone: TIMEZONE,
        singleEvents: true,
        orderBy: "startTime"
      });
      const events = eventsRes.data.items || [];
      for (const ev of events) {
        if (ev.status === "cancelled") continue;
        if (ev.start?.dateTime && ev.end?.dateTime) {
          bookedIntervals.push({
            start: new Date(ev.start.dateTime).getTime(),
            end: new Date(ev.end.dateTime).getTime()
          });
        } else if (ev.start?.date) {
          bookedIntervals.push({
            start: (/* @__PURE__ */ new Date(`${ev.start.date}T00:00:00${TIMEZONE_OFFSET}`)).getTime(),
            end: (/* @__PURE__ */ new Date(`${ev.start.date}T23:59:59${TIMEZONE_OFFSET}`)).getTime()
          });
        }
      }
    } catch (err) {
      console.warn("[CalendarService] Error al consultar Google Calendar, usando simulaci\xF3n local:", err);
    }
  }
  const freeSlots = allSlots.filter((slot) => {
    const candidateStart = (/* @__PURE__ */ new Date(`${dateStr}T${slot}:00${TIMEZONE_OFFSET}`)).getTime();
    const candidateEnd = candidateStart + durationMinutes * 60 * 1e3;
    const hasOverlap = bookedIntervals.some((b) => candidateStart < b.end && candidateEnd > b.start);
    return !hasOverlap;
  });
  return freeSlots;
}

// server/createApp.ts
async function calendarAvailabilityHandler(req, res) {
  try {
    const date = req.query.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const duration = parseInt(req.query.duration, 10) || 60;
    const availableSlots = await getAvailableSlots(date, duration);
    res.json({ date, duration, availableSlots });
  } catch (err) {
    console.error("Error in /api/calendar/availability:", err);
    res.status(500).json({ error: err.message || "Error al obtener disponibilidad" });
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

// server/handlers/calendarAvailability.ts
function GET(request) {
  return runNodeHandler(request, calendarAvailabilityHandler);
}
export {
  GET
};
