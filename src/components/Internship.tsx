import type { InternshipItem } from "@/lib/types";
import EntryCard from "./EntryCard";
import Reveal from "./Reveal";

export default function Internship({
  items,
}: {
  items: InternshipItem[];
}) {
  return (
    <section id="internship" className="scroll-mt-24 border-t border-white/5 bg-ink-900/40 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">Experience</span>
          <h2 className="section-title mt-3">
            Practical applications across research, engineering, and software.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {items.map((item, i) => (
            <EntryCard
              key={item.id}
              item={item}
              accent="ai"
              index={i}
              kind="Internship"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
