<template>
  <header class="app-topbar">
    <div class="app-topbar__left">
      <AkBreadcrumb
        v-if="breadcrumbs.length > 1"
        :routing="[...breadcrumbs]"
        @push-url="onNavigate"
      />
      <h1 class="app-topbar__title">{{ title }}</h1>
    </div>
    <div class="app-topbar__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppTopbar',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const title = computed(() => (route.meta?.title as string) || '')

    const breadcrumbs = computed(() => {
      const crumbs = [{ name: 'Home', path: '/' }]
      if (route.path !== '/') {
        const segments = route.path.split('/').filter(Boolean)
        let path = ''
        for (const segment of segments) {
          path += `/${segment}`
          const matched = router.getRoutes().find((r) => r.path === path)
          crumbs.push({
            name: (matched?.meta?.title as string) || segment,
            path,
          })
        }
      }
      return crumbs
    })

    const onNavigate = ({ path }: { path: string }) => {
      router.push(path)
    }

    return { title, breadcrumbs, onNavigate }
  },
})
</script>

<style scoped>
.app-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border-light);
  background: var(--white);
}

.app-topbar__left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.app-topbar__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0;
}

.app-topbar__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
