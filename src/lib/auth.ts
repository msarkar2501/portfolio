import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_MESSAGE = "portfolio-admin-session";

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SECRET is not configured. Add it to .env.local");
  }
  return secret;
}

/** Deterministic session token derived from the server secret. */
export function getSessionToken(): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(SESSION_MESSAGE)
    .digest("hex");
}

/** Compares a candidate password to the configured admin password. */
export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // constant-time-ish comparison to avoid trivial timing leaks
  const a = Buffer.from(String(candidate));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function getCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}

/** True when the current request carries a valid admin session cookie. */
export function isAuthenticated(): boolean {
  const store = cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = getSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
