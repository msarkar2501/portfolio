# Manit Sarkar — Portfolio

A dark, animation-rich personal portfolio built to showcase a **multidisciplinary** profile:
**AI / ML × Astrophysics / Astrodynamics × Mechanical Engineering**.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion
- **Editing:** a private, password-protected admin panel at `/admin` that writes straight to
  `src/data/content.json` — no database required.
- **Skill extractor:** paste any write-up in the admin and it auto-detects the technical
  skills inside, grouped by discipline, and adds them to the public Skills section.

---

## Run it

```bash
npm install          # already done
npm run dev          # dev server at http://localhost:3000
# or production:
npm run build && npm run start
```

## Edit your content (only you can)

1. Open **`/admin`** (e.g. http://localhost:3000/admin).
2. Enter the admin password (see below).
3. Use the tabs — **Profile, Narrative, Education, Research, Internship,
   Projects, Certifications, Skills, Contact** — to change anything. Click
   **Save changes**; the public site updates instantly.

### Changing the admin password (do this first)

The password lives in **`.env.local`** (git-ignored, never committed):

```
ADMIN_PASSWORD=Manit-Portfolio-2026!     # <-- change this to something private
ADMIN_SECRET=...                          # long random string; keep secret
```

Restart the dev/prod server after editing `.env.local`. To generate a fresh
`ADMIN_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

A copy of the template is in `.env.local.example`.

## Adding media (images / video)

In the Research / Internship / Projects editor, the **Media** box accepts:
- a direct image/video URL, or a YouTube / Vimeo link (embedded automatically), or
- an **Upload file** button (saved to `public/uploads/`, git-ignored).

## The skill extractor

Open the **Skills** tab in `/admin`, paste a paper abstract, internship blurb, or
project description, and hit **Extract skills**. Detected skills (e.g. *PyTorch,
SpiceyPy, CFD, OpenCV*) appear grouped by discipline — click **+ Add all to Skills**.

## Project structure

```
src/
  app/
    layout.tsx              # fonts, background, persistent nav
    page.tsx               # composes the public site (force-dynamic)
    admin/page.tsx         # the owner-only editor + skill extractor
    api/
      auth/{login,logout,me}/route.ts
      content/route.ts      # GET (public) + POST (owner-only)
      skills/extract/route.ts
      upload/route.ts
  components/              # Hero, Summary, Multidisciplinary, Research, ...
  lib/
    content.ts             # reads/writes src/data/content.json
    auth.ts                # password + session-cookie helpers
    skills.ts / skills-dictionary.ts  # the skill extractor
    accents.ts             # discipline color mapping
  data/
    content.json           # <-- the single source of truth for all site content
```

## Security note

Pinned to **Next.js 14.2.35** (the latest patched 14.x). A few upstream
Next.js advisories are only fully cleared by upgrading to Next 16 (a major
breaking change). None of the remaining items affect the features this site uses
(image-optimizer remote patterns, i18n middleware, etc.), but when you're ready
to move to Next 15/16, plan for a React 19 + Framer Motion re-check.

Keep `.env.local` secret, never commit it, and use a strong, private
`ADMIN_PASSWORD`.
