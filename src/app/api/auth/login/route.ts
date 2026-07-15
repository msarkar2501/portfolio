import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, getSessionToken, getCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  const opts = getCookieOptions();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(opts.name, getSessionToken(), {
    httpOnly: opts.httpOnly,
    sameSite: opts.sameSite,
    path: opts.path,
    secure: opts.secure,
    maxAge: opts.maxAge,
  });
  return res;
}
