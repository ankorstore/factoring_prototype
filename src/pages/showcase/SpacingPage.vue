<template>
  <div style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-5);">
    <h2>Spacing & Radius</h2>

    <EmptyTokensNotice v-if="!hasTokens" />

    <template v-else>
      <!-- Spacing Scale -->
      <section>
        <h3 class="section-heading">Spacing Scale</h3>
        <div class="spacing-list">
          <div v-for="s in tokens.spacing" :key="s.name" class="spacing-row">
            <CopyToken :value="`var(${s.cssVar})`">
              <div class="spacing-meta">
                <span class="spacing-meta__name">{{ s.cssVar }}</span>
                <span class="spacing-meta__detail">{{ s.value }} ({{ s.px }}px)</span>
              </div>
            </CopyToken>
            <div class="spacing-bar-container">
              <div
                class="spacing-bar"
                :style="{ width: barWidth(s.px) }"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Border Radius -->
      <section>
        <h3 class="section-heading">Border Radius</h3>
        <div class="radius-grid">
          <CopyToken v-for="r in tokens.radius" :key="r.name" :value="`var(${r.cssVar})`">
            <div class="radius-card">
              <div
                class="radius-box"
                :style="{ borderRadius: `var(${r.cssVar})` }"
              />
              <span class="radius-name">{{ r.cssVar }}</span>
              <span class="radius-value">{{ r.value }}</span>
            </div>
          </CopyToken>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import tokens from '@/data/design-tokens.json'
import CopyToken from '@/components/showcase/CopyToken.vue'
import EmptyTokensNotice from '@/components/showcase/EmptyTokensNotice.vue'

const hasTokens = computed(() => tokens?.spacing?.length > 0)

function barWidth(px: number) {
  if (px <= 0) return '0px'
  return `${Math.min(px, 400)}px`
}
</script>

<style scoped>
.section-heading {
  margin-bottom: var(--space-3);
  color: var(--neutral-900);
}
.spacing-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.spacing-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
}
.spacing-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 160px;
}
.spacing-meta__name {
  font-size: 0.75rem;
  font-weight: 600;
  font-family: monospace;
  color: var(--primary);
}
.spacing-meta__detail {
  font-size: 0.6875rem;
  color: var(--neutral-700);
  font-family: monospace;
}
.spacing-bar-container {
  flex: 1;
}
.spacing-bar {
  height: 8px;
  background: var(--primary);
  border-radius: var(--radius-sm);
  transition: width 0.2s ease;
}
.radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-3);
}
.radius-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
}
.radius-box {
  width: 64px;
  height: 64px;
  border: 2px solid var(--primary);
}
.radius-name {
  font-size: 0.75rem;
  font-weight: 600;
  font-family: monospace;
  color: var(--primary);
}
.radius-value {
  font-size: 0.6875rem;
  color: var(--neutral-700);
  font-family: monospace;
}
</style>
