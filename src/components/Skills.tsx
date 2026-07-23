import type { Skill, SkillCategory } from "@/lib/types";
import { accentClasses, categoryAccent } from "@/lib/accents";
import { CATEGORY_META } from "@/lib/skills";
import Reveal from "./Reveal";

const ORDER: SkillCategory[] = ["AI/ML", "Astrophysics", "Mechanical", "General"];

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = ORDER.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title mt-3">
            The toolkit, mapped by discipline
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Every skill here is tracked and kept current. New capabilities are
            extracted automatically from the work I share — so this section
            always reflects what I am actually doing.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 grid-cols-1 md:grid-cols-2">
          {grouped.map((group, gi) => {
            const meta = CATEGORY_META[group.cat];
            const a = accentClasses[categoryAccent(group.cat)];
            return (
              <Reveal key={group.cat} delay={gi * 0.08}>
                <div className={`card h-full border ${a.borderSoft}`}>
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                    <h3 className="font-display text-lg font-semibold text-white">
                      {meta.label}
                    </h3>
                    <span className="ml-auto text-xs text-slate-500">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill.id}
                        className={`chip border ${a.borderSoft} ${a.bgSoft} ${a.text}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
