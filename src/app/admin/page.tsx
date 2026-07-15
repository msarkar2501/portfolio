"use client";

import { useEffect, useState, useCallback } from "react";
import type {
  Content,
  Profile,
  Narrative,
  Contact,
  ResearchItem,
  InternshipItem,
  ProjectItem,
  Certification,
  Skill,
  Education,
  ResearchInterest,
  MediaItem,
  SkillCategory,
} from "@/lib/types";
import { mergeSkills, CATEGORY_META, type ExtractedSkill } from "@/lib/skills";
import { LockIcon, PlusIcon, TrashIcon, UploadIcon, SparkIcon, ExternalIcon } from "@/components/icons";

/* ───────────────────────── tiny form primitives ───────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-100 outline-none transition-colors focus:border-ai/60"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm leading-relaxed text-slate-100 outline-none transition-colors focus:border-ai/60"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-100 outline-none focus:border-ai/60"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const toTags = (s: string) =>
  s.split(",").map((t) => t.trim()).filter(Boolean);
const fromTags = (t: string[]) => t.join(", ");

/* ───────────────────────── Media editor ───────────────────────── */

function MediaEditor({
  media,
  onChange,
}: {
  media: MediaItem[];
  onChange: (m: MediaItem[]) => void;
}) {
  const [type, setType] = useState<"image" | "video">("image");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const add = () => {
    if (!url.trim()) return;
    onChange([
      ...media,
      { type, url: url.trim(), caption: caption.trim() || undefined },
    ]);
    setUrl("");
    setCaption("");
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", f);
    try {
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (j.ok) setUrl(j.url);
      else alert(j.error || "Upload failed");
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-lg border border-white/10 bg-ink-900/50 p-3">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
        Media (images / video links or uploads)
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Select
          label="Type"
          value={type}
          onChange={(v) => setType(v as "image" | "video")}
          options={[
            { value: "image", label: "Image" },
            { value: "video", label: "Video" },
          ]}
        />
        <Field label="Caption (optional)" value={caption} onChange={setCaption} />
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste image/video URL (or YouTube/Vimeo link)"
          className="flex-1 rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-100 outline-none focus:border-ai/60"
        />
        <label className="btn-ghost cursor-pointer whitespace-nowrap">
          <UploadIcon className="h-4 w-4" />
          {uploading ? "Uploading…" : "Upload file"}
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={onUpload}
          />
        </label>
        <button onClick={add} className="btn-primary whitespace-nowrap">
          <PlusIcon className="h-4 w-4" /> Add
        </button>
      </div>

      {media.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {media.map((m, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-md bg-ink-850/70 px-2 py-1.5 text-xs"
            >
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-slate-400">
                {m.type}
              </span>
              <span className="truncate text-slate-300">{m.url}</span>
              <button
                onClick={() => onChange(media.filter((_, j) => j !== i))}
                className="ml-auto text-slate-500 hover:text-red-400"
                aria-label="Remove media"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────────────────────── Admin shell ───────────────────────── */

const TABS = [
  "Profile",
  "CV",
  "Narrative",
  "Education",
  "Interests",
  "Research",
  "Internship",
  "Projects",
  "Certifications",
  "Skills",
  "Contact",
] as const;
type Tab = (typeof TABS)[number];

const ACCENT_OPTIONS = [
  { value: "ai", label: "AI / ML" },
  { value: "astro", label: "Astrophysics" },
  { value: "mech", label: "Mechanical" },
  { value: "general", label: "General" },
];

export default function Admin() {
  const [content, setContent] = useState<Content | null>(null);
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("Profile");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const r = await fetch("/api/content");
    const j = await r.json();
    if (j && !j.error) setContent(j);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch("/api/auth/me");
        const meJson = await me.json();
        if (meJson.authed) {
          setAuthed(true);
          await load();
        }
      } finally {
        setChecked(true);
      }
    })();
  }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (r.ok) {
      setAuthed(true);
      await load();
    } else {
      setLoginErr("Incorrect password. Try again.");
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
    setContent(null);
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMsg("");
    const r = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (r.ok) setMsg("Saved ✓ — changes are live on the site.");
    else setMsg("Save failed. Check your session and try again.");
  };

  /* generic immutable updaters */
  const patchProfile = (p: Partial<Profile>) =>
    setContent((c) =>
      c ? { ...c, profile: { ...c.profile, ...p } } : c
    );
  const patchNarrative = (p: Partial<Narrative>) =>
    setContent((c) =>
      c ? { ...c, narrative: { ...c.narrative, ...p } } : c
    );
  const patchContact = (p: Partial<Contact>) =>
    setContent((c) =>
      c ? { ...c, contact: { ...c.contact, ...p } } : c
    );
  const setArr = <T,>(key: keyof Content, list: T[]) =>
    setContent((c) => (c ? ({ ...c, [key]: list } as Content) : c));

  /* ─────────────── login screen ─────────────── */
  if (!checked || (!authed && checked)) {
    if (!authed) {
      return (
        <div className="flex min-h-screen items-center justify-center px-4">
          <form
            onSubmit={login}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900/70 p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai/15 text-ai">
                <LockIcon className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-display text-lg font-semibold text-white">
                  Owner login
                </h1>
                <p className="text-xs text-slate-400">
                  This area is private.
                </p>
              </div>
            </div>
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Your admin password"
            />
            {loginErr && (
              <p className="mt-3 text-sm text-red-400">{loginErr}</p>
            )}
            <button type="submit" className="btn-primary mt-5 w-full">
              Unlock editor
            </button>
            <a
              href="/"
              className="mt-4 block text-center text-xs text-slate-500 hover:text-slate-300"
            >
              ← Back to public site
            </a>
          </form>
        </div>
      );
    }
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-400">
        Loading editor…
      </div>
    );
  }

  /* ─────────────── dashboard ─────────────── */
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/90 backdrop-blur-xl">
        <div className="container-page flex flex-wrap items-center gap-3 py-3">
          <span className="font-display text-sm font-semibold text-white">
            Site Editor
          </span>
          <a
            href="/"
            target="_blank"
            className="link-underline flex items-center gap-1 text-xs text-slate-400"
          >
            View site <ExternalIcon className="h-3.5 w-3.5" />
          </a>
          <div className="ml-auto flex items-center gap-2">
            {msg && <span className="text-xs text-emerald-400">{msg}</span>}
            <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-50">
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button onClick={logout} className="btn-ghost">
              Log out
            </button>
          </div>
        </div>
        <div className="container-page flex flex-wrap gap-1 pb-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="container-page max-w-3xl space-y-6 py-8">
        {tab === "Profile" && <ProfileTab c={content} patch={patchProfile} />}
        {tab === "CV" && <CvTab c={content} patch={patchProfile} />}
        {tab === "Narrative" && <NarrativeTab c={content} patch={patchNarrative} />}
        {tab === "Education" && (
          <ListTab<Education>
            title="Education"
            items={content.education}
            setItems={(l) => setArr("education", l)}
            empty={() => ({
              id: `edu-${Date.now()}`,
              institution: "New institution",
              location: "",
              degree: "",
              status: "",
              period: "",
              cgpa: "",
              highlights: [],
            })}
            render={(item, update, remove) => (
              <div className="space-y-3">
                <Field label="Institution" value={item.institution} onChange={(v) => update({ institution: v })} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Degree" value={item.degree} onChange={(v) => update({ degree: v })} />
                  <Field label="Location" value={item.location} onChange={(v) => update({ location: v })} />
                  <Field label="Status (e.g. 3rd Year)" value={item.status} onChange={(v) => update({ status: v })} />
                  <Field label="Period" value={item.period} onChange={(v) => update({ period: v })} />
                  <Field label="CGPA" value={item.cgpa} onChange={(v) => update({ cgpa: v })} />
                </div>
                <StringList
                  label="Highlights"
                  items={item.highlights}
                  onChange={(l) => update({ highlights: l })}
                  placeholder="Add a highlight…"
                />
                <RemoveRow onRemove={remove} />
              </div>
            )}
          />
        )}
        {tab === "Interests" && (
          <ListTab<ResearchInterest>
            title="Research & Technical Interests"
            items={content.researchInterests}
            setItems={(l) => setArr("researchInterests", l)}
            empty={() => ({
              id: `intr-${Date.now()}`,
              title: "New interest",
              description: "",
            })}
            render={(item, update, remove) => (
              <div className="space-y-3">
                <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                <Area label="Description" value={item.description} onChange={(v) => update({ description: v })} rows={3} />
                <RemoveRow onRemove={remove} />
              </div>
            )}
          />
        )}
        {tab === "Research" && (
          <EntryTab<ResearchItem>
            title="Research"
            items={content.research}
            setItems={(l) => setArr("research", l)}
            empty={() => ({
              id: `res-${Date.now()}`,
              title: "New research",
              period: "",
              description: "",
              tags: [],
              media: [],
              link: "",
            })}
            content={(item, update) => (
              <>
                <Area label="Description" value={item.description} onChange={(v) => update({ description: v })} />
                <Field label="Tags (comma separated)" value={fromTags(item.tags)} onChange={(v) => update({ tags: toTags(v) })} />
                <Field label="Project / Internship Link (optional)" value={item.link ?? ""} onChange={(v) => update({ link: v } as Partial<ResearchItem>)} placeholder="https://github.com/… or a paper / project page" />
                <MediaEditor media={item.media} onChange={(m) => update({ media: m })} />
              </>
            )}
            titleField="title"
            periodField="period"
          />
        )}
        {tab === "Internship" && (
          <EntryTab<InternshipItem>
            title="Internship"
            items={content.internships}
            setItems={(l) => setArr("internships", l)}
            empty={() => ({
              id: `int-${Date.now()}`,
              title: "New internship",
              organization: "",
              period: "",
              description: "",
              tags: [],
              media: [],
              link: "",
            })}
            content={(item, update) => (
              <>
                <Field label="Organization" value={item.organization} onChange={(v) => update({ organization: v })} />
                <Area label="Description" value={item.description} onChange={(v) => update({ description: v })} />
                <Field label="Tags (comma separated)" value={fromTags(item.tags)} onChange={(v) => update({ tags: toTags(v) })} />
                <Field label="Project / Internship Link (optional)" value={item.link ?? ""} onChange={(v) => update({ link: v } as Partial<InternshipItem>)} placeholder="https://github.com/… or a paper / project page" />
                <MediaEditor media={item.media} onChange={(m) => update({ media: m })} />
              </>
            )}
            titleField="title"
            periodField="period"
          />
        )}
        {tab === "Projects" && (
          <EntryTab<ProjectItem>
            title="Projects"
            items={content.projects}
            setItems={(l) => setArr("projects", l)}
            empty={() => ({
              id: `proj-${Date.now()}`,
              title: "New project",
              period: "",
              description: "",
              tags: [],
              media: [],
              link: "",
            })}
            content={(item, update) => (
              <>
                <Area label="Description" value={item.description} onChange={(v) => update({ description: v })} />
                <Field label="Tags (comma separated)" value={fromTags(item.tags)} onChange={(v) => update({ tags: toTags(v) })} />
                <Field label="Project / Internship Link (optional)" value={item.link ?? ""} onChange={(v) => update({ link: v } as Partial<ProjectItem>)} placeholder="https://github.com/… or a project page" />
                <MediaEditor media={item.media} onChange={(m) => update({ media: m })} />
              </>
            )}
            titleField="title"
            periodField="period"
          />
        )}
        {tab === "Certifications" && (
          <ListTab<Certification>
            title="Certifications"
            items={content.certifications}
            setItems={(l) => setArr("certifications", l)}
            empty={() => ({
              id: `cert-${Date.now()}`,
              name: "New certification",
              issuer: "",
              period: "",
              note: "",
              link: "",
            })}
            render={(item, update, remove) => (
              <div className="space-y-3">
                <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Issuer" value={item.issuer} onChange={(v) => update({ issuer: v })} />
                  <Field label="Period (optional)" value={item.period} onChange={(v) => update({ period: v })} />
                </div>
                <Area label="Note (optional)" value={item.note} onChange={(v) => update({ note: v })} rows={2} />
                <Field label="Credential Link (optional)" value={item.link ?? ""} onChange={(v) => update({ link: v })} placeholder="https://www.coursera.org/…/verify" />
                <RemoveRow onRemove={remove} />
              </div>
            )}
          />
        )}
        {tab === "Skills" && (
          <SkillsTab content={content} setSkills={(l) => setArr("skills", l)} />
        )}
        {tab === "Contact" && <ContactTab c={content} patch={patchContact} />}
      </div>
    </div>
  );
}

/* ───────────────────────── tab components ───────────────────────── */

function ProfileTab({
  c,
  patch,
}: {
  c: Content;
  patch: (p: Partial<Profile>) => void;
}) {
  const p = c.profile;
  return (
    <div className="space-y-5">
      <Card title="Identity & links">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name" value={p.name} onChange={(v) => patch({ name: v })} />
          <Field label="Short title" value={p.titleShort} onChange={(v) => patch({ titleShort: v })} />
          <Field label="Tagline" value={p.tagline} onChange={(v) => patch({ tagline: v })} />
          <Field label="Location" value={p.location} onChange={(v) => patch({ location: v })} />
          <Field label="Email" type="email" value={p.email} onChange={(v) => patch({ email: v })} />
          <Field label="Phone" value={p.phone} onChange={(v) => patch({ phone: v })} />
          <Field label="GitHub URL" value={p.github} onChange={(v) => patch({ github: v })} />
          <Field label="LinkedIn URL" value={p.linkedin} onChange={(v) => patch({ linkedin: v })} />
        </div>
      </Card>
      <Card title="Professional summary (paragraphs)">
        <StringList
          label="Summary paragraphs"
          items={p.summary}
          onChange={(l) => patch({ summary: l })}
          placeholder="Write a paragraph…"
          multiline
        />
      </Card>
      <Card title="Languages">
        <div className="space-y-2">
          {p.languages.map((lang, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={lang.name}
                onChange={(e) => {
                  const next = [...p.languages];
                  next[i] = { ...next[i], name: e.target.value };
                  patch({ languages: next });
                }}
                placeholder="Language"
                className="flex-1 rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-100 outline-none focus:border-ai/60"
              />
              <input
                value={lang.level}
                onChange={(e) => {
                  const next = [...p.languages];
                  next[i] = { ...next[i], level: e.target.value };
                  patch({ languages: next });
                }}
                placeholder="Level"
                className="w-40 rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-100 outline-none focus:border-ai/60"
              />
              <button
                onClick={() =>
                  patch({ languages: p.languages.filter((_, j) => j !== i) })
                }
                className="text-slate-500 hover:text-red-400"
                aria-label="Remove language"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              patch({ languages: [...p.languages, { name: "", level: "" }] })
            }
            className="btn-ghost"
          >
            <PlusIcon className="h-4 w-4" /> Add language
          </button>
        </div>
      </Card>
    </div>
  );
}

function NarrativeTab({
  c,
  patch,
}: {
  c: Content;
  patch: (p: Partial<Narrative>) => void;
}) {
  const n = c.narrative;
  return (
    <div className="space-y-5">
      <Card title="Narrative copy">
        <div className="space-y-3">
          <Field label="Eyebrow" value={n.eyebrow} onChange={(v) => patch({ eyebrow: v })} />
          <Field label="Heading" value={n.heading} onChange={(v) => patch({ heading: v })} />
          <Area label="Intro" value={n.intro} onChange={(v) => patch({ intro: v })} />
          <Area label="Closing" value={n.closing} onChange={(v) => patch({ closing: v })} />
        </div>
      </Card>
      <Card title="Pillars (the three disciplines)">
        <div className="space-y-4">
          {n.pillars.map((pillar, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-ink-900/50 p-3">
              <div className="mb-2 grid gap-3 sm:grid-cols-2">
                <Field
                  label="Field"
                  value={pillar.field}
                  onChange={(v) => {
                    const next = [...n.pillars];
                    next[i] = { ...next[i], field: v };
                    patch({ pillars: next });
                  }}
                />
                <Select
                  label="Accent"
                  value={pillar.accent}
                  options={ACCENT_OPTIONS}
                  onChange={(v) => {
                    const next = [...n.pillars];
                    next[i] = { ...next[i], accent: v as any };
                    patch({ pillars: next });
                  }}
                />
              </div>
              <Field
                label="Title"
                value={pillar.title}
                onChange={(v) => {
                  const next = [...n.pillars];
                  next[i] = { ...next[i], title: v };
                  patch({ pillars: next });
                }}
              />
              <div className="mt-2">
                <Area
                  label="Description"
                  value={pillar.description}
                  onChange={(v) => {
                    const next = [...n.pillars];
                    next[i] = { ...next[i], description: v };
                    patch({ pillars: next });
                  }}
                  rows={3}
                />
              </div>
              <button
                onClick={() => patch({ pillars: n.pillars.filter((_, j) => j !== i) })}
                className="mt-2 text-xs text-slate-500 hover:text-red-400"
              >
                Remove pillar
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              patch({
                pillars: [
                  ...n.pillars,
                  { field: "New field", accent: "ai", title: "", description: "" },
                ],
              })
            }
            className="btn-ghost"
          >
            <PlusIcon className="h-4 w-4" /> Add pillar
          </button>
        </div>
      </Card>
    </div>
  );
}

/* Generic editable list of objects (education, certifications) */
function ListTab<T extends { id: string }>({
  title,
  items,
  setItems,
  empty,
  render,
}: {
  title: string;
  items: T[];
  setItems: (l: T[]) => void;
  empty: () => T;
  render: (item: T, update: (p: Partial<T>) => void, remove: () => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
        <button
          onClick={() => setItems([...items, empty()])}
          className="btn-ghost"
        >
          <PlusIcon className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((item) => {
        const update = (p: Partial<T>) =>
          setItems(items.map((x) => (x.id === item.id ? { ...x, ...p } : x)));
        const remove = () => setItems(items.filter((x) => x.id !== item.id));
        return (
          <Card key={item.id} title={""}>
            {render(item, update, remove)}
          </Card>
        );
      })}
    </div>
  );
}

/* Generic editable list with title + period fields and rich body */
function EntryTab<T extends { id: string; title: string; period: string }>({
  title,
  items,
  setItems,
  empty,
  content,
  titleField,
  periodField,
}: {
  title: string;
  items: T[];
  setItems: (l: T[]) => void;
  empty: () => T;
  content: (item: T, update: (p: Partial<T>) => void) => React.ReactNode;
  titleField: "title";
  periodField: "period";
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
        <button onClick={() => setItems([...items, empty()])} className="btn-ghost">
          <PlusIcon className="h-4 w-4" /> Add
        </button>
      </div>
      {items.map((item) => {
        const update = (p: Partial<T>) =>
          setItems(items.map((x) => (x.id === item.id ? { ...x, ...p } : x)));
        return (
          <Card key={item.id} title={""}>
            <div className="space-y-3">
              <Field
                label="Title"
                value={item[titleField]}
                onChange={(v) => update({ [titleField]: v } as Partial<T>)}
              />
              <Field
                label="Period"
                value={item[periodField]}
                onChange={(v) => update({ [periodField]: v } as Partial<T>)}
              />
              {content(item, update)}
            <button
              onClick={() => setItems(items.filter((x) => x.id !== item.id))}
              className="text-xs text-slate-500 hover:text-red-400"
            >
              Remove {title.toLowerCase()}
            </button>
          </div>
        </Card>
      );})}

    </div>
  );
}


/* The skills tab includes the automatic skill extractor */
function SkillsTab({
  content,
  setSkills,
}: {
  content: Content;
  setSkills: (l: Skill[]) => void;
}) {
  const [text, setText] = useState("");
  const [results, setResults] = useState<ExtractedSkill[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [cat, setCat] = useState<SkillCategory>("AI/ML");
  const [newName, setNewName] = useState("");

  const extract = async () => {
    setExtracting(true);
    const r = await fetch("/api/skills/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const j = await r.json();
    setExtracting(false);
    if (j.ok) setResults(j.skills);
  };

  const addExtracted = () => {
    setSkills(mergeSkills(content.skills, results));
    setResults([]);
    setText("");
  };

  const removeSkill = (id: string) =>
    setSkills(content.skills.filter((s) => s.id !== id));

  const addManual = () => {
    if (!newName.trim()) return;
    setSkills([
      ...content.skills,
      {
        id: `sk-${newName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: newName.trim(),
        category: cat,
      },
    ]);
    setNewName("");
  };

  return (
    <div className="space-y-5">
      <Card title="Automatic skill extractor">
        <p className="mb-3 text-sm text-slate-400">
          Paste any write-up, paper abstract, or project description. The extractor
          finds the technical skills inside and suggests them below — then add them
          to your public Skills section in one click.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="e.g. Built a ResNet-18 classifier in PyTorch, analyzed orbital perturbations with SpiceyPy, modeled flow with CFD in SolidWorks…"
          className="w-full resize-y rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm leading-relaxed text-slate-100 outline-none focus:border-ai/60"
        />
        <div className="mt-3 flex items-center gap-2">
          <button onClick={extract} disabled={extracting} className="btn-primary disabled:opacity-50">
            <SparkIcon className="h-4 w-4" /> {extracting ? "Extracting…" : "Extract skills"}
          </button>
          {text.trim() && (
            <button onClick={() => { setText(""); setResults([]); }} className="btn-ghost">
              Clear
            </button>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-4 rounded-lg border border-ai/30 bg-ai/5 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-ai">
                Found {results.length} skill{results.length > 1 ? "s" : ""}:
              </span>
              <button onClick={addExtracted} className="btn-primary !py-1.5 !text-xs">
                + Add all to Skills
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {results.map((s, i) => (
                <span
                  key={i}
                  className="chip border border-white/15 bg-white/5 text-slate-200"
                >
                  {s.name}{" "}
                  <span className="ml-1 text-[10px] uppercase text-slate-500">
                    {CATEGORY_META[s.category].label.split(" ")[0]}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card title="All skills (click ✕ to remove)">
        <div className="mb-3 flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Add a skill manually…"
            className="flex-1 rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-100 outline-none focus:border-ai/60"
          />
          <Select label="Category" value={cat} options={[
            { value: "AI/ML", label: "AI / ML" },
            { value: "Astrophysics", label: "Astrophysics" },
            { value: "Mechanical", label: "Mechanical" },
            { value: "General", label: "General" },
          ]} onChange={(v) => setCat(v as SkillCategory)} />
          <button onClick={addManual} className="btn-primary whitespace-nowrap">
            <PlusIcon className="h-4 w-4" /> Add
          </button>
        </div>

        <div className="space-y-3">
          {(["AI/ML", "Astrophysics", "Mechanical", "General"] as SkillCategory[]).map(
            (category) => {
              const items = content.skills.filter((s) => s.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category}>
                  <div className="mb-1.5 text-xs uppercase tracking-wider text-slate-500">
                    {CATEGORY_META[category].label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span
                        key={s.id}
                        className="chip border border-white/15 bg-white/5 text-slate-200"
                      >
                        {s.name}
                        <button
                          onClick={() => removeSkill(s.id)}
                          className="ml-1.5 text-slate-500 hover:text-red-400"
                          aria-label={`Remove ${s.name}`}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Card>
    </div>
  );
}

function ContactTab({
  c,
  patch,
}: {
  c: Content;
  patch: (p: Partial<Contact>) => void;
}) {
  const ct = c.contact;
  return (
    <Card title="Contact details">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Email" type="email" value={ct.email} onChange={(v) => patch({ email: v })} />
        <Field label="Phone" value={ct.phone} onChange={(v) => patch({ phone: v })} />
        <Field label="GitHub URL" value={ct.github} onChange={(v) => patch({ github: v })} />
        <Field label="LinkedIn URL" value={ct.linkedin} onChange={(v) => patch({ linkedin: v })} />
      </div>
      <div className="mt-3">
        <Area label="Note" value={ct.note} onChange={(v) => patch({ note: v })} rows={3} />
      </div>
    </Card>
  );
}

/* ───────────────────────── CV manager ───────────────────────── */

function CvTab({
  c,
  patch,
}: {
  c: Content;
  patch: (p: Partial<Profile>) => void;
}) {
  const cvUrl = c.profile.cvUrl;
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    setErr("");
    setMsg("");
    const fd = new FormData();
    fd.append("file", f);
    try {
      const r = await fetch("/api/cv", { method: "POST", body: fd });
      const j = await r.json();
      if (j.ok) {
        patch({ cvUrl: j.url });
        setMsg("CV uploaded — it's live on the site.");
      } else {
        setErr(j.error || "Upload failed");
      }
    } catch {
      setErr("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const onDelete = async () => {
    if (
      !window.confirm(
        "Delete the current CV? The hero 'Download CV' button will be hidden until you upload a new one."
      )
    ) {
      return;
    }
    setUploading(true);
    setErr("");
    setMsg("");
    try {
      const r = await fetch("/api/cv", { method: "DELETE" });
      const j = await r.json();
      if (j.ok) {
        patch({ cvUrl: "" });
        setMsg("CV removed.");
      } else {
        setErr(j.error || "Delete failed");
      }
    } catch {
      setErr("Delete failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Card title="Résumé / CV">
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          Upload your PDF here to publish it. Reuploading replaces the existing file
          and keeps the same download link, so you never have to touch the code. The
          link also appears as a <span className="text-slate-200">“Download CV”</span>{" "}
          button in the hero.
        </p>

        {cvUrl ? (
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-ink-850/60 p-3">
            <span className="chip border border-white/15 bg-white/5 text-slate-200">
              Current: {cvUrl}
            </span>
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline flex items-center gap-1 text-xs text-ai"
            >
              Open <ExternalIcon className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={onDelete}
              disabled={uploading}
              className="btn-ghost ml-auto disabled:opacity-50"
            >
              <TrashIcon className="h-4 w-4" /> Delete CV
            </button>
          </div>
        ) : (
          <p className="mb-4 text-sm text-slate-500">No CV uploaded yet.</p>
        )}

        <label className="btn-primary cursor-pointer whitespace-nowrap">
          <UploadIcon className="h-4 w-4" />
          {uploading ? "Uploading…" : cvUrl ? "Replace CV" : "Upload CV"}
          <input
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={onUpload}
          />
        </label>

        {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}
        {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
      </Card>
    </div>
  );
}

/* small shared bits */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-ink-900/50 p-5">
      {title && (
        <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}

function RemoveRow({ onRemove }: { onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-400"
    >
      <TrashIcon className="h-3.5 w-3.5" /> Remove
    </button>
  );
}

function StringList({
  label,
  items,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  items: string[];
  onChange: (l: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            {multiline ? (
              <textarea
                value={it}
                rows={3}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={placeholder}
                className="flex-1 resize-y rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm leading-relaxed text-slate-100 outline-none focus:border-ai/60"
              />
            ) : (
              <input
                value={it}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={placeholder}
                className="flex-1 rounded-lg border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-100 outline-none focus:border-ai/60"
              />
            )}
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-slate-500 hover:text-red-400"
              aria-label="Remove"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange([...items, ""])}
          className="btn-ghost"
        >
          <PlusIcon className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
}

/* helper used inside EntryTab body render to update nested fields */

