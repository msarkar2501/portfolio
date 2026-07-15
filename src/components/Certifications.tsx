import type { Certification } from "@/lib/types";
import { accentClasses } from "@/lib/accents";
import Reveal from "./Reveal";
import { ExternalIcon } from "./icons";

export default function Certifications({
  items,
}: {
  items: Certification[];
}) {
  const a = accentClasses.ai;
  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-t border-white/5 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">Certifications</span>
          <h2 className="section-title mt-3">
            Credentials that back the ML work
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <div className={`card flex h-full flex-col border ${a.borderSoft} ${a.hoverBorder}`}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ai/10">
                  <span className="font-display text-lg font-bold text-ai">✓</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-ai-glow">{cert.issuer}</p>
                {cert.period && (
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                    {cert.period}
                  </p>
                )}
                {cert.note && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {cert.note}
                  </p>
                )}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-medium text-ai transition-colors hover:text-ai-glow"
                  >
                    Verify credential
                    <ExternalIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
