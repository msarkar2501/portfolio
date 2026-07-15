import { NextRequest, NextResponse } from "next/server";
import { extractSkills } from "@/lib/skills";
import { isAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const text = typeof body?.text === "string" ? body.text : "";
  const skills = extractSkills(text);
  return NextResponse.json({ ok: true, skills });
}
