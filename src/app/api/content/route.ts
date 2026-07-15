import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";

// Public read — the site needs it.
export async function GET() {
  try {
    return NextResponse.json(getContent());
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Failed to read content" },
      { status: 500 }
    );
  }
}

// Owner-only write.
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
  try {
    const saved = saveContent(body);
    return NextResponse.json({ ok: true, content: saved });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Failed to save" },
      { status: 400 }
    );
  }
}
