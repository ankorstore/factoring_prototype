<template>
  <div class="app-layout">
    <div class="prototype-ribbon">PROTOTYPE</div>
    <AppSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="app-layout__main">
      <AppTopbar />
      <main class="app-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'

export default defineComponent({
  name: 'AppLayout',
  components: { AppSidebar, AppTopbar },
  setup() {
    const sidebarCollapsed = ref(false)
    return { sidebarCollapsed }
  },
})
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background-color: var(--neutral-100);
}

.app-layout__main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.app-layout__content {
  flex: 1;
  overflow-y: auto;
}

.prototype-ribbon {
  position: fixed;
  top: 14px;
  right: -40px;
  z-index: 9999;
  background: var(--error);
  color: var(--white);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 4px 50px;
  transform: rotate(45deg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  user-select: none;
}
</style>
