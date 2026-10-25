// server/createApp.ts
import express from "express";

// server/calendarService.ts
import { google } from "googleapis";
import fs from "fs";
import path from "path";
var CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "jujuysotf@gmail.com";
var OPEN_HOUR = 9;
var CLOSE_HOUR = 22;
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
async function getCalendarStatus() {
  const auth = getAuthClient();
  const base = {
    calendarId: CALENDAR_ID,
    openHour: OPEN_HOUR,
    closeHour: CLOSE_HOUR
  };
  if (!auth) {
    return {
      ...base,
      configured: false,
      connected: false,
      message: "Modo simulaci\xF3n activo (agrega GOOGLE_SERVICE_ACCOUNT_KEY o google-credentials.json para sincronizar en vivo)."
    };
  }
  try {
    if (process.env.ALLOW_INSECURE_TLS === "1") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    const calendar = google.calendar({ version: "v3", auth });
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const eventsRes = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: (/* @__PURE__ */ new Date(`${today}T00:00:00-03:00`)).toISOString(),
      timeMax: (/* @__PURE__ */ new Date(`${today}T23:59:59-03:00`)).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 50
    });
    return {
      ...base,
      configured: true,
      connected: true,
      busySlotsTodayCount: eventsRes.data.items?.length ?? 0,
      message: `Google Calendar API conectado con ${CALENDAR_ID}`
    };
  } catch (err) {
    const message = err?.message || "Error al conectar con Google Calendar API";
    console.error("Error in /api/calendar/status:", message);
    return {
      ...base,
      configured: true,
      connected: false,
      error: message,
      message,
      hint: String(message).includes("self-signed certificate") ? "En esta PC hay un proxy/antivirus. Agreg\xE1 ALLOW_INSECURE_TLS=1 al .env (solo local) y reinici\xE1." : void 0
    };
  }
}

// server/reelsStore.ts
import path2 from "path";
var FILE_PATH = path2.resolve(process.cwd(), "data", "reels.json");
var SESSION_MS = 12 * 60 * 60 * 1e3;

// server/createApp.ts
async function calendarStatusHandler(_req, res) {
  const status = await getCalendarStatus();
  res.status(200).json(status);
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

// server/handlers/calendarStatus.ts
function GET(request) {
  return runNodeHandler(request, calendarStatusHandler);
}
export {
  GET
};
