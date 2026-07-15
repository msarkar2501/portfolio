"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MediaItem } from "@/lib/types";
import { CloseIcon } from "./icons";

function isEmbed(url: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/i.test(url);
}

function Embed({ url }: { url: string }) {
  let src = url;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) src = `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) src = `https://player.vimeo.com/video/${vimeo[1]}`;
  return (
    <iframe
      src={src}
      title="Project video"
      className="aspect-video w-full rounded-xl"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

export default function MediaGallery({
  media,
  accent = "ai",
}: {
  media: MediaItem[];
  accent?: "ai" | "astro" | "mech" | "general";
}) {
  const [active, setActive] = useState<number | null>(null);

  if (!media || media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center">
        <p className="text-sm text-slate-500">
          Media space reserved. Add images or video links from the{" "}
          <a href="/admin" className="link-underline text-slate-300">
            admin editor
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {media.map((m, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-xl border border-white/10 bg-ink-850 ${
              m.type === "video" ? "sm:col-span-2" : ""
            }`}
          >
            {m.type === "image" ? (
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full"
                aria-label={`Open image: ${m.caption || "media"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.url}
                  alt={m.caption || "Project media"}
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            ) : isEmbed(m.url) ? (
              <Embed url={m.url} />
            ) : (
              <video
                src={m.url}
                controls
                className="aspect-video w-full bg-black"
              />
            )}
            {m.caption && (
              <p className="px-3 py-2 text-xs text-slate-400">{m.caption}</p>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && media[active]?.type === "image" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setActive(null)}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media[active].url}
              alt={media[active].caption || "Project media"}
              className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain"
            />
            {media[active].caption && (
              <p className="absolute bottom-6 max-w-md text-center text-sm text-slate-300">
                {media[active].caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
