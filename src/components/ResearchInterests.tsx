import type { ResearchInterest } from "@/lib/types";
import { accentClasses } from "@/lib/accents";
import Reveal from "./Reveal";

export default function ResearchInterests({
  items,
}: {
  items: ResearchInterest[];
}) {
  const a = accentClasses.ai;
  return (
    <section
      id="interests"
      className="scroll-mt-24 border-t border-white/5 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">Research &amp; Technical Interests</span>
          <h2 className="section-title mt-3">
            Where my curiosity is heading
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.id} delay={i * 0.08}>
              <div
                className={`card flex h-full flex-col border ${a.borderSoft} ${a.hoverBorder}`}
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {it.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
