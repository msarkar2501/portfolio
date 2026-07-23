import type { Narrative } from "@/lib/types";
import { accentClasses, type Accent } from "@/lib/accents";
import Reveal from "./Reveal";

export default function Multidisciplinary({ narrative }: { narrative: Narrative }) {
  return (
    <section
      id="multidisciplinary"
      className="scroll-mt-24 border-y border-white/5 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">{narrative.eyebrow}</span>
          <h2 className="section-title mt-3 max-w-3xl">{narrative.heading}</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            {narrative.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 grid-cols-1 md:grid-cols-3">
          {narrative.pillars.map((pillar, i) => {
            const accent = accentClasses[pillar.accent as Accent];
            return (
              <Reveal key={pillar.field} delay={i * 0.1}>
                <div
                  className={`card group h-full border ${accent.borderSoft} ${accent.hoverBorder}`}
                >
                  <div
                    className={`mb-4 inline-flex items-center gap-2 rounded-full ${accent.bgSoft} ${accent.borderSoft} border px-3 py-1 text-xs font-semibold ${accent.text}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
                    {pillar.field}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-ai/5 via-astro/5 to-mech/5 p-6 sm:p-8">
            <p className="max-w-3xl text-lg leading-relaxed text-slate-200">
              {narrative.closing}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
