"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GitHubIcon, LinkedInIcon, MenuIcon, CloseIcon } from "./icons";

const NAV = [
  { id: "summary", label: "Summary" },
  { id: "internship", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The admin dashboard is a self-contained editor; hide the public site
  // header so it doesn't overlap the editor's own sticky toolbar/buttons.
  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", ...NAV.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ai via-astro to-mech text-sm font-bold text-white shadow-lg">
              MS
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-semibold text-white">Manit Sarkar</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Multidisciplinary Eng.
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === item.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            
              href="https://github.com/msarkar2501"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white sm:flex"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            
              href="https://www.linkedin.com/in/manit-sarkar-486363283"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white sm:flex"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 md:hidden touch-manipulation"
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay - rendered outside header to avoid stacking context issues */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink-950/80 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            {/* Mobile menu drawer */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-ink-950/95 backdrop-blur-xl border-l border-white/10 md:hidden overflow-y-auto"
            >
              <div className="container-page flex flex-col gap-1 py-6">
                {NAV.map((item) => (
                  
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}