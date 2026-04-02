# Project Overview & PDR

## Project Name
**DS Prototype Template** — A lightweight Vue 3 application for building static prototypes using the Ankorstore Design System.

## Vision
Empower designers, product managers, and developers to rapidly build, iterate, and validate prototype ideas using a modern component library with zero backend infrastructure.

## Purpose
DS Prototype Template serves as a **template repository** for creating standalone Vue 3 applications that:
- Utilize Ankorstore Design System (v28) components exclusively
- Manage state with static JSON fixtures (no API calls or database)
- Deploy instantly to GitHub Pages for stakeholder review
- Demonstrate component library capabilities and design patterns
- Enable fast prototyping without build pipeline complexity

## Target Users
1. **Designers** — Create interactive prototypes without coding
2. **Product Managers** — Validate flows and user journeys
3. **Developers** — Build reference implementations quickly
4. **Design System Team** — Showcase component library

## Key Features

### Core Capabilities
- **Static Prototyping** — No backend required; data flows through JSON fixtures
- **Component Library Integration** — Global registration of Ankorstore Design System (Ak* prefix)
- **Vue 3 + TypeScript** — Type-safe, modern JavaScript development
- **Routing** — Vue Router v4 for multi-page navigation with layout persistence
- **Design Tokens** — CSS custom properties for spacing, typography, colors, radius
- **Instant Deployment** — GitHub Actions auto-deployment to GitHub Pages
- **AI-Friendly** — Includes CLAUDE.md with full component reference for AI coding assistance

### Technical Constraints
- **Static Data Only** — No API calls, no backend services
- **Design System Components** — No external UI libraries (no Vuetify, PrimeVue, etc.)
- **Composition API** — Modern Vue 3 with `<script setup>` syntax required
- **CSS Tokens** — All styling via CSS custom properties, no Tailwind (was removed)
- **Vite 6** — Fast build tool optimized for single-page deployments

## Success Metrics
- **Time to Deploy** — From template to live GitHub Pages in < 5 minutes
- **Developer Velocity** — New page creation in < 2 minutes
- **Component Reuse** — 100% reliance on Ankorstore DS components
- **Type Safety** — Zero `any` types; full TypeScript coverage
- **Zero Production Dependencies** — Only @ankorstore/design-system and Vue Router (besides Vue)

## Functional Requirements

### FR-1: Multi-Page Application
- Create 3+ pages with independent routes
- Sidebar navigation with icon + label
- Persistent layout (header, sidebar) across page transitions
- Route parameter support (e.g., `/orders/:id`)

### FR-2: Data Management
- Load static JSON fixtures in `src/data/`
- Type-safe fixture loading via TypeScript interfaces in `types.ts`
- Computed properties for filtering/sorting
- No API or state management library

### FR-3: Component Usage
- Use only Ankorstore Design System components (Ak* prefix)
- Global registration; no imports needed in templates
- Support all major component types: buttons, inputs, tables, modals, alerts, badges

### FR-4: Styling
- Apply design tokens for spacing, typography, colors
- CSS custom properties with fallback colors
- Responsive layout via flexbox and CSS Grid
- Scoped styles; no global CSS pollution

### FR-5: Deployment
- Manual deployment to GitHub Pages via `npm run deploy`
- Static build output (no server-side rendering)
- Automatic CSS and JS minification
- Environment-aware build (relative paths for GitHub Pages)

## Non-Functional Requirements

### NFR-1: Performance
- Build time < 10 seconds
- First Contentful Paint < 2 seconds
- Lighthouse score > 90

### NFR-2: Developer Experience
- Clear file naming conventions (kebab-case)
- Well-documented component reference (CLAUDE.md)
- Recipe examples for common patterns
- TypeScript strict mode enabled

### NFR-3: Maintainability
- Source files kept under 200 lines
- Modular component structure
- Separation of concerns (pages, components, data)
- Consistent code style via Prettier

### NFR-4: Accessibility
- WCAG 2.1 Level AA compliance via Ankorstore DS
- Semantic HTML via component library
- Keyboard navigation support
- Color contrast compliance

## Architecture Overview

```
DS Prototype Template
│
├── Pages (src/pages/)
│   ├── HomePage.vue          — Landing page
│   ├── OrderListPage.vue     — Table + filters
│   └── OrderDetailPage.vue   — Detail view with drill-down
│
├── Shared Layout (src/layouts/)
│   └── AppLayout.vue         — Sidebar + topbar wrapper
│
├── Reusable Components (src/components/)
│   ├── AppSidebar.vue        — Navigation menu
│   ├── AppTopbar.vue         — Header with branding
│   └── OrderFilterBar.vue    — Filter UI for orders
│
├── Static Data (src/data/)
│   ├── orders.json           — Mock order fixtures
│   ├── order-statuses.json   — Status enums
│   └── types.ts              — TypeScript interfaces
│
├── Routing (src/router.ts)   — Route definitions
├── Styles (src/styles/)      — Design tokens (CSS custom properties)
└── Main (src/main.ts)        — Vue app initialization
```

## File Structure
```
project-root/
├── src/                       — Application source code (917 LOC)
│   ├── pages/                 — Page components (one per route)
│   ├── components/            — Shared layout + UI components
│   ├── layouts/               — Page wrapper layout
│   ├── data/                  — JSON fixtures + TypeScript types
│   ├── styles/                — Design tokens CSS
│   ├── App.vue                — Root Vue component
│   ├── main.ts                — App entry point
│   ├── router.ts              — Route config
│   └── env.d.ts               — TypeScript environment types
│
├── docs/                      — Documentation
├── public/                    — Static assets
├── .github/workflows/         — GitHub Actions CI/CD
├── .devcontainer/             — GitHub Codespaces config
├── vite.config.ts             — Vite build configuration
├── tsconfig.json              — TypeScript configuration
├── package.json               — Dependencies and scripts
├── CLAUDE.md                  — AI assistant component reference
└── README.md                  — Quick start guide
```

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **UI Framework** | Vue 3 | ^3.5.22 | Component framework |
| **Component Library** | @ankorstore/design-system | ^28.4.0 | Pre-built DS components |
| **Router** | Vue Router | ^4.5.0 | Client-side routing |
| **Language** | TypeScript | ^5.7.0 | Type safety |
| **Build Tool** | Vite | ^6.0.0 | Fast build & dev server |
| **CSS** | Design Tokens (CSS custom properties) | — | Spacing, typography, colors |
| **Deployment** | GitHub Pages | — | Static hosting |

## Implementation Phases

### Phase 1: Setup & Foundation (Complete)
- Initialize Vite + Vue 3 + TypeScript project
- Configure Ankorstore Design System integration
- Set up Vue Router with base layout
- Create design tokens CSS

### Phase 2: Data & Fixtures (Complete)
- Define TypeScript interfaces (Order, OrderStatus)
- Create JSON fixture files
- Implement type-safe data loading

### Phase 3: Pages & Routes (Complete)
- Build HomePage (overview/landing)
- Build OrderListPage (table with filters)
- Build OrderDetailPage (detail with drill-down)
- Configure routes in router.ts

### Phase 4: Components & Layout (Complete)
- Create AppLayout wrapper (sidebar + topbar)
- Build AppSidebar with navigation
- Build AppTopbar with branding
- Create OrderFilterBar component

### Phase 5: Styling & Polish (Complete)
- Apply design tokens to all components
- Ensure responsive layout
- Verify color contrast and accessibility

### Phase 6: Deployment (Complete)
- Configure GitHub Pages workflow
- Test static build output
- Verify relative paths for GitHub Pages

## Usage Patterns

### Creating a New Page
1. Create file in `src/pages/MyPage.vue`
2. Add route to `src/router.ts`
3. Add nav item to `AppSidebar.vue`
4. Use Ankorstore DS components in template

### Adding Data
1. Create JSON file in `src/data/`
2. Define TypeScript interface in `src/data/types.ts`
3. Import and use in page components

### Styling Approach
- Use CSS custom properties: `var(--space-4)`, `var(--radius-md)`
- Keep styles scoped to component
- Prefer component props over custom CSS
- No @apply or Tailwind utilities (removed)

## Deployment Information

### GitHub Pages
- **Build Command:** `npm run build` (with GITHUB_PAGES=true env var)
- **Deploy Command:** `npm run deploy` (builds + pushes to gh-pages branch)
- **Output Directory:** `dist/`
- **Hosting:** GitHub Pages (serves from gh-pages branch)
- **Trigger:** Manual via `npm run deploy`
- **Base URL:** `https://{username}.github.io/{repo-name}/`

### Environment Variables
- `GITHUB_PAGES` — Set to true to use relative paths (auto-detected)
- No runtime env vars needed (static data only)

### Build & Deploy Time
- Type checking: < 2 seconds
- Vite build: < 5 seconds
- Deploy to gh-pages: < 10 seconds
- Total: < 20 seconds

## Acceptance Criteria

All documentation deliverables must:
- Be accurate and verifiable against the codebase
- Include practical examples and code snippets
- Provide clear navigation and cross-references
- Use consistent formatting and terminology
- Be maintained as the codebase evolves

---

**Last Updated:** 2026-03-27
**Status:** Active Template
**Maintenance:** Community contributions welcome via GitHub Issues and PRs
