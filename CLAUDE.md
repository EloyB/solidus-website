# CLAUDE.md — Solidus

> This file provides Claude Code with the full project context, conventions, and rules for the **Solidus** website project.

---

## Project Overview

| Key                  | Value                                                                                                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client**           | Solidus                                                                                                                                                                                                                                                  |
| **Industry**         | Private Investment                                                                                                                                                                                                                                       |
| **About**            | A private investment partnership deploying family capital in selected businesses, real estate and financing opportunities. Solidus focuses on opportunities they understand, where experience, discipline and active involvement create long-term value. |
| **Project type**     | Marketing site                                                                                                                                                                                                                                           |
| **Primary language** | EN                                                                                                                                                                                                                                                       |
| **Stack**            | Next.js 15, Payload CMS 3, Tailwind CSS 4, TypeScript                                                                                                                                                                                                    |
| **Deployment**       | Scaleway                                                                                                                                                                                                                                                 |
| **Package manager**  | Bun                                                                                                                                                                                                                                                      |

### Brand notes

- Professional tone of voice, but never salesy or overly promotional
- Keep the overall aesthetic of the site light — avoid heavy, dark, or corporate-feeling layouts
- Content should feel considered and understated — let the work speak for itself
- Avoid superlatives and marketing clichés; prefer clear, direct language

---

## Tech Stack & Versions

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3 (local API pattern — always use `payload.find()` in server components, never HTTP calls to Payload)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5 (strict mode)
- **Runtime/Package manager**: Bun
- **Linting**: ESLint + Prettier (configs in root)

---

## Design Tokens

### Colors

```
--color-gold:       #BFA15A   /* Primary accent — use for headings, highlights, CTAs */
--color-navy:       #0F1E2E   /* Deep navy — use sparingly, e.g. footer, dark sections */
--color-muted:      #A0A0A0   /* Secondary text, borders, dividers */
--color-white:      #FFFFFF   /* Base background, card surfaces */
```

**Usage guidelines:**

- Site background should be predominantly white (`#FFFFFF`) to maintain the light theme
- Gold (`#BFA15A`) is the primary brand accent — use for key UI elements, not decoratively everywhere
- Navy (`#0F1E2E`) anchors the footer and can be used for full-bleed dark sections sparingly
- Muted grey (`#A0A0A0`) for supporting text and subtle UI chrome

### Typography

- Use Tailwind's font utilities; define custom fonts in `tailwind.config.ts` under `theme.extend.fontFamily`
- Prefer `rem` units for font sizes

### Spacing & layout

- Use Tailwind spacing scale
- Max content width: `max-w-7xl` with `px-4 sm:px-6 lg:px-8` horizontal padding
- Mobile-first: always write base styles for mobile, use `sm:`, `md:`, `lg:` for larger breakpoints

---

## Folder Structure

```
/
├── src/
│   ├── app/
│   │   ├── (app)/                     # Public-facing site routes (the "frontend")
│   │   │   ├── layout.tsx             # Site layout (header, footer)
│   │   │   ├── page.tsx               # Homepage
│   │   │   └── [...slug]/             # Dynamic CMS-driven pages
│   │   └── (payload)/                 # Payload CMS admin (auto-generated, do not edit)
│   │       └── admin/
│   ├── components/
│   │   ├── ui/                        # Generic reusable UI components (Button, Card, etc.)
│   │   ├── layout/                    # Header, Footer, Navigation, Section wrappers
│   │   └── blocks/                    # Payload block renderers (mapped to CMS block types)
│   ├── lib/
│   │   ├── payload.ts                 # Payload client singleton
│   │   └── utils.ts                   # Shared utility functions
│   └── types/                         # Shared TypeScript types and interfaces
├── payload/
│   ├── collections/                   # Payload collection configs
│   │   ├── Pages.ts
│   │   ├── Team.ts
│   │   ├── Projects.ts
│   │   └── Media.ts
│   ├── blocks/                        # Payload block field configs
│   └── payload.config.ts              # Payload root config
├── public/                            # Static assets
├── .env.local                         # Local environment variables (never commit)
├── .env.example                       # Template for required env vars (commit this)
├── tailwind.config.ts
├── next.config.ts
└── CLAUDE.md                          # This file
```

**Route group rules:**

- All public pages live under `src/app/(app)/` — this is the "frontend"
- `src/app/(payload)/` is fully managed by Payload — never manually add files here
- The route groups `(app)` and `(payload)` don't affect the URL structure

---

## Payload CMS Conventions

### Collections

The following Payload collections are defined for this project:

| Collection | Slug       | Purpose                                                                      |
| ---------- | ---------- | ---------------------------------------------------------------------------- |
| Pages      | `pages`    | CMS-driven marketing pages (Home, About, Contact, etc.)                      |
| Team       | `team`     | Team member profiles (name, role, bio, photo)                                |
| Projects   | `projects` | Investment projects/portfolio entries (title, description, category, status) |
| Media      | `media`    | All image and file uploads; always reference this for image fields           |

### Rules

- Always use the **local API** (`payload.find()`, `payload.findByID()`, etc.) inside Next.js server components — never fetch Payload over HTTP internally
- Collection slugs use **kebab-case** (e.g. `blog-posts`)
- All collections should have a `updatedAt` and `createdAt` field (Payload adds these by default)
- Rich text fields use Lexical editor unless specified otherwise
- Media collection handles all image/file uploads; always reference Media for image fields (never store raw URLs)

---

## Component Conventions

- **Naming**: PascalCase for component files and exports (e.g. `HeroSection.tsx`)
- **Location**:
  - Generic UI → `src/components/ui/`
  - Layout elements → `src/components/layout/`
  - CMS block renderers → `src/components/blocks/`
- **Props**: Always define a TypeScript interface for component props
- **Server vs client**: Default to React Server Components; only add `"use client"` when interactivity or browser APIs are needed
- **No inline styles**: Use Tailwind utility classes exclusively; avoid `style={{}}` props
- **No magic strings**: Extract repeated class strings into variables or use `cn()` utility

---

## TypeScript Rules

- `strict: true` in `tsconfig.json` — no exceptions
- No `any` types — use `unknown` and narrow, or generate proper types
- Payload auto-generates types from collection configs — import from `@/payload-types`
- Use `type` for object shapes, `interface` for extendable contracts

---

## Code Style

- **Prettier**: enforced on save; config in `.prettierrc`
- **ESLint**: enforced; config in `eslint.config.mjs`
- **Imports**: use `@/` path alias for all `src/` imports
- **File naming**: kebab-case for files (e.g. `hero-section.tsx`), PascalCase for the exported component inside
- **No unused imports or variables** — ESLint will catch these

---

## Environment Variables

All environment variables live in `.env.local` (not committed). A `.env.example` file documents all required variables.

Required variables:

```
# Payload / Database
DATABASE_URI=
PAYLOAD_SECRET=

# Next.js
NEXT_PUBLIC_SERVER_URL=

# Scaleway Object Storage (for Media uploads)
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=
S3_REGION=
S3_ENDPOINT=
```

- Variables exposed to the browser must be prefixed with `NEXT_PUBLIC_`
- Never hardcode secrets or API keys in source files

---

## SEO & Accessibility

- Every page must export a `generateMetadata()` function with `title`, `description`, and `openGraph` fields
- Images must always include meaningful `alt` text
- Use semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`)
- Color contrast must meet WCAG AA minimum
- Interactive elements must be keyboard-accessible

---

## What Claude Code Should Do

- Follow all conventions in this file exactly
- When creating a new component, always scaffold the TypeScript interface for props
- When adding a new Payload collection, also create the corresponding TypeScript type and block renderer if applicable
- When in doubt about structure, follow the existing folder conventions above
- Always prefer server components; only use `"use client"` when strictly necessary
- Never install packages without flagging it to the developer first
- Keep components small and single-responsibility; extract sub-components when a file exceeds ~150 lines

---

_Last updated: auto-generated by client-project-setup skill_

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current
