"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/types";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowIcon, SparkIcon, DownloadIcon } from "./icons";

function OrbitRing({
  size,
  duration,
  color,
  delay = 0,
}: {
  size: number;
  duration: number;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderColor: color,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity, delay }}
    >
      <span
        className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
        style={{ background: color, boxShadow: `0 0 14px 2px ${color}` }}
      />
    </motion.div>
  );
}

export default function Hero({
  profile,
  cgpa,
}: {
  profile: Profile;
  cgpa?: string;
}) {
  // The CGPA stat is sourced from the Education section so any edit there
  // flows up to the hero automatically. We show just the numeric part —
  // the "CGPA / 10" label supplies the scale.
  const cgpaValue = cgpa && cgpa.trim() ? cgpa : "—";
  const STATS: { value: string; label: string; href?: string }[] = [
    { value: cgpaValue, label: "CGPA / 10", href: "#education" },
    { value: "3+", label: "Research and projects" },
    { value: "3", label: "Disciplines fused" },
  ];
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center pt-24 pb-16 overflow-hidden w-full max-w-full overflow-x-hidden"
    >
      <div className="container-page grid items-center gap-10 grid-cols-1 lg:grid-cols-12 w-full max-w-full overflow-x-hidden px-4 sm:px-6">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-eyebrow flex flex-wrap items-center gap-2 text-xs max-w-fit px-3 py-1.5"
          >
            <SparkIcon className="h-3.5 w-3.5 text-ai flex-shrink-0" />
            AI/ML · Astrophysics · Mechanical Engineering
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Manit Sarkar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-4 max-w-xl text-lg text-slate-300"
          >
            {profile.tagline}.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400"
          >
            A Mechanical Engineering student who treats physics, code,
            and hardware as one toolkit — and turns the intersection into a
            measurable edge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
          >
            <a href="#research" className="btn-primary w-full sm:w-auto">
              Explore my work <ArrowIcon className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost w-full sm:w-auto">
              <MailIcon className="h-4 w-4" /> Get in touch
            </a>
            {profile.cvUrl && (
              <a href={profile.cvUrl} download className="btn-ghost w-full sm:w-auto">
                <DownloadIcon className="h-4 w-4" /> Download CV
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline text-sm text-slate-400"
            >
              {profile.email}
            </a>
          </motion.div>
        </div>

        {/* Orbit visual encoding the three disciplines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block lg:col-span-5"
        >
          <div className="relative aspect-square w-full">
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-ai via-astro to-mech opacity-90 blur-[1px]" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
            <OrbitRing size={180} duration={18} color="rgba(139,92,246,0.55)" />
            <OrbitRing size={260} duration={30} color="rgba(99,102,241,0.5)" delay={2} />
            <OrbitRing size={340} duration={44} color="rgba(245,158,11,0.45)" delay={1} />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            one system · three fields
          </p>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="container-page mt-12 w-full max-w-full overflow-x-hidden px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
          {STATS.map((s, i) => {
            const inner = (
              <>
                <div className="font-display text-3xl font-bold text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                  {s.label}
                </div>
                {s.href && (
                  <span className="mt-2 inline-block text-[10px] font-medium uppercase tracking-wider text-slate-500 transition-colors group-hover:text-ai">
                    View education →
                  </span>
                )}
              </>
            );
            if (s.href) {
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  className="group flex flex-col items-center bg-ink-900/70 px-6 py-6 text-center transition-colors hover:bg-white/5"
                >
                  {inner}
                </motion.a>
              );
            }
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                className="bg-ink-900/70 px-6 py-6 text-center"
              >
                {inner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}