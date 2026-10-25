// server/createApp.ts
import express from "express";

// server/calendarService.ts
import { google } from "googleapis";
var CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "jujuysotf@gmail.com";

// server/reelsStore.ts
import path from "path";
var FILE_PATH = path.resolve(process.cwd(), "data", "reels.json");
var COOKIE_NAME = "reels_admin";
var SESSION_MS = 12 * 60 * 60 * 1e3;
function buildSessionCookie(token, clear = false) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  if (clear) {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
  }
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_MS / 1e3)}${secure}`;
}

// server/createApp.ts
function reelsLogoutHandler(_req, res) {
  res.setHeader("Set-Cookie", buildSessionCookie("", true));
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

// server/handlers/reelsLogout.ts
function POST(request) {
  return runNodeHandler(request, reelsLogoutHandler);
}
export {
  POST
};
