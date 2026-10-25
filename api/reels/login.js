// server/createApp.ts
import express from "express";

// server/calendarService.ts
import { google } from "googleapis";
var CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "jujuysotf@gmail.com";

// server/reelsStore.ts
import path from "path";
import crypto from "crypto";
var FILE_PATH = path.resolve(process.cwd(), "data", "reels.json");
var COOKIE_NAME = "reels_admin";
var SESSION_MS = 12 * 60 * 60 * 1e3;
function getAdminPassword() {
  return (process.env.REELS_ADMIN_PASSWORD || "").trim();
}
function isReelsAdminConfigured() {
  return getAdminPassword().length > 0;
}
function createSessionToken() {
  const password = getAdminPassword();
  if (!password) return null;
  const exp = String(Date.now() + SESSION_MS);
  const sig = crypto.createHmac("sha256", password).update(exp).digest("hex");
  return `${exp}.${sig}`;
}
function verifyPassword(password) {
  const expected = getAdminPassword();
  if (!expected) return false;
  const a = Buffer.from(String(password || ""));
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
function buildSessionCookie(token, clear = false) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  if (clear) {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
  }
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_MS / 1e3)}${secure}`;
}

// server/createApp.ts
function reelsLoginHandler(req, res) {
  if (!isReelsAdminConfigured()) {
    res.status(503).json({
      error: "Falta REELS_ADMIN_PASSWORD en las variables de entorno."
    });
    return;
  }
  const password = String(req.body?.password || "");
  if (!verifyPassword(password)) {
    res.status(401).json({ error: "PIN incorrecto" });
    return;
  }
  const token = createSessionToken();
  if (!token) {
    res.status(503).json({ error: "No se pudo crear la sesi\xF3n" });
    return;
  }
  res.setHeader("Set-Cookie", buildSessionCookie(token));
  res.json({ ok: true });
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

// server/handlers/reelsLogin.ts
function POST(request) {
  return runNodeHandler(request, reelsLoginHandler);
}
export {
  POST
};
