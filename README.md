<<<<<<< HEAD
# SeerHive — Site

A Next.js 14 (App Router) + Tailwind CSS marketing site for **Seertech
Systems**, the parent company behind six projects: five focused AI hiring
agents (Resume Analyser, JD Preparation, Interview Question Generator,
Resume Templates, Resume Enhancer) and **Seer Hive**, the HRM system that
runs them together.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. First build needs internet access once, to
fetch the Google Fonts used in `app/layout.tsx`.

## What's in this build

- **`/`** — homepage: hero, interactive project spotlight, Seer Hive
  showcase, live-walkthrough section, FAQ.
- **`/projects/[slug]`** — a detail page per project (`resume-analyser`,
  `jd-preparation`, `interview-questions`, `resume-templates`,
  `resume-enhancer`, `seer-hive`), statically generated from `lib/projects.ts`.
- **`/contact`** — contact page with a UI-only form (see below).
- **Light / dark mode** — toggle in the navbar, persisted to
  `localStorage`, defaults to the visitor's OS preference on first visit.

## Where to edit things

- **All project copy, stats, feature lists, "how it works" steps** →
  `lib/projects.ts`. This one file drives the homepage spotlight, the
  detail pages, and the footer's project list — add a 7th project here and
  it shows up everywhere automatically.
- **Product "screenshot" mockups** → `components/MockPanel.tsx`. These are
  hand-built UI mockups, not real screenshots — swap in actual product
  screenshots or images here when you have them (see note below).
- **Hero headline / stats** → `components/Hero.tsx`
- **The hex "hive" diagram** → `components/HiveDiagram.tsx`
- **Live walkthrough / demo section** → `components/EventSection.tsx` —
  intentionally location-agnostic ("online or on-site"); it's not tied to
  a single city or date.
- **Contact form fields** → `components/ContactForm.tsx` — currently just
  flips to a "Message received" state on submit with no backend call. Wire
  the `onSubmit` handler up to your email/CRM/API endpoint of choice.
- **Colors / fonts** → `app/globals.css` (CSS variables for light/dark) and
  `tailwind.config.ts` (which points Tailwind's color classes at those
  variables) and `app/layout.tsx` (Space Grotesk / Inter / JetBrains Mono).

## How the interactive project spotlight works

`components/ProjectSpotlight.tsx` (the "Six projects, one system" section
on the homepage) is the piece behind requests #4, #7 and #8:

- **Desktop (`lg` and up):** hovering or clicking a project row swaps the
  sticky preview panel on the right, and the "what it evaluates" grid
  below updates to match — all state-driven from `lib/projects.ts`, not
  hardcoded per project.
- **Mobile / tablet:** the side panel becomes a small floating card fixed
  to the bottom-right corner. It syncs to whichever project row is
  scrolled into view (via `IntersectionObserver`), and fades out
  completely once the whole section scrolls out of frame.

## How theming works

Colors aren't hardcoded Tailwind classes like `bg-[#12142A]` — they're CSS
custom properties (`--ink`, `--surface`, `--gold`, etc.) defined twice in
`app/globals.css`: once under `:root` (dark, the default) and once under
`html.light` (light mode). `tailwind.config.ts` points every color token
at `rgb(var(--x) / <alpha-value>)`, so the existing `bg-ink`, `text-paper`,
`border-gold/40`-style classes automatically work in both themes with zero
per-component changes.

The **product mockup panels** (`MockPanel.tsx`, the hive diagram, the Seer
Hive dashboard) intentionally stay dark regardless of site theme — this
mirrors how a real product screenshot wouldn't change color with the
marketing page around it. They use a separate fixed palette
(`chromeInk`, `chromeGold`, etc. in `tailwind.config.ts`) rather than the
theme-reactive tokens.

## What I'd extend first

1. **Real product screenshots.** `MockPanel.tsx` is a placeholder UI
   mockup per project — swap in actual app screenshots or a `next/image`
   once you have them, keeping the same dark "chrome" treatment.
2. **Wire up the contact form and the demo-request field** on the
   homepage to a real email/CRM endpoint (a Next.js Route Handler under
   `app/api/contact/route.ts` is the natural place).
3. **CMS-ify `lib/projects.ts`** if project copy will change often —
   right now it's a static TypeScript file, which is fine for six items
   but would get unwieldy for a growing catalog.
4. **Add `next/image`-based OG images** per project for social sharing,
   using each project's `name`/`tagline` from `lib/projects.ts`.
=======
# Seerhive-landing
This is the landing page of the seerhive 
>>>>>>> 4567a74bbadef54dd5d837d7e5068c24b12420da
