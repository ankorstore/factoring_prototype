# Code Standards & Conventions

## Overview
This document defines coding standards, file naming conventions, and architectural patterns for DS Prototype Template to ensure consistency, maintainability, and developer productivity.

## General Principles
- **YAGNI** — You Aren't Gonna Need It (no premature optimization)
- **KISS** — Keep It Simple, Stupid (prefer clarity over cleverness)
- **DRY** — Don't Repeat Yourself (extract shared logic into utilities)
- **Convention over Configuration** — Use predictable file structure
- **Type Safety First** — Strict TypeScript mode; minimize `any` usage

## File Naming Conventions

### Vue Components
- **Format:** kebab-case with `.vue` extension
- **Example:** `OrderFilterBar.vue`, `AppSidebar.vue`, `OrderDetailPage.vue`
- **Rule:** Component names should describe their purpose (not generic "Card" or "Item")

### TypeScript/JavaScript Files
- **Format:** kebab-case with `.ts` or `.js` extension
- **Example:** `router.ts`, `order-utils.ts`, `filter-helpers.ts`
- **Rule:** Descriptive names that indicate file purpose

### JSON Fixture Files
- **Format:** kebab-case with `.json` extension
- **Example:** `orders.json`, `order-statuses.json`, `product-categories.json`
- **Rule:** Plural names for collections

### Style Files
- **Format:** kebab-case with `.css` extension
- **Example:** `design-tokens.css`, `layout-utilities.css`

### Directory Structure
- **Format:** kebab-case, lowercase
- **Example:** `src/pages/`, `src/components/`, `src/layouts/`, `src/data/`

## TypeScript Standards

### Type Safety
```typescript
// ✅ GOOD: Explicit types
interface Order {
  id: string
  reference: string
  status: OrderStatus
}

// ❌ BAD: Implicit any
function processOrder(order: any) {
  return order.id
}

// ✅ GOOD: Type assertion when necessary
const order = data as Order
```

### Import Organization
```typescript
// 1. Vue imports
import { defineComponent, computed, ref } from 'vue'

// 2. Third-party libraries
import { createRouter } from 'vue-router'

// 3. Local modules/components
import type { Order } from '@/data/types'
import OrderList from '@/components/OrderList.vue'

// 4. Styles (at end)
import '@/styles/design-tokens.css'
```

### Naming Conventions
```typescript
// Constants: UPPER_SNAKE_CASE
const MAX_ITEMS_PER_PAGE = 20
const DEFAULT_CURRENCY = 'EUR'

// Functions & variables: camelCase
function formatOrderDate(date: string): string {
  return new Date(date).toLocaleDateString()
}

const orders = ref<Order[]>([])
const filteredOrders = computed(() => orders.value.filter(...))

// Types & Interfaces: PascalCase
interface Order {
  id: string
}

type OrderStatus = 'pending' | 'shipped' | 'delivered'

// Enums: PascalCase values
enum OrderStatusEnum {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}
```

## Vue 3 Standards

### Script Setup Syntax
```vue
<script setup lang="ts">
// Preferred: script setup with TypeScript
import { computed, ref } from 'vue'
import type { Order } from '@/data/types'

const orders = ref<Order[]>([])
const sortedOrders = computed(() => {
  return orders.value.sort((a, b) => a.reference.localeCompare(b.reference))
})
</script>
```

### Component Structure Order
```vue
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// Script setup (always TypeScript)
</script>

<style scoped>
/* Scoped styles using CSS custom properties */
</style>
```

### Props & Emits
```typescript
// ✅ GOOD: Explicit prop types
interface Props {
  orders: Order[]
  sortBy?: 'date' | 'reference'
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  sortBy: 'date',
  isLoading: false,
})

// ✅ GOOD: Emit with type safety
const emit = defineEmits<{
  select: [order: Order]
  delete: [id: string]
}>()
```

### Reactive State
```typescript
// ✅ GOOD: ref for primitive values
const searchQuery = ref('')
const currentPage = ref(1)

// ✅ GOOD: ref + shallowRef for complex objects
const orders = ref<Order[]>([])

// ✅ GOOD: computed for derived state
const filteredOrders = computed(() => {
  return orders.value.filter(order =>
    order.reference.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// ❌ BAD: Mutating ref directly outside handlers
// orders.value.push(...) // Don't do this outside lifecycle

// ✅ GOOD: Methods for mutations
function addOrder(order: Order) {
  orders.value.push(order)
}
```

## Styling Standards

### CSS Custom Properties
```css
/* ✅ GOOD: Use design tokens from design-tokens.css */
.card {
  padding: var(--space-4);
  margin-bottom: var(--space-5);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--text-sm);
}

/* ❌ BAD: Hardcoded pixel values */
.card {
  padding: 16px;
  margin: 24px 0;
  border-radius: 8px;
}
```

### Scoped Styles Only
```vue
<style scoped>
/* ✅ GOOD: All styles are scoped to component */
.order-header {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

/* Use BEM naming for clarity */
.order-item__status {
  font-weight: 600;
}

.order-item__status--pending {
  color: var(--warning);
}
</style>
```

### Responsive Design

Prefer utility classes from `src/styles/responsive-utils.css` over custom media queries:

```html
<!-- Use utility classes for common patterns -->
<div class="cols-1-md-2">1 col → 2 cols at 768px</div>
<div class="cols-1-lg-3">1 col → 3 cols at 1024px</div>
<div class="hide-below-md">Hidden on mobile</div>
<div class="stack-below-md">Vertical on mobile, horizontal at 768px</div>
<h1 class="text-responsive-h1">Responsive heading</h1>
```

For custom logic, use mobile-first `@media (min-width: ...)` with DS breakpoints (xs:480, sm:640, md:768, lg:1024, xl:1280, 2xl:1600). Do **NOT** use `max-width`.

```vue
<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .container { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1024px) {
  .container { grid-template-columns: 1fr 1fr 1fr; }
}
</style>
```

### Layout Utilities
```vue
<!-- ✅ GOOD: Inline styles with CSS variables for layout -->
<div style="display: flex; flex-direction: column; gap: var(--space-4);">
  <h2>Orders</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-4);">
    <!-- cards -->
  </div>
</div>
```

## Component Library Standards

### CRITICAL: Ankorstore Design System Only
```vue
<!-- ✅ GOOD: Use Ak* components from @ankorstore/design-system -->
<template>
  <AkButton color="primary" size="md" @click="handleSave">Save</AkButton>
  <AkInput v-model="searchQuery" placeholder="Search..." />
  <AkTable :columns="columns" :data="orders" @rowClick="selectOrder" />
  <AkModal ref="confirmModal" @validated="onDelete">Confirm delete?</AkModal>
</template>

<!-- ❌ BAD: Raw HTML elements -->
<button @click="save">Save</button>
<input v-model="search" placeholder="Search..." />
<table><!-- ... --></table>

<!-- ❌ BAD: Other UI libraries (Vuetify, PrimeVue, Element) -->
<v-btn>Button</v-btn>
<p-button>Button</p-button>
```

### Component Props
- Use component props instead of custom CSS
- Refer to CLAUDE.md for component API reference
- Always check design-system documentation for prop names

## Data Management Standards

### Static Data Only
```typescript
// ✅ GOOD: Import from JSON fixtures
import orders from '@/data/orders.json'
import type { Order } from '@/data/types'

const orderList = ref<Order[]>(orders)

// ❌ BAD: API calls (static prototype only)
const response = await fetch('/api/orders')

// ❌ BAD: State management libraries (Pinia, Vuex)
// Use only ref/computed for state
```

### Type-Safe Fixtures
```typescript
// src/data/types.ts
export interface Order {
  id: string
  reference: string
  brandName: string
  retailerName: string
  status: string
  total: number
  currency: string
  itemCount: number
  createdAt: string
}

// In component
import type { Order } from '@/data/types'
const orders = ref<Order[]>([])
```

### Filtering & Sorting
```typescript
// ✅ GOOD: Use computed for immutable filtering
const filteredOrders = computed(() => {
  return orders.value.filter(order =>
    order.reference.toLowerCase().includes(searchQuery.value)
  )
})

// ✅ GOOD: Multi-step filtering
const activeOrders = computed(() => {
  return filteredOrders.value
    .filter(order => order.status === activeStatus.value)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})
```

## File Size & Structure

### Size Limits
- Vue components: max 200 lines
- TypeScript utilities: max 150 lines
- Larger files should be split into focused modules

### Large Component Refactoring
```
❌ BAD: OrderListPage.vue (400 lines)

✅ GOOD:
  - OrderListPage.vue (main page, 100 lines)
  - components/OrderTable.vue (table, 80 lines)
  - components/OrderFilterBar.vue (filters, 60 lines)
  - utils/order-filters.ts (filter logic, 40 lines)
```

## Error Handling

### Vue Components
```typescript
// ✅ GOOD: Try-catch with user feedback
const loadOrders = async () => {
  try {
    // Since this is static, errors are unlikely, but pattern is good
    const data = JSON.parse(ordersJson)
    orders.value = data
  } catch (error) {
    console.error('Failed to load orders:', error)
    errorMessage.value = 'Failed to load orders. Please try again.'
  }
}
```

### Null Safety
```typescript
// ✅ GOOD: Explicit null checks
const order = orders.value.find(o => o.id === selectedId.value)
if (!order) {
  console.warn('Order not found:', selectedId.value)
  return
}

// Use optional chaining for safe property access
const orderTotal = order?.total ?? 0
```

## Code Quality

### Comments & Documentation
```typescript
// ✅ GOOD: Explain WHY, not WHAT
// Filter orders by status to show only active orders in summary view
const activeOrders = computed(() => {
  return orders.value.filter(o => o.status === 'shipped' || o.status === 'delivered')
})

// ❌ BAD: Obvious comments
// Get the orders
const orders = ref<Order[]>([])

// ✅ GOOD: JSDoc for complex functions
/**
 * Formats a date string to locale-specific format.
 * @param dateString - ISO date string (e.g., '2026-03-27T10:00:00Z')
 * @returns Formatted date (e.g., '3/27/2026')
 */
function formatOrderDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}
```

### Linting & Formatting
- Use Prettier for consistent formatting (configured in `.prettierrc`)
- Run before commit: `npm run build` (includes type checking)
- Keep code style pragmatic; don't sacrifice readability for strict linting

## Testing Approach
- Pages render correctly with fixture data
- Computed properties filter/sort as expected
- Component props are properly typed
- Routes navigate and load pages
- No unit tests required for static prototype (keep it simple)

## Common Patterns

### Page Component Template
```vue
<template>
  <div style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-5);">
    <h1>Page Title</h1>

    <!-- Content area -->
    <div style="display: grid; grid-template-columns: 1fr; gap: var(--space-4);">
      <!-- Your content with Ak* components -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Order } from '@/data/types'
import orders from '@/data/orders.json'

const orderList = ref<Order[]>(orders)
const filteredOrders = computed(() => orderList.value)
</script>

<style scoped>
/* Scoped styles using CSS custom properties */
</style>
```

### Layout Component Pattern
```vue
<template>
  <div style="display: flex; height: 100vh;">
    <AppSidebar />
    <div style="flex: 1; display: flex; flex-direction: column;">
      <AppTopbar />
      <main style="flex: 1; overflow-y: auto;">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
</script>
```

## Accessibility Standards
- All interactive elements must use Ak* components (buttons, links, modals)
- Design System components are WCAG 2.1 AA compliant by default
- Ensure proper color contrast via DS color system
- Use semantic HTML via component library

## Performance Considerations
- Computed properties are lazy-evaluated; use them for derived state
- Keep components small to aid caching
- Don't fetch external data (static only)
- CSS is scoped; no style leakage between components

## Documentation Requirements
- Every page component should have clear title
- Complex filter logic should be documented
- CLAUDE.md provides component API reference
- README.md covers quick start and troubleshooting

---

**Last Updated:** 2026-03-27
**Version:** 1.0
