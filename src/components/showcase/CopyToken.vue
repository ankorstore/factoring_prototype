<template>
  <span class="copy-token" :title="`Click to copy: ${value}`" @click="copy">
    <slot />
    <span v-if="copied" class="copy-token__feedback">Copied!</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = defineProps<{ value: string }>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value)
    if (timer) clearTimeout(timer)
    copied.value = true
    timer = setTimeout(() => { copied.value = false }, 1200)
  } catch { /* clipboard requires HTTPS or localhost */ }
}

onUnmounted(() => { if (timer) clearTimeout(timer) })
</script>

<style scoped>
.copy-token {
  position: relative;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background 0.15s;
}
.copy-token:hover {
  background: var(--neutral-100);
}
.copy-token__feedback {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--success);
  white-space: nowrap;
  animation: copy-fade 1.2s ease forwards;
}
@keyframes copy-fade {
  0% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
