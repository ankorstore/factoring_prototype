# Components — DS Prototype Template

## Rules

- ALWAYS use `<script setup lang="ts">` + Composition API
- Define props: `defineProps<{ label: string }>()` — no `const props =` unless used in script
- Define emits: `defineEmits<{ change: [value: string] }>()` for type safety
- Define v-model: `defineModel<type>()` — avoids manual modelValue/update pattern
- PascalCase file names: `OrderCard.vue`, `StatusBadge.vue`
- Keep components under 200 lines — extract sub-components if larger

## DS Component Library

- ONLY use `@ankorstore/design-system` components (`Ak*` prefix)
- Do NOT use raw HTML when a DS component exists (`<AkButton>` not `<button>`)
- Components are globally registered — no imports needed in templates
- Full API reference: `src/llms-component-catalog.md`

## Styling

- Use `<style scoped>` with plain CSS
- Use CSS custom properties from `src/styles/design-tokens.css`: `var(--space-4)`, `var(--radius-md)`
- Layout utility classes available in templates: `.flex`, `.flex-col`, `.gap-4`, `.items-center`
- Colors: use `var(--primary)`, `var(--neutral-700)`, `var(--error)` etc. See `design-tokens.css` for full list. Do NOT hardcode hex values.
- No Tailwind. No `@apply`. No `ds-` prefixed classes.

## Conventions

- camelCase for props/emits in JS, kebab-case in templates
- Use prop shorthand: `<MyComp :count />` when value matches prop name
- Use slot shorthand: `<template #default>` not `<template v-slot:default>`
- Only add comments that explain *why*, not *what*
