<template>
  <div class="connected-layout">
    <div class="prototype-ribbon">PROTOTYPE</div>
    <ConnectedSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="connected-layout__main">
      <ConnectedTopbar />
      <main class="connected-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConnectedSidebar from '@/components/ConnectedSidebar.vue'
import ConnectedTopbar from '@/components/ConnectedTopbar.vue'

const sidebarCollapsed = ref(false)
</script>

<style scoped>
.connected-layout {
  display: flex;
  height: 100vh;
  background-color: var(--neutral-100);
}

.connected-layout__main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.connected-layout__content {
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
