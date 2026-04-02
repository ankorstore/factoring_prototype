<template>
  <div style="padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-5);">
    <div>
      <h2>Typography</h2>
      <p class="subtitle">Font family: Poppins</p>
    </div>

    <EmptyTokensNotice v-if="!hasTokens" />

    <template v-else>
      <AkInput v-model="sampleText" label="Sample text" placeholder="Type to preview..." />

      <div class="type-list">
        <div v-for="t in tokens.typography" :key="t.name" class="type-row">
          <CopyToken :value="`var(${t.cssVar})`">
            <div class="type-meta">
              <span class="type-meta__name">{{ t.cssVar }}</span>
              <span class="type-meta__detail">{{ t.size }} ({{ t.sizePx }}px) &middot; lh: {{ t.lineHeight }}</span>
            </div>
          </CopyToken>
          <div
            class="type-sample"
            :style="{ fontSize: `var(${t.cssVar})`, lineHeight: `var(--leading-${t.name})` }"
          >
            {{ sampleText }}
          </div>
        </div>
      </div>

      <!-- Weight preview for base size only -->
      <section>
        <h3 class="section-heading">Font Weights (base size)</h3>
        <div class="weight-row">
          <div class="weight-sample" style="font-weight: 400;">
            <span class="weight-label">400 Regular</span>
            {{ sampleText }}
          </div>
          <div class="weight-sample" style="font-weight: 600;">
            <span class="weight-label">600 Semibold</span>
            {{ sampleText }}
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import tokens from '@/data/design-tokens.json'
import CopyToken from '@/components/showcase/CopyToken.vue'
import EmptyTokensNotice from '@/components/showcase/EmptyTokensNotice.vue'

const sampleText = ref('The quick brown fox jumps over the lazy dog')
const hasTokens = computed(() => tokens?.typography?.length > 0)
</script>

<style scoped>
.subtitle {
  font-size: 0.875rem;
  color: var(--neutral-700);
  margin-top: var(--space-1);
}
.type-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.type-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
}
.type-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.type-meta__name {
  font-size: 0.75rem;
  font-weight: 600;
  font-family: monospace;
  color: var(--primary);
}
.type-meta__detail {
  font-size: 0.6875rem;
  color: var(--neutral-700);
  font-family: monospace;
}
.type-sample {
  color: var(--primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.section-heading {
  margin-bottom: var(--space-3);
  color: var(--neutral-900);
}
.weight-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.weight-sample {
  padding: var(--space-3);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  line-height: var(--leading-base);
  color: var(--primary);
}
.weight-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--neutral-500);
  margin-bottom: var(--space-1);
  font-family: monospace;
}
</style>
