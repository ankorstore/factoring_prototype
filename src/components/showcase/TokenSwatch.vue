<template>
  <CopyToken :value="`var(${color.cssVar})`">
    <div class="token-swatch">
      <div
        class="token-swatch__color"
        :style="{ background: `var(${color.cssVar}, ${color.tailwindHex || color.cssValue})` }"
      >
        <span class="token-swatch__contrast token-swatch__contrast--light">Aa</span>
        <span class="token-swatch__contrast token-swatch__contrast--dark">Aa</span>
      </div>
      <div class="token-swatch__info">
        <span class="token-swatch__name">{{ color.cssVar }}</span>
        <span class="token-swatch__value">{{ color.cssValue || color.tailwindHex }}</span>
        <span v-if="color.tailwindHex && color.cssValue" class="token-swatch__hex">
          {{ color.tailwindHex }}
        </span>
      </div>
    </div>
  </CopyToken>
</template>

<script setup lang="ts">
import type { ColorToken } from '@/data/types'
import CopyToken from './CopyToken.vue'

defineProps<{ color: ColorToken }>()
</script>

<style scoped>
.token-swatch {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.token-swatch__color {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}
.token-swatch__contrast {
  font-size: 0.75rem;
  font-weight: 600;
}
.token-swatch__contrast--light { color: var(--white); }
.token-swatch__contrast--dark { color: var(--primary); }
.token-swatch__info {
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.token-swatch__name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  font-family: monospace;
}
.token-swatch__value {
  font-size: 0.6875rem;
  color: var(--neutral-700);
  font-family: monospace;
}
.token-swatch__hex {
  font-size: 0.625rem;
  color: var(--neutral-500);
  font-family: monospace;
}
</style>
