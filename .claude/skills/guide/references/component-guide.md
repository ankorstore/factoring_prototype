# Component Guide

## What's Available

The Ankorstore Design System (DS v28) provides 18+ production-ready Vue components, all globally registered with the `Ak` prefix. No imports needed — just use them in templates.

## Top 10 Components

| Component | What It Does | Key Props | Example |
|-----------|-------------|-----------|---------|
| `<AkButton>` | Buttons & actions | `color="primary"` `size="md"` `outlined` `symbol="plus"` `loading` | `<AkButton color="primary" @click="save">Save</AkButton>` |
| `<AkInput>` | Text fields | `v-model` `label` `type` `placeholder` `iconLeft` | `<AkInput v-model="name" label="Name" />` |
| `<AkSelect>` | Dropdowns | `v-model` `:options="[{label,value}]"` `placeholder` | `<AkSelect v-model="role" :options="roles" />` |
| `<AkTable>` | Data tables | `:columns` `:data` `:border` `:rowStyles="['hover']"` | See OrderListPage for full example |
| `<AkBadge>` | Status labels | `content` `color="green"` `size="sm"` | `<AkBadge content="Active" color="green" />` |
| `<AkModal>` | Dialogs | `ref` `titleContent` `validateButtonText` | Open via `ref.value.openModal()` |
| `<AkAlert>` | Notifications | `type="info"` `title` | `<AkAlert type="warning" title="Heads up">Message</AkAlert>` |
| `<AkPagination>` | Page navigation | `v-model` `:totalItems` `:perPage` | Pair with computed slice of data array |
| `<AkToggle>` | On/off switches | `v-model` `label` | `<AkToggle v-model="enabled" label="Notify" />` |
| `<AkTooltip>` | Hover hints | `content` `position` | `<AkTooltip content="Help text"><AkButton>?</AkButton></AkTooltip>` |

## Component Decision Tree

**"I need a..."**

- **Form** → AkInput + AkSelect + AkButton (see Common Recipes in CLAUDE.md)
- **Data table** → AkTable + AkPagination + AkBadge (see OrderListPage)
- **Confirmation dialog** → AkModal with validate/cancel buttons
- **Status indicator** → AkBadge with color mapping
- **User feedback** → AkAlert (inline) or AkModal (blocking)
- **Navigation** → Built into layout sidebars (AppSidebar or ConnectedSidebar)
- **Toggle/switch** → AkToggle

## Full Reference

For complete props, slots, and events for all 18+ components → read `src/llms-component-catalog.md`

## Rules

- ONLY use `Ak*` components — no raw HTML `<button>`, `<input>`, `<table>`
- No other UI libraries (no Vuetify, PrimeVue, etc.)
- Components are globally registered — no import statements needed
