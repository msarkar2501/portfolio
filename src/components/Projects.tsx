import type { ProjectItem } from "@/lib/types";
import EntryCard from "./EntryCard";
import Reveal from "./Reveal";

export default function Projects({ items }: { items: ProjectItem[] }) {
  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <span className="section-eyebrow">Featured Projects</span>
          <h2 className="section-title mt-3">
            Featured Engineering & Technical Projects
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            A selection of technical projects spanning computational modeling, autonomous systems, and engineering design.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {items.map((item, i) => (
            <EntryCard
              key={item.id}
              item={item}
              accent="mech"
              index={i}
              kind="Project"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
