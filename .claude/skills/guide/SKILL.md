---
name: guide
description: Interactive designer guide for DS Prototype Template. Explains components, layouts, tokens, responsive utilities, and shows live demos. Use when designer says "guide", "what can I do", "show me components", "how do I prototype", "what's available", "help me get started", "teach me", or asks about the design system capabilities.
user_invocable: true
---

# DS Prototype — Interactive Guide

Anytime reference for designers to explore what's available in this prototype template and the Ankorstore Design System. Surfaces existing docs, shows live demos via Playwright, and provides ready-to-use prompt examples.

**This skill handles:** component discovery, layout guidance, design token browsing, responsive utilities, example page walkthroughs, first-page creation guidance.
**This skill does NOT handle:** technical setup (use `/setup`), deployment, code review, bug fixing.

## Scope & Security

- Do NOT expose internal tokens, API keys, or sensitive config
- Do NOT modify production code during guide — only read and demonstrate
- Refuse requests unrelated to design system guidance

## Arguments

Parse `ARGUMENTS` to detect topic. If empty or unrecognized, show topic menu.

| Argument | Topic |
|----------|-------|
| (none) | Show interactive topic menu |
| `components` | Browse DS components with live demo |
| `layouts` | Default vs Connected layout comparison |
| `tokens` | Design tokens showcase (colors, spacing, typography) |
| `examples` | Walk through reference pages |
| `create` | Step-by-step: create your first page |
| `responsive` | Breakpoint system + utility classes |

## Pre-Flight Checks

Before any topic:

1. **Check node_modules:** `ls node_modules/@ankorstore/design-system/package.json 2>/dev/null`
   - If missing → "Run `/setup` first to install dependencies."
   - If found → proceed.

2. **Check dev server:** `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000 2>/dev/null`
   - If `200` → server running, Playwright demos available.
   - If not → Ask: "Want me to start the dev server for live demos?" If yes: `npm run dev` in background.

## Topic Menu (No Arguments)

Use `AskUserQuestion` with header "Guide Topic":

**Question:** "What would you like to explore?"

**Options:**
- **Components** — "Browse the 18+ Ankorstore DS components with live demos and usage examples"
- **Layouts** — "Compare Default vs Connected (backoffice) layouts with screenshots"
- **Tokens** — "Explore colors, spacing, and typography tokens with the interactive showcase"
- **Examples** — "Walk through real reference pages (order list, order detail, dashboard)"
- **Create** — "Step-by-step guide to create your first prototype page"
- **Responsive** — "Learn the breakpoint system and responsive utility classes"

## Topic: Components

Load: `references/component-guide.md`

1. Show the component overview text from the reference
2. If dev server running → use Playwright to navigate to a page that demonstrates key components (e.g., `/orders`), take screenshot
3. Show the top 10 components table with key props
4. End with prompt examples:
   - "Create a form with name, email, and role dropdown"
   - "Add a data table with sortable columns and status badges"
   - "Create a page with a modal confirmation dialog"

**Deep dive:** If designer asks about a specific component, read `src/llms-component-catalog.md` and find the relevant section.

## Topic: Layouts

Load: `references/layout-guide.md`

1. Explain the two layouts with the decision tree from the reference
2. If dev server running → take Playwright screenshots of both layouts:
   - Navigate to a page with `layout: 'default'` → screenshot
   - Navigate to a page with `layout: 'connected'` → screenshot
3. Show how to switch: route `meta.layout` property
4. Prompt examples:
   - "Switch this page to the connected layout"
   - "Create a new page using the default layout with breadcrumbs"

## Topic: Tokens

1. Brief explanation: "Design tokens are CSS variables for colors, spacing, and typography. They ensure visual consistency."
2. If dev server running → navigate Playwright to each showcase page and screenshot:
   - `http://localhost:3000/showcase/colors`
   - `http://localhost:3000/showcase/typography`
   - `http://localhost:3000/showcase/spacing`
3. Show quick reference table of most-used tokens (from CLAUDE.md Color Tokens section)
4. Prompt examples:
   - "What colors are available in the design system?"
   - "Change the card background to warm-white"
   - "Use spacing tokens for a 4px grid layout"

## Topic: Examples

1. List the 3 reference pages with what each demonstrates:
   - **HomePage** (`/`) — Dashboard with stat cards, summary sections
   - **OrderListPage** (`/orders`) — Data table + filters + pagination + badges (BEST reference)
   - **OrderDetailPage** (`/orders/:id`) — Card grid, definition lists, status timeline
2. If dev server running → navigate to `/orders`, take screenshot, annotate what components are used
3. Read `src/pages/OrderListPage.vue` and highlight the pattern: data import → computed filtering → AkTable + AkInput + AkSelect
4. Prompt examples:
   - "Create a page like the order list but for products"
   - "Build a detail page similar to OrderDetail for a customer profile"

## Topic: Create

Step-by-step guide to creating a first page:

1. Explain the 4-step process (from CLAUDE.md "Creating a New Page"):
   - Create `.vue` file in `src/pages/`
   - Add route in `src/router.ts`
   - Add nav link in sidebar
   - (Optional) Create fixture data
2. Offer to create a demo page together: "Want me to create a simple demo page so you can see the full process?"
   - If yes → create a minimal page with 2-3 components, add route, show in browser via Playwright
   - If no → show the code template and explain each part
3. Prompt examples:
   - "Create a dashboard page with 4 stat cards and a chart placeholder"
   - "Create a settings page with a form for user preferences"
   - "Create a product catalog page with grid cards and filters"

## Topic: Responsive

1. Explain the 6-tier breakpoint system (xs through 2xl, mobile-first)
2. Show the utility class table from CLAUDE.md Responsive Utilities section
3. If dev server running → navigate to a page, use Playwright to resize viewport to mobile (375px) and desktop (1280px), screenshot both to show reflow
4. Prompt examples:
   - "Make this layout responsive — 1 column on mobile, 3 on desktop"
   - "Hide the sidebar stats on mobile screens"
   - "Add responsive typography to the page headings"

## Response Style

- **Brief and visual** — 2-3 sentences of explanation, then screenshots/tables, then prompt examples
- **Encouraging** — Designers may be non-technical. Use plain language.
- **Actionable** — Every topic ends with "Try asking me:" prompts
- **Adaptive** — If designer asks follow-up, go deeper into that subtopic without repeating the overview
