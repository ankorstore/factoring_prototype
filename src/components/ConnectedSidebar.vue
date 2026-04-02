<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
    <nav class="sidebar__nav">
      <!-- Top navigation -->
      <div class="sidebar__top">
        <template v-for="item in topItems" :key="item.path">
          <button
            class="sidebar__item"
            :class="{ 'sidebar__item--active': isSectionActive(item) }"
            @click="onItemClick(item)"
          >
            <AkIcon :symbol="item.icon" size="sm" />
            <span v-if="!collapsed" class="sidebar__label">{{ item.label }}</span>
            <template v-if="!collapsed">
              <span v-if="item.badge" class="sidebar__badge">{{ item.badge }}</span>
              <AkIcon
                v-if="item.children"
                :symbol="expanded[item.path] ? 'chevron-up' : 'chevron-down'"
                size="sm"
              />
            </template>
          </button>

          <!-- Children (expandable) -->
          <div v-if="item.children && expanded[item.path] && !collapsed" class="sidebar__children">
            <router-link
              v-for="child in item.children"
              :key="child.path"
              :to="child.path"
              class="sidebar__child"
              :class="{ 'sidebar__child--active': route.path === child.path }"
            >
              {{ child.label }}
              <span v-if="child.badge" class="sidebar__child-badge">{{ child.badge }}</span>
            </router-link>
          </div>
        </template>
      </div>

      <!-- Bottom navigation -->
      <div class="sidebar__bottom">
        <button
          v-for="item in bottomItems"
          :key="item.path"
          class="sidebar__item"
          @click="onItemClick(item)"
        >
          <AkIcon :symbol="item.icon" size="sm" />
          <span v-if="!collapsed" class="sidebar__label">{{ item.label }}</span>
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { topItems, bottomItems } from '@/data/connected-nav'
import type { NavItem } from '@/data/connected-nav'

defineProps<{ collapsed?: boolean }>()
defineEmits<{ toggle: [] }>()

const route = useRoute()
const router = useRouter()

// Track which sections are expanded
const expanded = reactive<Record<string, boolean>>({ '/orders': true })

function isSectionActive(item: NavItem) {
  if (item.children) {
    return item.children.some(c => route.path.startsWith(c.path))
  }
  if (item.path === '/') return route.path === '/'
  return route.path.startsWith(item.path)
}

function onItemClick(item: NavItem) {
  if (item.children) {
    expanded[item.path] = !expanded[item.path]
  } else {
    router.push(item.path)
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-right: 1px solid var(--color-border-light);
  height: 100%;
  width: 64px;
  min-width: 64px;
  transition: width 0.2s ease, min-width 0.2s ease;
}

@media (min-width: 768px) {
  .sidebar {
    width: 240px;
    min-width: 240px;
  }
}

.sidebar--collapsed {
  width: 64px;
  min-width: 64px;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: var(--space-5) var(--space-2) var(--space-6);
}

.sidebar__top,
.sidebar__bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sidebar__item,
.sidebar__child {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
  border-radius: 6px;
  font-family: var(--font-family);
  font-size: var(--text-sm);
  line-height: var(--leading-sm);
  cursor: pointer;
}
.sidebar__item:hover,
.sidebar__child:hover { background: var(--neutral-100); }

.sidebar__item {
  background: none;
  border: none;
  color: var(--primary);
  width: 100%;
  text-align: left;
}
.sidebar__item--active {
  background: var(--warm-white, #FBF8F3);
  font-weight: 600;
  color: var(--accent, #517070);
}
.sidebar__label { flex: 1; text-align: left; }

.sidebar__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  border-radius: var(--radius-sm);
  background: var(--warning-700, #CE4406);
  color: var(--white);
  font-size: var(--text-xs);
  font-weight: 600;
  line-height: 1;
}

.sidebar__children { display: flex; flex-direction: column; }
.sidebar__child {
  padding-left: 36px;
  color: var(--neutral-900);
  text-decoration: none;
}
.sidebar__child--active { font-weight: 600; color: var(--primary); }

.sidebar__child-badge {
  display: inline-flex;
  align-items: center;
  padding: 0 6px;
  height: 18px;
  border-radius: var(--radius-sm);
  background: var(--success);
  color: var(--white);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  margin-left: auto;
}

.sidebar__label,
.sidebar__badge { display: none; }

/* Collapsed override depends on source order (same specificity as media query) */
@media (min-width: 768px) {
  .sidebar__label,
  .sidebar__badge { display: revert; }
}
</style>
