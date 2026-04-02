# Pages — DS Prototype Template

## Creating a New Page

1. Create `src/pages/MyPage.vue` with `<script setup lang="ts">`
2. Add route in `src/router.ts`: `{ path: '/my-page', component: () => import('@/pages/MyPage.vue'), meta: { title: 'My Page' } }`
3. Add nav link in `src/components/AppSidebar.vue` → `navItems` array

## Page Structure

```vue
<template>
  <div style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-5);">
    <h2>Page Title</h2>
    <!-- Content using DS components -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import orders from '@/data/orders.json'
import type { Order } from '@/data/types'

const filtered = computed(() => orders.filter(o => o.status === 'active'))
</script>
```

## Rules

- One `.vue` file per page
- Import static JSON from `src/data/` — no API fetching
- Add TypeScript interfaces in `src/data/types.ts` for new data shapes
- Use `computed()` for filtering/sorting, `ref()` for local state
- DS components are globally registered — no imports needed in templates
- Use CSS custom properties for spacing: `var(--space-4)`, `var(--radius-md)`
- Colors: use CSS custom properties — `var(--primary)`, `var(--neutral-100)`, `var(--white)`, etc. Do NOT hardcode hex. See `src/styles/design-tokens.css` for full reference.

## Reference Pages

- `OrderListPage.vue` — table + filters + pagination + badges
- `OrderDetailPage.vue` — card grid layout with definition lists
- `HomePage.vue` — dashboard with stats and summary cards
