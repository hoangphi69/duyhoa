# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

Corporate website for **Duy Hoà 68** (`duyhoa.vn`), a Vietnamese building materials distributor (electrical, plumbing, sanitary equipment). Vietnamese-language site targeting the Quảng Ninh–Hải Phòng–Hải Dương region.

**Stack:** Next.js 16 (App Router) · React 19 · Sanity CMS v6 · Tailwind CSS v4 · shadcn/ui (base-lyra style) · TypeScript

## Commands

```bash
npm run dev      # Start dev server (Turbopack) — http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (flat config, core-web-vitals + typescript)
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset name (e.g., `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` — optional, defaults to `2026-08-01`
- `SANITY_API_WRITE_TOKEN` — server-only token for form submission writes

## Architecture

### Route Groups

- `app/(site)/` — Public-facing pages with shared Navbar + Footer layout
- `app/studio/[[...tool]]/` — Embedded Sanity Studio at `/studio` (force-static)

### Key Routes

| Route | Description |
|---|---|
| `/` | Landing page (hero, stats, products, distribution map, reasons) |
| `/product` | Product listing with category/subcategory filters |
| `/product/[slug]` | Product detail (gallery, specs, related products) |
| `/catalogue` | Downloadable catalogues/price lists |
| `/article` | Article hub (news, events, guides) |
| `/article/[slug]` | Article detail with ToC |
| `/article/news\|event\|guide` | Filtered article listings by type |
| `/projects` | Showcase completed projects |
| `/contact/agency` | Agency registration form |
| `/contact/project` | Project quote request form |
| `/about` | Company info page |

### Sanity CMS

- **Config:** `sanity.config.tsx` (root) — `'use client'`, mounted at `/studio`
- **Schemas:** `sanity/schemaTypes/` — organized by domain:
  - `product/` — `product`, `brand`, `category`, `subcategory`, `catalogue`
  - `article/` — `newsType`, `eventType`, `guideType`
  - `contact/` — `agency`, `project` (form submissions stored as Sanity documents)
  - `project.ts` — showcase projects
- **Clients:** `sanity/lib/client.ts` — read client (CDN-enabled) and `writeClient` (server-only, uses `SANITY_API_WRITE_TOKEN`)
- **Live content:** `sanity/lib/live.ts` — `sanityFetch` / `SanityLive` via `next-sanity/live`
- **Image URLs:** `sanity/lib/image.ts` — `urlFor()` helper
- **Desk structure:** `sanity/structure.ts` — custom ordering with `@sanity/orderable-document-list`
- **Plugins:** `sanity-plugin-rich-table`, `@sanity/locale-vi-vn` (Vietnamese locale), `@sanity/vision`

Data is fetched server-side using GROQ queries directly in page components via the Sanity client.

### Component Organization

- `components/ui/` — shadcn/ui primitives (Button, Card, Input, Accordion, etc.)
- `components/landing/` — Homepage sections (hero, statistics, products, distribution, capacity, reasons)
- `components/article/` — Article cards and layouts
- `components/product/` — Product and catalogue cards
- `components/project/` — Project cards
- `components/seo/JsonLd.tsx` — Structured data (Organization, WebSite schemas)
- `components/navbar.tsx` — Server component that fetches categories; delegates to `navbar-client.tsx`
- `components/footer.tsx`, `components/contact-bubble.tsx`, `components/breadcrumb.tsx`

### Server/Client Split Pattern

Server components fetch Sanity data and pass it as props to client components. Client components handle interactivity (galleries, forms, navigation menus). Files needing `'use client'` are suffixed with `-client.tsx` (e.g., `navbar-client.tsx`, `section-products-client.tsx`).

### Forms & Validation

Contact forms use **React Hook Form** + **Zod v4** for client validation, with **Server Actions** (`app/(site)/contact/actions.ts`) that re-validate server-side and write submissions to Sanity via `writeClient`.

### Centralized Site Config

`config/site.ts` — single source of truth for brand info, contact details, region data, category definitions, social links, and SEO metadata. Referenced throughout for metadata generation and content.

### Utilities

`lib/utils.tsx` — `cn()` (clsx + tailwind-merge), `createMetadata()` (per-page SEO helper), `slugify()`, `calculateReadTime()`, `generateToC()`, `IconMapper`, `getCategoryStyle`, `formatPhoneNumber`.

### Styling

- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- CSS variables for theming in `app/globals.css` (shadcn token system)
- Three font families: Inter (sans/body), Merriweather (headings), Geist Mono (monospace/labels)
- `motion` library (Framer Motion successor) for animations
- SVGs imported as React components via `@svgr/webpack` (configured in `next.config.ts` for Turbopack)

### Path Aliases

`@/*` maps to project root (e.g., `@/components/ui/button`, `@/sanity/lib/client`, `@/config/site`).
