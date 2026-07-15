import type { Education } from "@/lib/types";
import Reveal from "./Reveal";

export default function Education({ items }: { items: Education[] }) {
  return (
    <section id="education" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">Education</span>
          <h2 className="section-title mt-3">Where the foundations were laid</h2>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {items.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 0.08}>
              <div className="card flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {edu.institution}
                    </h3>
                    {edu.status && (
                      <span className="chip border-ai/40 bg-ai/10 text-ai">
                        {edu.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-slate-300">{edu.degree}</p>
                  <p className="text-sm text-slate-500">{edu.location}</p>

                  {edu.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {edu.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-sm text-slate-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-mech" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-none flex-row gap-6 sm:flex-col sm:items-end sm:gap-3 sm:text-right">
                  <div>
                    <div className="font-display text-2xl font-bold text-white">
                      {edu.cgpa}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      CGPA
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">{edu.period}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
