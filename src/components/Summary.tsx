import type { Profile } from "@/lib/types";
import Reveal from "./Reveal";

export default function Summary({ profile }: { profile: Profile }) {
  return (
    <section id="summary" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <span className="section-eyebrow">Professional Summary</span>
            <h2 className="section-title mt-3">
              A builder who refuses
              <br />
              to pick one lane.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Below is the short version of who I am and why the blend of my
              fields matters. Every claim on this site traces back to work I can
              show you.
            </p>
            <div className="mt-6 space-y-2">
              {profile.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ai" />
                  <span className="text-slate-200">{lang.name}</span>
                  <span className="text-slate-500">— {lang.level}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-5">
          {profile.summary.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-slate-300">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
