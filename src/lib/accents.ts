export type Accent = "ai" | "astro" | "mech" | "general";

/**
 * All class strings are written out literally so Tailwind's content scanner
 * can detect them. Do not build these dynamically.
 */
export const accentClasses: Record<
  Accent,
  {
    text: string;
    textGlow: string;
    bgSoft: string;
    border: string;
    borderSoft: string;
    hoverBorder: string;
    dot: string;
    ring: string;
    gradient: string;
  }
> = {
  ai: {
    text: "text-ai",
    textGlow: "text-ai-glow",
    bgSoft: "bg-ai/10",
    border: "border-ai/40",
    borderSoft: "border-ai/20",
    hoverBorder: "hover:border-ai/40",
    dot: "bg-ai",
    ring: "ring-ai/40",
    gradient: "from-ai via-ai-glow to-astro",
  },
  astro: {
    text: "text-astro",
    textGlow: "text-astro-glow",
    bgSoft: "bg-astro/10",
    border: "border-astro/40",
    borderSoft: "border-astro/20",
    hoverBorder: "hover:border-astro/40",
    dot: "bg-astro",
    ring: "ring-astro/40",
    gradient: "from-astro via-astro-glow to-ai",
  },
  mech: {
    text: "text-mech",
    textGlow: "text-mech-glow",
    bgSoft: "bg-mech/10",
    border: "border-mech/40",
    borderSoft: "border-mech/20",
    hoverBorder: "hover:border-mech/40",
    dot: "bg-mech",
    ring: "ring-mech/40",
    gradient: "from-mech via-mech-glow to-astro",
  },
  general: {
    text: "text-slate-200",
    textGlow: "text-white",
    bgSoft: "bg-white/5",
    border: "border-white/20",
    borderSoft: "border-white/10",
    hoverBorder: "hover:border-white/20",
    dot: "bg-slate-300",
    ring: "ring-white/30",
    gradient: "from-slate-300 via-white to-slate-400",
  },
};

export function categoryAccent(
  category: "AI/ML" | "Astrophysics" | "Mechanical" | "General"
): Accent {
  if (category === "AI/ML") return "ai";
  if (category === "Astrophysics") return "astro";
  if (category === "Mechanical") return "mech";
  return "general";
}
