# Design Guidelines

## Overview

DS Prototype Template uses the Ankorstore Design System (v28) as its exclusive component library. This guide covers component usage, design tokens, styling patterns, and responsive design.

## Design System Components

### CRITICAL: Ankorstore DS Components Only

All interactive UI elements must use `Ak*` prefixed components from `@ankorstore/design-system`. Components are globally registered; no imports needed.

### Component Categories

#### Form Components
- **AkInput** — Text input field
- **AkSelect** — Dropdown selection
- **AkCheckbox** — Checkbox toggle
- **AkRadio** — Radio button group
- **AkToggle** — Boolean toggle switch

#### Action Components
- **AkButton** — Primary action button
- **AkLink** — Navigation link (looks like text)
- **AkIcon** — Icon display (from DS icon library)

#### Data Display
- **AkTable** — Tabular data with columns
- **AkBadge** — Status/tag indicator
- **AkPill** — Rounded tag label
- **AkBreadcrumb** — Navigation breadcrumb trail

#### Feedback Components
- **AkAlert** — Informational message
- **AkBanner** — Page-level announcement
- **AkModal** — Dialog modal
- **AkPagination** — Page control

#### Layout Components
- **AkSkeleton** — Loading placeholder

#### Branding
- **AkLogoAKS** — Full logo
- **AkLogoAKSSymbol** — Icon/symbol only

## Component Usage Examples

### AkButton

```vue
<!-- Primary action -->
<AkButton color="primary" size="md" @click="handleSave">Save</AkButton>

<!-- Secondary action -->
<AkButton outlined color="primary" size="md">Cancel</AkButton>

<!-- Success action -->
<AkButton color="success" size="lg">Confirm</AkButton>

<!-- Error action -->
<AkButton color="error" size="lg">Delete</AkButton>

<!-- Icon only -->
<AkButton onlyIcon symbol="edit" size="md" color="white" />

<!-- Loading state -->
<AkButton loading color="primary">Processing...</AkButton>

<!-- Disabled -->
<AkButton disabled color="primary">Disabled</AkButton>
```

**Available Props:**
- `color` — `primary` | `error` | `white` | `success` | `success-alt` | `orderpay`
- `size` — `md` | `lg` | `xl`
- `outlined` — Boolean
- `onlyIcon` — Boolean (icon-only button)
- `loading` — Boolean
- `disabled` — Boolean
- `symbol` — Icon name (see icon reference below)

**Event:** `@click`

### AkInput

```vue
<!-- Basic text input -->
<AkInput v-model="name" label="Full Name" placeholder="Enter your name..." />

<!-- Email input -->
<AkInput v-model="email" label="Email" type="email" placeholder="you@example.com" />

<!-- Password input -->
<AkInput v-model="password" label="Password" type="password" />

<!-- Search with icon -->
<AkInput v-model="search" placeholder="Search..." iconLeft="search" />

<!-- Disabled -->
<AkInput disabled label="Read Only" value="Cannot edit" />

<!-- With error state -->
<AkInput v-model="input" label="Field" error="This field is required" />
```

**Available Props:**
- `type` — `text` | `email` | `number` | `password` | `search` | `tel` | `url` | `date`
- `label` — Field label
- `placeholder` — Placeholder text
- `iconLeft` — Icon before input
- `disabled` — Boolean
- `error` — Error message string (shows error state)
- `required` — Boolean

**Event:** `v-model` (two-way binding)

### AkSelect

```vue
<AkSelect
  v-model="selectedStatus"
  :options="[
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Shipped', value: 'shipped' },
  ]"
  label="Order Status"
  placeholder="Choose status..."
  @change="onStatusChange"
/>
```

**Available Props:**
- `options` — Array of `{ label: string, value: any }`
- `label` — Field label
- `placeholder` — Placeholder text
- `disabled` — Boolean
- `multiple` — Boolean (allow multiple selections)

**Event:** `@change` | `v-model`

### AkTable

```vue
<AkTable
  :columns="[
    { name: 'reference', label: 'Reference', width: '150px', align: 'left' },
    { name: 'brand', label: 'Brand', width: '200px' },
    { name: 'status', label: 'Status', width: '100px', align: 'center' },
    { name: 'total', label: 'Total', width: '100px', align: 'right' },
  ]"
  :data="orders"
  :border="true"
  :rowStyles="['hover']"
  @rowClick="selectOrder"
>
  <!-- Custom cell template -->
  <template #item.status="{ item }">
    <AkBadge :content="item.status" :color="statusColors[item.status]" size="sm" />
  </template>

  <!-- Custom header template -->
  <template #column.reference>
    <span style="font-weight: 600;">Order Ref</span>
  </template>
</AkTable>
```

**Available Props:**
- `columns` — Array of column config: `{ name: string, label: string, width?: string, align?: 'left'|'center'|'right' }`
- `data` — Array of row objects
- `border` — Boolean (show borders)
- `rowStyles` — Array of styles: `['hover']`, `['striped']`

**Slots:**
- `#item.[columnName]="{ item }"` — Custom cell content
- `#column.[columnName]` — Custom header content

**Event:** `@rowClick="handler"` → receives row object

### AkBadge

```vue
<!-- Status badge -->
<AkBadge content="Active" color="green" size="sm" />

<!-- Badge with icon -->
<AkBadge content="Warning" color="orange-full" size="xs" symbol="clock" />

<!-- Red badge (error) -->
<AkBadge content="Cancelled" color="red" size="md" />
```

**Available Props:**
- `content` — Badge text
- `color` — `blue` | `green` | `grey` | `orange` | `purple` | `red` (add `-full` for solid variants)
- `size` — `xs` | `sm` | `md` | `lg`
- `symbol` — Optional icon name

### AkAlert

```vue
<!-- Info alert -->
<AkAlert type="info" title="Note">This is informational content.</AkAlert>

<!-- Success alert -->
<AkAlert type="success" title="Done" closable @close="onClose">Your order has been saved!</AkAlert>

<!-- Warning alert -->
<AkAlert type="warning" title="Attention">Please review before proceeding.</AkAlert>

<!-- Error alert -->
<AkAlert type="error" title="Error">Something went wrong. Please try again.</AkAlert>
```

**Available Props:**
- `type` — `info` | `success` | `warning` | `error` | `discount` | `neutral`
- `title` — Alert title
- `closable` — Boolean (show close button)

**Event:** `@close` (when user closes)

### AkPagination

```vue
<AkPagination
  :currentPage="page"
  :lastPage="totalPages"
  @change="page = $event"
/>
```

**Available Props:**
- `currentPage` — Current page number (1-based)
- `lastPage` — Total number of pages

**Event:** `@change="handler"` → receives new page number

### AkModal

```vue
<!-- Confirmation modal -->
<AkButton @click="$refs.confirmModal.openModal()">Delete</AkButton>

<AkModal
  ref="confirmModal"
  size="md"
  titleContent="Confirm Delete"
  validateButtonText="Delete"
  validateButtonColor="error"
  cancelButtonText="Cancel"
  @validated="onDelete"
  @cancel="onCancel"
>
  <p>This action cannot be undone.</p>
</AkModal>
```

**Available Props:**
- `size` — `sm` | `md` | `lg` | `xl` | `full`
- `titleContent` — Modal title
- `validateButtonText` — Confirm button text
- `validateButtonColor` — Button color
- `cancelButtonText` — Cancel button text

**Methods:**
- `openModal()` — Show modal
- `closeModal()` — Hide modal

**Events:** `@validated` | `@cancel`

### AkIcon

```vue
<!-- Small icon -->
<AkIcon symbol="home" size="sm" />

<!-- Medium icon -->
<AkIcon symbol="search" size="md" />

<!-- Large icon -->
<AkIcon symbol="edit" size="lg" />
```

**Available Props:**
- `symbol` — Icon name (see icon reference below)
- `size` — `sm` | `md` | `lg`

## Icon Reference

### Common Icons
- **Navigation:** `home`, `list`, `grid`, `search`, `settings`
- **Actions:** `plus`, `edit`, `trash`, `download`, `upload`, `share`
- **Status:** `check`, `close`, `clock`, `alert`, `info`
- **Navigation:** `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- **Commerce:** `cart`, `shop-window`, `graph-up`, `bell`, `heart`

See `src/llms-component-catalog.md` for complete icon list.

## Design Tokens

### Spacing Scale (4px grid)

```css
/* 1rem = 16px (browser default) */
--space-0: 0rem           /* 0px */
--space-0-5: 0.125rem     /* 2px */
--space-1: 0.25rem        /* 4px */
--space-2: 0.5rem         /* 8px */
--space-3: 0.75rem        /* 12px */
--space-4: 1rem           /* 16px */  ← Most common
--space-5: 1.5rem         /* 24px */  ← Common for sections
--space-6: 2rem           /* 32px */
--space-8: 4rem           /* 64px */
```

**Usage:**
```vue
<!-- Padding -->
<div style="padding: var(--space-4);">Content</div>

<!-- Margin -->
<div style="margin-bottom: var(--space-5);">Section</div>

<!-- Gap (flexbox) -->
<div style="display: flex; gap: var(--space-3);">Items</div>
```

### Typography Scale

```css
/* Font sizes with line heights */
--text-xs: 0.75rem         /* 12px */
--text-sm: 0.875rem        /* 14px */
--text-base: 1rem          /* 16px */  ← Default
--text-lg: 1.125rem        /* 18px */
--text-xl: 1.25rem         /* 20px */
--text-2xl: 1.5rem         /* 24px */
--text-3xl: 1.75rem        /* 28px */
--text-4xl: 2.25rem        /* 36px */
--text-5xl: 2.5rem         /* 40px */

/* Line heights follow TypeScript convention */
--leading-xs: 1rem
--leading-sm: 1.25rem
--leading-base: 1.5rem
--leading-lg: 1.5rem
--leading-xl: 1.75rem
--leading-2xl: 2rem
```

**Usage:**
```vue
<style scoped>
h1 {
  font-size: var(--text-3xl);
  line-height: var(--leading-3xl);
}

p {
  font-size: var(--text-base);
  line-height: var(--leading-base);
}

.small-text {
  font-size: var(--text-sm);
  line-height: var(--leading-sm);
}
</style>
```

### Border Radius

```css
--radius-xs: 3px
--radius-sm: 4px
--radius-md: 8px      ← Most common
--radius-lg: 16px
--radius-xl: 32px
--radius-2xl: 48px
```

**Usage:**
```vue
<style scoped>
.card {
  border-radius: var(--radius-md);
}

.button {
  border-radius: var(--radius-sm);
}

.avatar {
  border-radius: 50%;  /* Circle */
}
</style>
```

### Font Family

```css
--font-family: 'Poppins', sans-serif
```

**Usage:**
```vue
<style scoped>
* {
  font-family: var(--font-family);  /* Already applied globally */
}
</style>
```

### Colors from Design System

Colors are auto-loaded from `@ankorstore/design-system/dist/design-system.css`

**Foundation Colors (from DS `colors.css`):**
- `--primary: rgba(20,6,10,1)` — brand color
- `--white: rgba(255,255,255,1)` — white surfaces

**Neutral Scale:**
- `--neutral-100: rgb(249,249,249,1)` — backgrounds, hover
- `--neutral-300: rgba(238,238,238,1)` — light borders
- `--neutral-500: rgba(200,196,191,1)` — disabled, icons
- `--neutral-700: rgba(119,114,114,1)` — muted text
- `--neutral-900: rgba(89,84,84,1)` — headings
- `--color-border-light: #F0F0F0` — dividers (gap-filler in `design-tokens.css`)

**Status Colors:**
- `--error: rgba(212,22,70,1)` — error/destructive
- `--warning: rgba(255,100,0,1)` — warning states
- `--success: rgba(85,117,112,1)` — success
- `--info-700: rgba(11,0,244,1)` — info emphasis

**Usage:**
```vue
<style scoped>
.error {
  color: var(--error);
}

.success {
  color: var(--success);
}

.card {
  background-color: var(--neutral-100);
}
</style>
```

## Styling Patterns

### Layout Patterns

#### Flex Column (Vertical Stack)
```vue
<div style="display: flex; flex-direction: column; gap: var(--space-4);">
  <h2>Title</h2>
  <p>Paragraph</p>
  <AkButton>Action</AkButton>
</div>
```

#### Flex Row (Horizontal Stack)
```vue
<div style="display: flex; align-items: center; gap: var(--space-3);">
  <AkIcon symbol="check" />
  <span>Success message</span>
</div>
```

#### Grid (Responsive Columns)
```vue
<div style="
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

#### Card Pattern
```vue
<div style="
  background-color: var(--neutral-100);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Common Component Combinations

#### Search + Filter Bar
```vue
<div style="
  display: flex;
  gap: var(--space-3);
  align-items: flex-end;
  margin-bottom: var(--space-5);
">
  <AkInput
    v-model="search"
    placeholder="Search..."
    iconLeft="search"
    style="flex: 1;"
  />
  <AkSelect v-model="status" :options="statusOptions" />
  <AkButton outlined>Reset</AkButton>
</div>
```

#### Data Table with Status
```vue
<AkTable :columns="columns" :data="items">
  <template #item.status="{ item }">
    <AkBadge
      :content="item.status"
      :color="statusColors[item.status]"
      size="sm"
    />
  </template>
</AkTable>
```

#### Form Layout
```vue
<div style="
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 500px;
">
  <AkInput v-model="name" label="Name" required />
  <AkInput v-model="email" label="Email" type="email" required />
  <AkSelect v-model="role" label="Role" :options="roleOptions" />
  <div style="display: flex; gap: var(--space-3);">
    <AkButton color="primary">Save</AkButton>
    <AkButton outlined>Cancel</AkButton>
  </div>
</div>
```

## Responsive Design

### Breakpoints (DS-aligned, mobile-first)

| Name | Width | Use Case |
|------|-------|----------|
| `xs` | 480px | Mobile (phones) |
| `sm` | 640px | Mobile (large phones) |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1600px | Large displays |

### Utility Classes (Preferred)

Responsive utility classes in `src/styles/responsive-utils.css` — prefer these over custom `@media` queries:

```html
<!-- Layout reflow: 1 col on mobile → 2 cols at md -->
<div class="cols-1-md-2">...</div>

<!-- Show/hide by breakpoint -->
<div class="hide-below-md">Desktop only</div>
<div class="show-below-md">Mobile only</div>

<!-- Stack: vertical on mobile, horizontal at md -->
<div class="stack-below-md">...</div>

<!-- Responsive headings -->
<h1 class="text-responsive-h1">Scales down on mobile</h1>
```

### Custom Media Queries (When Utilities Don't Fit)

Use mobile-first `@media (min-width: ...)` queries with standard breakpoint values. Do **NOT** use `max-width` or hardcode other pixel values.

```vue
<style scoped>
/* Default: mobile styles */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* md+ (768px) */
@media (min-width: 768px) {
  .grid { grid-template-columns: 1fr 1fr; }
}

/* lg+ (1024px) */
@media (min-width: 1024px) {
  .grid { grid-template-columns: 1fr 1fr 1fr; }
}
</style>
```

### Responsive Table

```vue
<!-- Scrollable on mobile -->
<div style="overflow-x: auto;">
  <AkTable :columns="columns" :data="items" />
</div>
```

## Accessibility

### Color Contrast
- Design System components meet WCAG 2.1 Level AA
- Don't rely on color alone; use icons + labels
- Test with contrast checker if adding custom colors

### Keyboard Navigation
- All Ak* components support keyboard navigation
- Ensure tab order is logical
- Focus styles provided by DS

### Semantic HTML
- Use AkButton for actions (not divs)
- Use AkLink for navigation (not divs)
- Use AkInput for text input (not divs)
- Use AkTable for tabular data (not divs)

### Labels & ARIA
- Use `label` prop on AkInput and AkSelect
- AkTable columns have accessible headers
- Modal titles via `titleContent` prop

## Dark Mode Considerations

DS v28 does not include built-in dark mode. If needed in future:
1. Add CSS custom properties for dark color scheme
2. Toggle via `prefers-color-scheme` media query
3. Or add manual theme toggle

## Styling Anti-Patterns

### ❌ DON'T: Use raw HTML
```vue
<!-- WRONG -->
<button @click="save">Save</button>
<input v-model="search" />
<table><!-- data --></table>

<!-- CORRECT -->
<AkButton @click="save">Save</AkButton>
<AkInput v-model="search" />
<AkTable :data="items" :columns="cols" />
```

### ❌ DON'T: Hardcode pixel values
```vue
<!-- WRONG -->
<style scoped>
.card {
  padding: 16px;
  margin: 24px 0;
  border-radius: 8px;
}
</style>

<!-- CORRECT -->
<style scoped>
.card {
  padding: var(--space-4);
  margin: var(--space-5) 0;
  border-radius: var(--radius-md);
}
</style>
```

### ❌ DON'T: Hardcode hex color values
```vue
<!-- WRONG -->
<style scoped>
.header {
  background-color: #14060A;
  color: #FFFFFF;
  border: 1px solid #F0F0F0;
}
</style>

<!-- CORRECT -->
<style scoped>
.header {
  background-color: var(--primary);
  color: var(--white);
  border: 1px solid var(--color-border-light);
}
</style>
```

### ❌ DON'T: Use Tailwind (@apply)
```vue
<!-- WRONG (Tailwind removed) -->
<style scoped>
.card {
  @apply p-4 m-5 rounded-md;
}
</style>

<!-- CORRECT -->
<style scoped>
.card {
  padding: var(--space-4);
  margin: var(--space-5);
  border-radius: var(--radius-md);
}
</style>
```

### ❌ DON'T: Global styles (except design-tokens.css)
```typescript
// WRONG
// src/styles/global.css
body {
  padding: 20px;  // Will affect all pages
}

// CORRECT: Use scoped styles or design-tokens.css
// scoped in AppLayout.vue instead
```

---

**Last Updated:** 2026-03-27
**Design System:** Ankorstore v28
**Component Registration:** Global (no imports needed)
