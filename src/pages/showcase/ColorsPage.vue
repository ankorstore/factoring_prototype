<template>
  <div style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-5);">
    <div>
      <h2>Colors</h2>
      <p class="subtitle">DS v{{ tokens.version }} — synced {{ tokens.syncDate }}</p>
    </div>

    <EmptyTokensNotice v-if="!hasTokens" />

    <template v-else>
      <section v-for="[group, items] of colorsByGroup" :key="group">
        <h3 class="group-heading">{{ groupLabels[group] }}</h3>
        <div class="swatch-grid">
          <TokenSwatch v-for="color in items" :key="color.name" :color="color" />
        </div>
      </section>

      <AkAlert type="info" title="Tailwind vs CSS values">
        Some neutral shades have different hex (Tailwind) and rgba (CSS) values.
        Always use <code>var(--name)</code> in styles — never hardcode hex.
      </AkAlert>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import tokens from '@/data/design-tokens.json'
import type { ColorToken } from '@/data/types'
import TokenSwatch from '@/components/showcase/TokenSwatch.vue'
import EmptyTokensNotice from '@/components/showcase/EmptyTokensNotice.vue'

const hasTokens = computed(() => tokens?.colors?.length > 0)

const groupLabels: Record<string, string> = {
  foundation: 'Foundation',
  neutral: 'Neutrals',
  functional: 'Functional',
  special: 'Special',
}

const GROUP_ORDER = ['foundation', 'neutral', 'functional', 'special'] as const

const colorsByGroup = computed(() => {
  const map = new Map<string, ColorToken[]>(GROUP_ORDER.map(g => [g, []]))
  for (const color of tokens.colors as ColorToken[]) {
    map.get(color.group)?.push(color)
  }
  return map
})
</script>

<style scoped>
.subtitle {
  font-size: 0.875rem;
  color: var(--neutral-700);
  margin-top: var(--space-1);
}
.group-heading {
  margin-bottom: var(--space-3);
  color: var(--neutral-900);
}
.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-3);
}
</style>
