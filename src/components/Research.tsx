import type { ResearchItem } from "@/lib/types";
import EntryCard from "./EntryCard";
import Reveal from "./Reveal";

export default function Research({ items }: { items: ResearchItem[] }) {
  return (
    <section id="research" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">Research</span>
          <h2 className="section-title mt-3">
            Academic research and publications
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Investigating complex physical systems, computational modeling, and data-driven methods.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {items.map((item, i) => (
            <EntryCard
              key={item.id}
              item={item}
              accent="astro"
              index={i}
              kind="Research"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
