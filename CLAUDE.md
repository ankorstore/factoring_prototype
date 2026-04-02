# DS Prototype Template

Lightweight Vue 3 app for building static prototypes using the Ankorstore Design System.

## Stack
- Vue 3 + TypeScript + Vite 8 (Rolldown)
- @ankorstore/design-system v28 (component library)
- Vue Router (page navigation)
- CSS design tokens (`src/styles/design-tokens.css`)
- Static JSON fixtures (mock data)

## First-Time Setup
- Run `bash scripts/setup.sh` — verifies registry access, installs deps, starts dev server
- Requires JFrog token in `~/.npmrc` (see `docs/designer-getting-started.md`)
- If setup fails on registry access, guide user to configure their JFrog token (do NOT ask for the token)

## Commands
- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Type-check + build for static deployment
- `npm run preview` — Preview production build
- `npm run upgrade-ds` — Update @ankorstore/design-system to latest
- `npm run deploy` — Build and deploy to GitHub Pages (pushes `dist/` to `gh-pages` branch)
- `npm run sync-ds` — Regenerate design tokens from `../design-system/` repo

## File Conventions
- Pages: `src/pages/` — one .vue file per page
- Mock data: `src/data/` — JSON files + TypeScript interfaces in `types.ts`
- Layouts: `src/layouts/` — two layouts available (see "Layouts" section below)
- Components: `src/components/` — reusable page-level components
- Routes: `src/router.ts` — add new routes here when creating pages
- Styles: `src/styles/design-tokens.css` — CSS custom properties for spacing, typography, radius
- Directory rules: `src/components/CLAUDE.md`, `src/pages/CLAUDE.md`

## Creating a New Page

1. Create `src/pages/MyPage.vue`:
```vue
<template>
  <div style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-5);">
    <h2>My Page Title</h2>
    <!-- Your content using DS components -->
  </div>
</template>

<script setup lang="ts">
// Use Composition API with script setup
</script>
```

2. Add route in `src/router.ts` with layout choice:
```ts
{ path: '/my-page', component: () => import('@/pages/MyPage.vue'), meta: { title: 'My Page', layout: 'connected' } }
```

3. Add nav link in the sidebar matching your layout:
   - **Default layout** → `src/components/AppSidebar.vue` → `navItems` array
   - **Connected layout** → `src/components/ConnectedSidebar.vue` → `topItems` or `bottomItems`

4. (Optional) Create fixture data in `src/data/my-data.json` + add interface in `types.ts`

## Layouts

Two layouts available. Set via route `meta.layout`:

| Layout | `meta.layout` | Components | Use for |
|--------|---------------|------------|---------|
| **Default** | `'default'` (or omit) | `AppSidebar` + `AppTopbar` | Simple prototypes, non-connected pages |
| **Connected** | `'connected'` | `ConnectedSidebar` + `ConnectedTopbar` | Backoffice/authenticated pages |

**Default** (`src/layouts/AppLayout.vue`): Simple sidebar with logo + flat nav links. Topbar has breadcrumb + page title. Supports sidebar collapse.

**Connected** (`src/layouts/ConnectedLayout.vue`): Full backoffice layout matching the Ankorstore app. Sidebar has expandable sections, top/bottom split, badges. Topbar has logo, search bar, credit badge, PLUS badge, icons, cart, category tabs. Supports sidebar collapse.

### Switching layouts
Set `layout` in route meta:
```ts
// Uses Connected layout (backoffice)
{ path: '/', meta: { title: 'Home', layout: 'connected' } }

// Uses Default layout (simple)
{ path: '/showcase/colors', meta: { title: 'Colors' } }
```

### Customizing Connected layout nav
Edit `src/components/ConnectedSidebar.vue` → `topItems` and `bottomItems` arrays. Items support:
- `children` — expandable sub-navigation
- `badge` — notification badge text

## Design Token Showcase

Browse design tokens at these URLs (not in sidebar nav):
- `/showcase/colors` — all DS colors with click-to-copy
- `/showcase/typography` — font sizes with live preview
- `/showcase/spacing` — spacing scale + border radius

Run `npm run sync-ds` to regenerate tokens from `../design-system/` repo.

## Component Rules (CRITICAL)

- **ONLY** use components from `@ankorstore/design-system` (prefixed with `Ak*`)
- Do **NOT** install other UI libraries (no Vuetify, PrimeVue, etc.)
- Do **NOT** use raw HTML elements when a DS component exists:
  - Use `<AkButton>` not `<button>`
  - Use `<AkInput>` not `<input>`
  - Use `<AkAlert>` not custom alert divs
  - Use `<AkTable>` not `<table>`
- Use CSS custom properties from `design-tokens.css`: `var(--space-4)`, `var(--radius-md)`
- Layout utility classes available: `.flex`, `.flex-col`, `.gap-4`, `.items-center`, etc.
- In `<style scoped>`: use plain CSS with CSS custom properties
- Components are globally registered — no imports needed in templates

## Most-Used Components (Quick Reference)

| Component | Key Props | Event |
|-----------|-----------|-------|
| `<AkButton>` | `color="primary"` `size="md"` `outlined` `symbol="plus"` `loading` | `@click` |
| `<AkInput>` | `v-model` `label` `type` `placeholder` `iconLeft` | `@input` |
| `<AkSelect>` | `v-model` `:options="[{label,value}]"` `placeholder` | `@change` |
| `<AkTable>` | `:columns` `:data` `:border` `:rowStyles="['hover']"` | `@rowClick` |
| `<AkBadge>` | `content` `color="green"` `size="sm"` `symbol` | — |

AkTable columns: `{ name: string, label: string, width?: string, align?: 'left'|'center'|'right' }`
AkTable custom cells: `#item.[columnName]="{ item }"` — Custom headers: `#column.[columnName]`

**Full API for all 18+ components:** See `src/llms-component-catalog.md`

## Common Recipes

### Data Table with Filters
See `src/pages/OrderListPage.vue` — combines AkTable + AkInput + AkSelect + AkPagination + AkBadge

### Card Layout with Data Display
See `src/pages/OrderDetailPage.vue` — card grid with definition lists

### Form Layout
```vue
<div style="display: flex; flex-direction: column; gap: var(--space-4); max-width: 500px;">
  <AkInput v-model="name" label="Name" placeholder="Enter name..." required />
  <AkInput v-model="email" label="Email" type="email" placeholder="you@example.com" />
  <AkSelect v-model="role" :options="roleOptions" label="Role" />
  <AkButton color="primary" @click="submit">Save</AkButton>
</div>
```

### Confirmation Modal
```vue
<AkButton @click="$refs.confirmModal.openModal()">Delete</AkButton>
<AkModal ref="confirmModal" size="sm" titleContent="Confirm Delete" validateButtonText="Delete" validateButtonColor="error" cancelButtonText="Cancel" @validated="onDelete">
  <p>This action cannot be undone.</p>
</AkModal>
```

### Status Badge Mapping
```ts
const statusColors: Record<string, string> = {
  pending: 'orange', confirmed: 'blue', shipped: 'purple', delivered: 'green', cancelled: 'red'
}
```
```vue
<AkBadge :content="status" :color="statusColors[status]" size="sm" />
```

### Empty State
```vue
<AkAlert type="info" title="No results">Try adjusting your filters.</AkAlert>
```

## Working with Data
- Import JSON: `import orders from '@/data/orders.json'`
- TypeScript types: `import type { Order } from '@/data/types'`
- Create new fixture: add `.json` in `src/data/`, add interface in `types.ts`
- Use `computed()` for filtering: `const filtered = computed(() => data.filter(...))`
- Do **NOT** fetch from APIs — all data is static JSON

## Styling Guide
- Design tokens in `src/styles/design-tokens.css` — use `var(--space-4)`, `var(--radius-md)`, etc.
- Colors: use CSS custom properties from DS — `var(--primary)`, `var(--white)`, `var(--neutral-100)`, `var(--neutral-700)`, `var(--neutral-900)`, `var(--error)`, `var(--warning)`, `var(--success)`, `var(--info-700)`. Gap-filler in `design-tokens.css`: `var(--color-border-light)`. Full list in `design-tokens.css` comments. Do **NOT** hardcode hex color values. Always use `var(--token-name)`.
- Layout utility classes available: `.flex`, `.flex-col`, `.gap-4`, `.items-center`, etc.
- In `<style scoped>`: use plain CSS with CSS custom properties
- Font: Poppins (loaded via Google Fonts, weights **400**, **600**, **700**)
- Font weights: use `font-weight: 400` (normal), `font-weight: 600` (semibold, DS components), or `font-weight: 700` (bold, headings/emphasis matching Ankorstore app). Do **NOT** use 500 (medium) — not loaded, will render as 400.
- Responsive: see "Responsive Utilities" section below
- Prefer DS component props over custom CSS

### Color Tokens (Quick Reference)

| Token | Value | Use for |
|-------|-------|---------|
| `var(--primary)` | rgba(20,6,10,1) | Brand color, text, active states |
| `var(--white)` | rgba(255,255,255,1) | White surfaces, card backgrounds |
| `var(--neutral-100)` | rgb(249,249,249,1) | Page backgrounds, hover states |
| `var(--neutral-500)` | rgba(200,196,191,1) | Disabled, icons |
| `var(--neutral-700)` | rgba(119,114,114,1) | Muted/secondary text |
| `var(--neutral-900)` | rgba(89,84,84,1) | Headings, section titles |
| `var(--error)` | rgba(212,22,70,1) | Error states, destructive actions |
| `var(--warning)` | rgba(255,100,0,1) | Warning states |
| `var(--success)` | rgba(85,117,112,1) | Success states |
| `var(--info-700)` | rgba(11,0,244,1) | Info emphasis |
| `var(--color-border-light)` | #F0F0F0 | Borders, dividers (gap-filler) |

### Shadow Tokens

| Token | Value | Use for |
|-------|-------|---------|
| `var(--shadow-xs)` | 0 1px 2px | Subtle cards, inputs |
| `var(--shadow-sm)` | 0 1px 3px | Cards, dropdowns |
| `var(--shadow-md)` | 0 4px 6px | Elevated cards, popovers |
| `var(--shadow-lg)` | 0 10px 15px | Modals, drawers |
| `var(--shadow-xl)` | 0 20px 25px | Full-screen overlays |

Do **NOT** hardcode `box-shadow` values. Always use `var(--shadow-*)`.

### Z-Index Tokens

| Token | Value | Use for |
|-------|-------|---------|
| `var(--z-dropdown)` | 50 | Dropdowns, popovers |
| `var(--z-sticky)` | 100 | Sticky headers, sidebars |
| `var(--z-modal-backdrop)` | 200 | Modal overlay |
| `var(--z-modal)` | 201 | Modal content |

Do **NOT** hardcode `z-index` values. Always use `var(--z-*)`.

## Responsive Utilities

Breakpoints (DS-aligned, mobile-first `min-width`):

| Name | Value | Media Query |
|------|-------|-------------|
| xs | 480px | `@media (min-width: 480px)` |
| sm | 640px | `@media (min-width: 640px)` |
| md | 768px | `@media (min-width: 768px)` |
| lg | 1024px | `@media (min-width: 1024px)` |
| xl | 1280px | `@media (min-width: 1280px)` |
| 2xl | 1600px | `@media (min-width: 1600px)` |

Utility classes in `src/styles/responsive-utils.css`:

| Class Pattern | Example | Effect |
|---------------|---------|--------|
| `.hide-below-{bp}` | `.hide-below-md` | Hidden below 768px, visible at 768px+ |
| `.show-below-{bp}` | `.show-below-md` | Visible below 768px, hidden at 768px+ |
| `.cols-1-{bp}-{n}` | `.cols-1-lg-3` | 1 column → 3 columns at 1024px+ |
| `.stack-below-{bp}` | `.stack-below-md` | Vertical below 768px, horizontal at 768px+ |
| `.text-responsive-h{n}` | `.text-responsive-h1` | Smaller heading on mobile, larger on desktop |

**Prefer utility classes** for common patterns (layout reflow, visibility, typography). For custom responsive logic in `<style scoped>`, use `@media (min-width: ...)` queries with the breakpoint values above. Do **NOT** use `max-width` queries or hardcode other pixel values.

## AI Agent Support
- **Vite 8 console forwarding**: `server.forwardConsole` is enabled — browser `console.log`, `console.warn`, `console.error`, and unhandled errors are forwarded to the terminal during `npm run dev`. AI agents can see runtime Vue warnings and JS exceptions without browser access.
- **Playwright MCP**: Configured in `.mcp.json` (project-scoped, shared via git). Enables AI agents to take screenshots, click through pages, test responsive layouts, and verify component rendering. Start dev server first (`npm run dev`), then use Playwright tools to interact with `http://localhost:3000`.

## Gotchas
- **SPA routing on GitHub Pages**: Vue Router uses `createWebHistory` — GitHub Pages doesn't handle client-side routing natively. Deep links (e.g., `/orders/123`) will 404 without a custom `404.html` redirect. Dev server handles this fine.
- **Deploy**: Run `npm run deploy` to build and push to `gh-pages` branch. Set GitHub Pages source to "Deploy from branch" → `gh-pages` / `/ (root)` in repo settings.
- **AkModal ref pattern**: Open modals via `this.$refs.modal.openModal()` (Options API) or template ref + `.value.openModal()` (Composition API)
- **DS component events**: AkButton uses `@click`, AkSelect uses `@change`, AkTable uses `@rowClick`

## Entry Points
`index.html` → `src/main.ts` → `App.vue` → `AppLayout.vue` (sidebar + topbar) → `<router-view />`

## Full Component Catalog
See `src/llms-component-catalog.md` for complete component documentation with all props, slots, and events.
