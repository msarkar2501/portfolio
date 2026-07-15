import type { Profile } from "@/lib/types";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export default function Footer({
  profile,
  updatedAt,
}: {
  profile: Profile;
  updatedAt: string;
}) {
  const updated = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <footer className="border-t border-white/10 bg-ink-950/80">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ai via-astro to-mech text-sm font-bold text-white">
            MS
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold text-white">
              {profile.name}
            </div>
            <div className="text-xs text-slate-500">{profile.titleShort}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <MailIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-white/5 py-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built at the intersection.
        </span>
        <span className="flex items-center gap-3">
          <span>Last updated {updated}</span>
          <a href="/admin" className="link-underline">
            Admin
          </a>
        </span>
      </div>
    </footer>
  );
}
