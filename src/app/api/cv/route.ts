import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

// Single, stable public path so the hero "Download CV" link never changes —
// reuploading simply overwrites this file.
const CV_PATH = path.join(process.cwd(), "public", "Manit_Sarkar_CV.pdf");
const CV_URL = "/Manit_Sarkar_CV.pdf";
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
  }

  const isPdf =
    file.type === "application/pdf" ||
    /\.pdf$/i.test(file.name);
  if (!isPdf) {
    return NextResponse.json(
      { ok: false, error: "Only PDF files are allowed" },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "File too large (max 15MB)" },
      { status: 413 }
    );
  }

  await fs.writeFile(CV_PATH, buf);

  // Persist the link immediately so it shows up without a separate save.
  const { getContent, saveContent } = await import("@/lib/content");
  const content = getContent();
  content.profile.cvUrl = CV_URL;
  saveContent(content);

  return NextResponse.json({ ok: true, url: CV_URL });
}

export async function DELETE() {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  await fs.rm(CV_PATH, { force: true });

  const { getContent, saveContent } = await import("@/lib/content");
  const content = getContent();
  content.profile.cvUrl = "";
  saveContent(content);

  return NextResponse.json({ ok: true });
}
