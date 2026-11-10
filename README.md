# Nandun Nethanga Perera — UI/UX Portfolio

A work-first portfolio: a single landing page plus a case-study page per project.
**Every project page is fully editable in Sanity** — text, images, video, layout,
widths, spacing, colours, animations and order.

Design direction draws on [Rachel Chen](https://rachelchen.tech/) (serif statement
headline, warm paper texture, side rail with scroll-spy, staggered project grid,
editorial case studies) and [Sparsh Paliwal](https://www.sparshpaliwal.com/)
(architectural guide lines, design-tool selection handles, “next project” flow,
three-column footer), with touches from Mrunal Dhaygude’s minimal intro.
The signature detail is a design-tool theme: Figma-style selection boxes and a
“multiplayer” cursor that labels interactive elements.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Sanity v6** with an embedded Studio at `/studio`, live content updates (`<SanityLive />`) and the Presentation tool for click-to-edit previews
- **Motion** (Framer Motion) for animations, **Lenis** for smooth scrolling
- Fonts: Noto Serif Display (display serif, self-hosted, OFL), Geist Sans

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Until Sanity is connected the site shows four clearly
labelled **sample projects** (a case-study template and block showcases) so you can
see every layout option. They disappear automatically once Sanity is configured.

## Connect Sanity

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
   (or run `npx sanity@latest init --env` in this folder).
2. Copy `.env.example` to `.env.local` and fill in:

   | Variable | Required | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | From sanity.io/manage |
   | `NEXT_PUBLIC_SANITY_DATASET` | yes | Usually `production` |
   | `SANITY_API_READ_TOKEN` | optional | A **Viewer** token — enables draft previews in the Presentation tool |
   | `NEXT_PUBLIC_SITE_URL` | recommended | Your live URL (used for SEO metadata and the sitemap) |

3. In sanity.io/manage → **API → CORS origins**, add `http://localhost:3000` and your
   production URL, each with **Allow credentials** ticked (required for the embedded Studio).
4. Restart `npm run dev`, then open http://localhost:3000/studio and create a project.

## Editing content

### Landing page — `src/content/site.ts`

All landing-page copy (hero intro, selected-work intro, experience, contact) comes from
Nandun’s content brief and lives in one typed file. **Add the LinkedIn and Dribbble
URLs there** — empty links are hidden.

### Projects — Sanity Studio (`/studio`)

Drag projects in the **Projects** list to set their order on the home page. Each
project has five tabs:

| Tab | What you control |
| --- | --- |
| **Content** | Name, slug, headline, one-line description, type, year, project details (Role, Timeline, Team, Tools…), and the page builder |
| **Home card** | Show on home page, cover image/GIF/video, card colour, aspect ratio (mix ratios for the staggered grid), fit, padding, hover label, optional external link |
| **Hero** | Media-first / title-first / no media, hero media, colour, width (content/wide/full-bleed), ratio, fit, padding |
| **Page design** | Title alignment and size, accent / background / text colours, sidebar contents, reading-progress bar, next project |
| **SEO** | Title, description, social image |

**Page-builder blocks** (13): Section heading, Text, Quote, Callout, Image/video,
Gallery (grid, masonry, carousel), Before/after slider, Embed (Figma, YouTube, Vimeo,
Loom…), Text + media, Columns, Cards, Stats, Divider/spacer.

Every block has **Layout & style** settings: width (text column / content / wide /
full bleed), alignment, space above/below, a full-width background band, text tone,
entrance animation, “hide this block”, and a sidebar label (section or sub-section).
Section headings appear in the sidebar automatically.

With `SANITY_API_READ_TOKEN` set, open **Presentation** in the Studio to edit with a
live preview and click-to-edit overlays. Published changes appear on the site
automatically via Sanity Live (no redeploy needed).

## Deploying (Vercel)

1. Import the repo on [vercel.com/new](https://vercel.com/new).
2. Add the environment variables above.
3. Add the production URL to Sanity’s CORS origins (with credentials).

## Before publishing — content checklist

From the content brief (section 12):

- Confirm the MSc award date (shown as 2025–2026) and degree title.
- The SkyNet Hosting and Cloud99X dates overlap — confirm they’re accurate.
- Only describe research/testing methods, metrics or outcomes you can substantiate.
- Present accessibility as an interest unless a project demonstrates it.
- Only list tools you have genuinely used (none are listed by default).
- Replace the LinkedIn and Dribbble placeholders.

## Scripts

| Command | |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run sanity:validate` | Validate the Sanity schema |

## Project structure

```
sanity.config.ts            Studio config (structure, presentation, plugins)
src/app/(site)/             Landing page, /work/[slug] case studies, 404
src/app/studio/             Embedded Sanity Studio
src/app/api/draft-mode/     Preview (draft mode) enable/disable
src/components/home/        Landing-page sections
src/components/project/     Case-study header, hero, next project, progress
src/components/blocks/      Page-builder block renderers
src/components/media/       Sanity image/video, framed media, rich text
src/components/site/        Header, side rail, footer, cursor, buttons
src/content/site.ts         Landing-page content
src/content/samples.ts      Sample projects (only used without Sanity)
src/sanity/                 Client, live fetching, queries, schema
```
