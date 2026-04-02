# Layout Guide

## Two Layouts Available

### Default Layout
- **Components:** AppSidebar + AppTopbar
- **Look:** Simple sidebar with logo + flat nav links. Topbar has breadcrumb + page title.
- **Use for:** Showcase pages, simple prototypes, non-authenticated pages
- **Route config:** `meta: { layout: 'default' }` (or omit — it's the default)

### Connected Layout
- **Components:** ConnectedSidebar + ConnectedTopbar
- **Look:** Full backoffice matching the Ankorstore app. Sidebar has expandable sections, badges. Topbar has search bar, credit badge, PLUS badge, icons, cart, category tabs.
- **Use for:** Backoffice pages, authenticated user flows, admin dashboards
- **Route config:** `meta: { layout: 'connected' }`

## Decision Tree

**"Which layout should I use?"**

- Prototyping a **backoffice/admin feature**? → Connected
- Prototyping a **public-facing page** or **landing**? → Default
- Prototyping **within the existing Ankorstore app**? → Connected
- Just **showcasing components**? → Default
- **Not sure?** → Connected (matches what real users see)

## How to Switch

In `src/router.ts`, set the `layout` meta field:

```ts
// Connected layout (backoffice)
{ path: '/dashboard', component: () => import('@/pages/Dashboard.vue'), meta: { title: 'Dashboard', layout: 'connected' } }

// Default layout (simple)
{ path: '/showcase', component: () => import('@/pages/Showcase.vue'), meta: { title: 'Showcase' } }
```

## Customizing Navigation

- **Default layout** → edit `src/components/AppSidebar.vue` → `navItems` array
- **Connected layout** → edit `src/components/ConnectedSidebar.vue` → `topItems` and `bottomItems` arrays
  - Items support `children` (expandable sub-nav) and `badge` (notification count)
