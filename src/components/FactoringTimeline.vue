<template>
  <div class="timeline">
    <h4 class="timeline__title">{{ title }}</h4>
    <div class="timeline__steps">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="timeline__step"
        :class="`timeline__step--${step.status}`"
      >
        <div class="timeline__dot">
          <span v-if="step.status === 'completed'" class="timeline__check">✓</span>
          <span v-else-if="step.status === 'failed'" class="timeline__cross">✕</span>
          <span v-else class="timeline__number">{{ i + 1 }}</span>
        </div>
        <div v-if="i < steps.length - 1" class="timeline__line" :class="`timeline__line--${step.status}`" />
        <div class="timeline__content">
          <span class="timeline__label">{{ step.label }}</span>
          <span class="timeline__detail">{{ step.detail }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  steps: Array<{
    label: string
    detail: string
    status: 'completed' | 'active' | 'upcoming' | 'failed'
  }>
}>()
</script>

<style scoped>
.timeline {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}

.timeline__title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 var(--space-4);
}

.timeline__steps {
  display: flex;
  flex-direction: column;
}

.timeline__step {
  display: grid;
  grid-template-columns: 28px 1fr;
  grid-template-rows: auto auto;
  column-gap: var(--space-3);
}

.timeline__dot {
  grid-column: 1;
  grid-row: 1;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.timeline__step--completed .timeline__dot {
  background: var(--success);
  color: var(--white);
}
.timeline__step--active .timeline__dot {
  background: var(--warning);
  color: var(--white);
}
.timeline__step--upcoming .timeline__dot {
  background: var(--neutral-100);
  color: var(--neutral-500);
}
.timeline__step--failed .timeline__dot {
  background: var(--error);
  color: var(--white);
}

.timeline__line {
  grid-column: 1;
  grid-row: 2;
  width: 2px;
  height: 100%;
  min-height: 24px;
  margin: 4px auto;
  background: var(--neutral-100);
}
.timeline__line--completed {
  background: var(--success);
}

.timeline__content {
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--space-4);
}

.timeline__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
  line-height: 28px;
}
.timeline__step--upcoming .timeline__label {
  color: var(--neutral-500);
}

.timeline__detail {
  font-size: var(--text-xs);
  color: var(--neutral-700);
  margin-top: 2px;
}

.timeline__check,
.timeline__cross,
.timeline__number {
  line-height: 1;
}
</style>
