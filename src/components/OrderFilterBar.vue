<template>
  <div class="order-filter-bar">
    <AkInput
      v-model="searchText"
      placeholder="Search orders..."
      symbol="search"
      @input="emitFilter"
    />
    <AkSelect
      :options="statusOptions"
      :value="selectedStatus"
      placeholder="All statuses"
      @change="onStatusChange"
    />
    <AkButton outlined @click="clearFilters">Clear</AkButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { OrderStatus } from '@/data/types'

export default defineComponent({
  name: 'OrderFilterBar',
  props: {
    statuses: {
      type: Array as PropType<OrderStatus[]>,
      required: true,
    },
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const searchText = ref('')
    const selectedStatus = ref('')

    const statusOptions = [
      { label: 'All statuses', value: '' },
      ...props.statuses.map((s) => ({ label: s.label, value: s.value })),
    ]

    const emitFilter = () => {
      emit('filter', { search: searchText.value, status: selectedStatus.value })
    }

    const onStatusChange = (value: string) => {
      selectedStatus.value = value
      emitFilter()
    }

    const clearFilters = () => {
      searchText.value = ''
      selectedStatus.value = ''
      emitFilter()
    }

    return { searchText, selectedStatus, statusOptions, emitFilter, onStatusChange, clearFilters }
  },
})
</script>

<style scoped>
.order-filter-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
