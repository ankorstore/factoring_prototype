<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': collapsed }">
    <div class="app-sidebar__header">
      <AkLogoAKS v-if="!collapsed" class="app-sidebar__logo" />
      <AkLogoAKSSymbol v-else class="app-sidebar__logo--small" />
      <button class="app-sidebar__toggle" @click="$emit('toggle')">
        <AkIcon :symbol="collapsed ? 'chevron-right' : 'chevron-left'" size="sm" />
      </button>
    </div>

    <nav class="app-sidebar__nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="app-sidebar__link"
        :class="{ 'app-sidebar__link--active': isActive(item.path) }"
      >
        <AkIcon :symbol="item.icon" size="sm" />
        <span v-if="!collapsed" class="app-sidebar__label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{ collapsed?: boolean }>()
defineEmits<{ toggle: [] }>()

const route = useRoute()

const navItems: { path: string; label: string; icon: string }[] = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/orders', label: 'Orders', icon: 'list' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style scoped>
.app-sidebar {
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-right: 1px solid var(--color-border-light);
  height: 100vh;
  width: 64px;
  min-width: 64px;
  transition: all 0.2s ease;
}

@media (min-width: 768px) {
  .app-sidebar {
    width: 240px;
    min-width: 240px;
  }
}

/* Collapsed override depends on source order (same specificity as media query above) */
.app-sidebar--collapsed {
  width: 64px;
  min-width: 64px;
}

.app-sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border-light);
}

.app-sidebar__logo {
  display: none;
  max-width: 140px;
}

.app-sidebar__logo--small {
  max-width: 28px;
}

.app-sidebar__toggle {
  padding: 0.25rem;
  border-radius: 4px;
  color: var(--neutral-500);
  background: none;
  border: none;
  cursor: pointer;
}
.app-sidebar__toggle:hover {
  background: var(--neutral-100);
}

.app-sidebar__nav {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
}

.app-sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: var(--neutral-700);
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}
.app-sidebar__link:hover {
  background: var(--neutral-100);
  color: var(--primary);
}

.app-sidebar__link--active {
  background: rgba(20, 6, 10, 0.05);
  color: var(--primary);
  font-weight: 600;
}

.app-sidebar__label {
  display: none;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .app-sidebar__label,
  .app-sidebar__logo {
    display: revert;
  }
}
</style>
