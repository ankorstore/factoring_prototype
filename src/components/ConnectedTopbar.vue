<template>
  <header class="topbar">
    <!-- Designers: add topbar content here (logo, search, badges, icons, cart, etc.) -->
    <slot />
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--white);
  border-bottom: 1px solid var(--color-border-light);
  min-height: 56px;
}
</style>
