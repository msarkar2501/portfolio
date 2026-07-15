import type { MediaItem } from "@/lib/types";
import { accentClasses, type Accent } from "@/lib/accents";
import Reveal from "./Reveal";
import MediaGallery from "./MediaGallery";
import { ExternalIcon } from "./icons";

export interface EntryLike {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  media: MediaItem[];
  organization?: string;
  link?: string;
}

function linkLabel(kind?: string) {
  if (kind === "Research") return "View research";
  if (kind === "Internship") return "View internship";
  if (kind === "Project") return "View project";
  return "View link";
}

export default function EntryCard({
  item,
  accent,
  index = 0,
  kind,
}: {
  item: EntryLike;
  accent: Accent;
  index?: number;
  kind?: string;
}) {
  const a = accentClasses[accent];
  return (
    <Reveal delay={index * 0.08}>
      <article className={`card border ${a.borderSoft} ${a.hoverBorder}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              {kind && (
                <span
                  className={`chip ${a.bgSoft} ${a.borderSoft} ${a.text} border`}
                >
                  {kind}
                </span>
              )}
              <span className="text-xs uppercase tracking-wider text-slate-500">
                {item.period}
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">
              {item.title}
            </h3>
            {item.organization && (
              <p className="text-sm text-slate-400">{item.organization}</p>
            )}
          </div>
          <span
            className={`hidden h-10 w-10 flex-none items-center justify-center rounded-xl ${a.bgSoft} font-display text-sm font-bold ${a.text} sm:flex`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-3 leading-relaxed text-slate-300">
          {item.description}
        </p>

        {item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`chip border ${a.borderSoft} ${a.text} bg-white/[0.02]`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {item.media.length > 0 && (
          <div className="mt-5">
            <MediaGallery media={item.media} accent={accent} />
          </div>
        )}

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center gap-1.5 rounded-lg border ${a.borderSoft} ${a.text} px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5`}
          >
            {linkLabel(kind)}
            <ExternalIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </article>
    </Reveal>
  );
}
