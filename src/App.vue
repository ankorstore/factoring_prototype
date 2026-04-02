<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import ConnectedLayout from '@/layouts/ConnectedLayout.vue'

const route = useRoute()

const layouts: Record<string, any> = {
  default: AppLayout,
  connected: ConnectedLayout,
}

const layout = computed(() => {
  const name = (route.meta?.layout as string) || 'default'
  return layouts[name] || AppLayout
})
</script>
