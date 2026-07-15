import type { Skill, SkillCategory } from "./types";
import { SKILL_DICTIONARY, type SkillEntry } from "./skills-dictionary";

export interface ExtractedSkill {
  name: string;
  category: SkillCategory;
  /** The actual substring in the source text that triggered the match. */
  matched: string;
}

/**
 * Scans free-text work content and returns the canonical technical skills
 * detected, deduped and grouped implicitly by category. Pure & isomorphic
 * (no Node APIs) so it can run in API routes or in the browser.
 */
export function extractSkills(text: string): ExtractedSkill[] {
  if (!text || !text.trim()) return [];
  const found = new Map<string, ExtractedSkill>();

  for (const entry of SKILL_DICTIONARY) {
    const hit = matchEntry(entry, text);
    if (hit) {
      const key = `${entry.name}|${entry.category}`;
      if (!found.has(key)) {
        found.set(key, {
          name: entry.name,
          category: entry.category,
          matched: hit,
        });
      }
    }
  }

  return Array.from(found.values()).sort((a, b) =>
    a.category === b.category
      ? a.name.localeCompare(b.name)
      : categoryOrder(a.category) - categoryOrder(b.category)
  );
}

function categoryOrder(c: SkillCategory): number {
  return c === "AI/ML" ? 0 : c === "Astrophysics" ? 1 : c === "Mechanical" ? 2 : 3;
}

function matchEntry(entry: SkillEntry, text: string): string | null {
  for (const src of entry.patterns) {
    let re: RegExp;
    try {
      re = new RegExp(src, "i");
    } catch {
      continue;
    }
    const m = text.match(re);
    if (m && m[0]) return m[0].trim();
  }
  return null;
}

/**
 * Merges freshly extracted skills into an existing skill list, deduping by
 * name (case-insensitive). Returns a new array; does not mutate inputs.
 */
export function mergeSkills(existing: Skill[], extracted: ExtractedSkill[]): Skill[] {
  const seen = new Map<string, Skill>();
  for (const s of existing) {
    seen.set(s.name.toLowerCase(), s);
  }
  for (const e of extracted) {
    const key = e.name.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, {
        id: `sk-${key.replace(/[^a-z0-9]+/g, "-")}-${seen.size}`,
        name: e.name,
        category: e.category,
      });
    }
  }
  return Array.from(seen.values());
}

export const CATEGORY_META: Record<
  SkillCategory,
  { label: string; accent: "ai" | "astro" | "mech" | "general" }
> = {
  "AI/ML": { label: "AI / ML", accent: "ai" },
  Astrophysics: { label: "Astrophysics / Astrodynamics", accent: "astro" },
  Mechanical: { label: "Mechanical Engineering", accent: "mech" },
  General: { label: "General / Professional", accent: "general" },
};
