# System Architecture

## Architecture Overview

DS Prototype Template is a **static, client-side Vue 3 SPA** with no backend infrastructure. Data flows from JSON fixtures through Vue's reactive system to the Ankorstore Design System components.

```
┌─────────────────────────────────────────────────────────────────┐
│                        DS Prototype Template                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Vue 3 Application                       │   │
│  │  (Reactive state management, routing, component logic)    │   │
│  └─────────────────────────┬────────────────────────────────┘   │
│                            │                                     │
│    ┌───────────────────────┼───────────────────────┐             │
│    │                       │                       │             │
│    ▼                       ▼                       ▼             │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐         │
│  │  Router  │         │  Pages   │         │Components│         │
│  │          │         │          │         │          │         │
│  │ 3 routes │         │ Home     │         │Sidebar   │         │
│  │ + Layout │         │ Orders   │         │Topbar    │         │
│  │          │         │ Detail   │         │Filters   │         │
│  └──────────┘         └──────────┘         └──────────┘         │
│    │                       │                       │             │
│    └───────────────────────┼───────────────────────┘             │
│                            │                                     │
│                    ┌───────▼──────────┐                         │
│                    │  Design Tokens   │                         │
│                    │  CSS Vars        │                         │
│                    │  (spacing, type, │                         │
│                    │   colors, etc.)  │                         │
│                    └──────────────────┘                         │
│                                                                   │
│                    ┌──────────────────────┐                     │
│                    │ @ankorstore/design-  │                     │
│                    │ system v28           │                     │
│                    │ (Ak* Components)     │                     │
│                    └──────────────────────┘                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Static Data Layer                      │   │
│  │  JSON Fixtures (orders.json, order-statuses.json, etc.)  │   │
│  │  TypeScript Interfaces (src/data/types.ts)               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
         │
         │ Build & Deployment
         ▼
┌──────────────────────────┐
│   GitHub Pages (CDN)     │
│   Static HTML + JS + CSS │
└──────────────────────────┘
```

## Component Hierarchy

```
App (Root Component)
│
└── AppLayout
    │
    ├── AppSidebar
    │   └── Navigation items (links)
    │
    ├── AppTopbar
    │   └── Branding + Logo
    │
    └── router-view (Page Content)
        │
        ├── HomePage
        │   └── Overview, static content
        │
        ├── OrderListPage
        │   ├── OrderFilterBar (filters, search)
        │   ├── AkTable (orders list)
        │   └── AkPagination (page control)
        │
        └── OrderDetailPage
            └── Order details + item breakdown
```

## Routing Architecture

### Route Configuration (src/router.ts)
```
Route 1: /
  Path: HomePage.vue
  Title: "Home"
  Icon: "home"

Route 2: /orders
  Path: OrderListPage.vue
  Title: "Orders"
  Icon: "orders"

Route 3: /orders/:id
  Path: OrderDetailPage.vue
  Title: "Order Detail"
  Icon: "orders"
  Params: id (order ID from URL)
```

### Navigation Flow
```
AppSidebar Navigation
    │
    ├── Home (/): HomePage.vue
    ├── Orders (/orders): OrderListPage.vue
    │   └── [Click row] → /orders/:id (OrderDetailPage.vue)
    │   └── [Back] → /orders (OrderListPage.vue)
    │
    └── (Future routes added here)
```

## Data Flow Architecture

### Static Data Initialization
```
1. App Starts (main.ts)
   ├── Load design-system.css (Ak* components)
   ├── Load design-tokens.css (CSS variables)
   └── Mount Vue app to #app

2. Router Initializes
   └── Load initial page component

3. Page Component Loads
   ├── Import JSON fixture (e.g., orders.json)
   ├── Type-check against interface (Order[])
   └── Assign to ref<Order[]>

4. Reactive State
   ├── ref = raw fixture data
   ├── computed = filtered/sorted views
   └── Template renders via Ak* components

5. User Interaction
   ├── Updates local ref/computed
   ├── Triggers re-render
   ├── No API calls (static only)
```

### Example: OrderListPage Data Flow
```
orders.json (fixture)
    │
    ▼
ref<Order[]>
    │
    ├─► searchQuery.ref
    │   │
    │   ▼
    │ computed filteredOrders
    │   │
    │   ▼
    │ AkTable (renders rows)
    │
    └─► statusFilter.ref
        │
        ▼
      computed activeOrders
        │
        ▼
      AkPagination (page control)
```

## State Management

**Design Decision:** No state management library (Pinia, Vuex) required.

### State Strategy
- **Local Component State:** `ref<T>()` for mutable values
- **Derived State:** `computed()` for filters, sorting, aggregations
- **Fixture Data:** Imported from JSON, assigned to refs
- **Across Components:** Props + Emits for parent-child communication

### Example Pattern
```typescript
// src/pages/OrderListPage.vue
const orders = ref<Order[]>(orders_json)  // Fixture → ref
const searchQuery = ref('')                // User input
const currentPage = ref(1)                 // Pagination

const filteredOrders = computed(() => {
  return orders.value.filter(order =>
    order.reference.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredOrders.value.slice(start, end)
})
```

## Component Architecture

### Layout Components (src/layouts/)

#### AppLayout.vue
- **Purpose:** Wrapper for all pages (sidebar + topbar + router-view)
- **Owns:** Overall page structure, layout grid
- **Children:** AppSidebar, AppTopbar, router-view
- **Not Owns:** Page content (delegated to routes)

### Page Components (src/pages/)

#### HomePage.vue
- **Purpose:** Landing/overview page
- **Data:** Static content (no fixture data)
- **Contains:** Welcome message, links to main sections

#### OrderListPage.vue
- **Purpose:** Table view of all orders
- **Data:** orders.json (Order[])
- **Contains:** OrderFilterBar, AkTable, AkPagination
- **Interactions:** Filter, sort, paginate, drill-down to detail

#### OrderDetailPage.vue
- **Purpose:** Single order detail view
- **Data:** orders.json (filtered by route param :id)
- **Contains:** Order info cards, item breakdown
- **Interactions:** Back button to list

### Reusable Components (src/components/)

#### AppSidebar.vue
- **Purpose:** Left navigation sidebar
- **Owns:** Navigation items, active route highlighting
- **Data:** Static nav items array
- **Interactions:** Router navigation via AkLink

#### AppTopbar.vue
- **Purpose:** Top header bar
- **Owns:** Branding, logo, title
- **Data:** Static (no dynamic content)
- **Props:** None required

#### OrderFilterBar.vue
- **Purpose:** Filters & search for order list
- **Emits:** Filter change events
- **Props:** Current filter state
- **Contains:** AkInput (search), AkSelect (status), AkButton (reset)

## Design System Integration

### Component Library: @ankorstore/design-system v28

**Global Registration:** All Ak* components are auto-registered in main.ts:
```typescript
app.use(ComponentLibrary)  // Registers all Ak* components globally
```

**No Imports Needed:** Use `<AkButton>`, `<AkInput>`, etc. directly in templates.

### Common Components Used
| Component | Used In | Purpose |
|-----------|---------|---------|
| AkButton | All | User actions |
| AkInput | Filters, Forms | Text input, search |
| AkSelect | Filters | Dropdown selection |
| AkTable | OrderListPage | Data table display |
| AkBadge | OrderListPage | Status indicators |
| AkPagination | OrderListPage | Page control |
| AkLink | Sidebar | Navigation |
| AkIcon | All | Icons in buttons, sidebar |
| AkModal | Future | Confirmation dialogs |

### CSS Custom Properties System

**Design Tokens (src/styles/design-tokens.css)** provides CSS variables:

| Category | Examples | Usage |
|----------|----------|-------|
| **Spacing** | `--space-0`, `--space-4`, `--space-8` | Padding, margin, gaps |
| **Typography** | `--text-sm`, `--text-lg`, `--leading-base` | Font size, line height |
| **Radius** | `--radius-xs`, `--radius-md`, `--radius-lg` | Border radius |
| **Font** | `--font-family` | Font stack (Poppins) |

**Usage in Styles:**
```vue
<style scoped>
.card {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
}
</style>
```

**Usage in Inline Styles:**
```vue
<div style="padding: var(--space-4); gap: var(--space-3); display: flex;">
```

## Data Model

### Order Entity
```typescript
interface Order {
  id: string                    // Unique identifier
  reference: string             // Order reference number
  brandName: string             // Brand name
  retailerName: string          // Retailer name
  status: string                // Status (pending, confirmed, shipped, delivered)
  total: number                 // Order total (numeric)
  currency: string              // Currency code (EUR, USD, etc.)
  itemCount: number             // Number of items
  createdAt: string             // ISO date string
}
```

### OrderStatus Enum
```typescript
interface OrderStatus {
  value: string                 // Status value (used in Order.status)
  label: string                 // Display label
  color: string                 // Badge color (from DS palette)
}
```

### Data Sources
- **orders.json:** Array of Order objects (fixture)
- **order-statuses.json:** Array of OrderStatus objects (fixture)
- **types.ts:** TypeScript interfaces for all data models

## Build & Deployment Architecture

### Build Pipeline
```
Source Code (src/)
    │
    ├─► Vue 3 Template Compilation
    │   (converts .vue files to render functions)
    │
    ├─► TypeScript Compilation
    │   (vue-tsc --noEmit for type checking)
    │   (esbuild for JS minification)
    │
    ├─► CSS Processing
    │   (design-tokens.css + design-system.css bundled)
    │   (scoped styles isolated per component)
    │
    ├─► Asset Bundling
    │   (Vite creates optimal chunks)
    │
    └─► Output: dist/
        ├── index.html (with bundled JS + CSS inlined)
        ├── assets/
        │   ├── index-XXXX.js (main app bundle)
        │   ├── style-XXXX.css (combined styles)
        │   └── ...
        └── (static assets from public/)
```

### Deployment to GitHub Pages

**Trigger:** Manual via `npm run deploy` command

**Deployment Process:**
```
1. npm run deploy (runs locally)
   - Type check: vue-tsc --noEmit
   - Build: vite build (output → dist/)
   - Deploy: gh-pages -d dist (push to gh-pages branch)
2. GitHub Pages serves from gh-pages branch
3. Site updates in 1-2 minutes
```

**Build Output Features:**
- Relative paths (GITHUB_PAGES=true in vite.config.ts)
- CSS/JS minified and gzipped
- Hash-based cache busting (assets/index-XXXX.js)
- Single HTML entry point (index.html)
- Pushed to gh-pages branch via gh-pages npm package

## Error Handling & Resilience

### TypeScript Type Safety
- Strict mode enabled (tsconfig.json)
- All fixtures typed against interfaces
- No `any` types in application code

### Runtime Safety
- JSON fixture imports automatically validated by TypeScript
- Router guards ensure valid route params
- Component props are typed; invalid props raise TypeScript errors

### Browser Compatibility
- Modern browser APIs only (ES2020+)
- Vite automatically transpiles for target browsers
- No IE11 support required

## Performance Characteristics

### Build Performance
- Vite dev server: < 2 seconds hot reload
- Production build: < 10 seconds
- Bundle size: ~150KB gzipped (Vue 3 + DS + app code)

### Runtime Performance
- Initial page load: ~500ms (with network)
- Page transitions: Instant (client-side routing)
- Filter/sort operations: < 100ms (computed properties)
- No API latency (static data only)

### Caching Strategy
- GitHub Pages CDN caches dist/ files
- Hash-based asset names prevent stale cache
- index.html never cached (always fresh)

## Security Considerations

### No Backend Vulnerability
- No authentication required (public prototype)
- No database access
- No API secrets or credentials
- Static HTML/CSS/JS only

### XSS Prevention
- Vue 3 auto-escapes template content
- Design System components sanitize HTML
- No user-generated content (fixtures only)

### Content Security
- CORS not needed (no external API calls)
- Integrity hashes not required (self-hosted)
- No third-party scripts (except Google Fonts)

## Scalability Considerations

### Adding New Pages
1. Create new .vue file in src/pages/
2. Add route to router.ts
3. Add nav item to AppSidebar
4. Reuse existing layout (no new wrapper needed)
5. Build time remains < 10 seconds

### Adding New Data
1. Create new .json file in src/data/
2. Add TypeScript interface to types.ts
3. Import and ref in page component
4. Build time unaffected (static data)

### Component Reusability
- AppLayout used by all pages (no duplication)
- OrderFilterBar reusable across list views
- Design tokens centralized (consistency)
- Ak* components used everywhere (predictable)

---

**Last Updated:** 2026-03-27
**Architecture Pattern:** Client-Side Vue 3 SPA with Static Data
**Deployment Model:** GitHub Pages (CDN-served static assets)
