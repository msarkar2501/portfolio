import Reveal from "./Reveal";
import { ArrowIcon } from "./icons";

const SECTIONS = [
  { id: "summary", title: "Professional Summary", desc: "Background, technical focus, and engineering approach." },
  { id: "multidisciplinary", title: "The Multidisciplinary Edge", desc: "Connecting AI/ML, Astrophysics, and Mechanical systems." },
  { id: "education", title: "Education", desc: "Academic background, coursework, and core metrics." },
  { id: "internship", title: "Experience", desc: "Professional internships and hands-on industry experience." },
  { id: "research", title: "Research", desc: "Computational modeling, physics, and data-driven studies." },
  { id: "projects", title: "Projects", desc: "Featured engineering design and software builds." },
  { id: "certifications", title: "Certifications", desc: "Verified credentials and specialized technical training." },
  { id: "skills", title: "Skills", desc: "Technical toolkits, frameworks, and domain expertise." },
  { id: "contact", title: "Contact", desc: "Direct channels for communication and professional links." },
];

export default function SectionIndex({ cgpa }: { cgpa?: string }) {
  // Education CGPA is sourced from the Education section so edits there stay
  // in sync with the rest of the site.
  const sections = SECTIONS.map((s) =>
    s.id === "education"
      ? { ...s, desc: `TIET Mechanical Eng. — CGPA ${cgpa && cgpa.trim() ? cgpa : "—"}/10.` }
      : s
  );
  return (
    <section className="border-y border-white/5 bg-ink-900/30 py-12 sm:py-16">
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">How to read this site</span>
          <h2 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">
            Jump straight to what matters to you
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <a
                href={`#${s.id}`}
                className="group flex h-full items-center gap-3 rounded-xl border border-white/10 bg-ink-850/50 p-4 transition-all duration-200 hover:border-white/25 hover:bg-ink-800/60"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/5 font-display text-sm font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-slate-100">
                    {s.title}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {s.desc}
                  </span>
                </span>
                <ArrowIcon className="ml-auto h-4 w-4 flex-none text-slate-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-300" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
