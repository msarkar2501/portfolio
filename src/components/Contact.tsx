"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Contact as ContactData } from "@/lib/types";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  ArrowIcon,
} from "./icons";

function CopyRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be unavailable; link still works */
    }
  };
  return (
    <div className="card flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300">
          {label === "Email" ? (
            <MailIcon className="h-5 w-5" />
          ) : (
            <PhoneIcon className="h-5 w-5" />
          )}
        </span>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500">
            {label}
          </div>
          <a
            href={href}
            className="font-medium text-white hover:text-ai-glow"
          >
            {value}
          </a>
        </div>
      </div>
      <button
        onClick={copy}
        className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 transition-colors hover:border-white/30 hover:text-white"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function Contact({ contact }: { contact: ContactData }) {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-white/5 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="container-page w-full max-w-full overflow-x-hidden grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="section-title mt-3"
          >
            Let&apos;s build something at the intersection.
          </motion.h2>
          <p className="mt-4 max-w-xl text-slate-400">{contact.note}</p>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a href={`mailto:${contact.email}`} className="btn-primary w-full sm:w-auto">
              <MailIcon className="h-4 w-4" /> Email me <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <CopyRow label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <CopyRow label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
        </div>
      </div>
    </section>
  );
}
