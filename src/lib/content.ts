import fs from "fs";
import path from "path";
import type { Content } from "./types";

const DATA_FILE = path.join(process.cwd(), "src", "data", "content.json");

/**
 * Reads the editable content file. Called from server components and API
 * routes. `force-dynamic` on pages keeps this fresh on every request so
 * edits appear immediately.
 */
export function getContent(): Content {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Content;
  } catch (err) {
    console.error("Failed to read content.json:", err);
    throw new Error("Content store unavailable");
  }
}

/**
 * Validates and writes the content file. Only call this from an
 * authenticated API route.
 */
export function saveContent(content: Content): Content {
  if (!content || typeof content !== "object") {
    throw new Error("Invalid content payload");
  }
  const next: Content = { ...content, updatedAt: new Date().toISOString() };
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
  return next;
}
