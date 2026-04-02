<template>
  <div class="order-list-page">
    <div class="order-list-page__header">
      <h2 class="order-list-page__title">Orders</h2>
      <AkButton color="primary" symbol="plus" @click="$router.push('/factoring/new')">
        Import an external order
      </AkButton>
    </div>

    <OrderFilterBar :statuses="statuses" @filter="onFilter" />

    <AkTable
      :columns="columns"
      :data="paginatedOrders"
      :border="true"
      :rowStyles="['hover', 'cursor-pointer']"
      @rowClick="goToOrder"
    >
      <template #item.status="{ item }">
        <AkBadge :content="getStatusLabel(item.status)" :color="getStatusColor(item.status)" size="sm" />
      </template>
      <template #item.total="{ item }">
        &euro;{{ item.total.toLocaleString() }}
      </template>
    </AkTable>

    <div v-if="filteredOrders.length === 0" class="order-list-page__empty">
      <AkAlert type="info" title="No orders found">
        Try adjusting your filters to see more results.
      </AkAlert>
    </div>

    <div v-if="totalPages > 1" class="order-list-page__pagination">
      <AkPagination
        :currentPage="currentPage"
        :lastPage="totalPages"
        @change="currentPage = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import orders from '@/data/orders.json'
import statuses from '@/data/order-statuses.json'
import type { Order, OrderStatus } from '@/data/types'
import OrderFilterBar from '@/components/OrderFilterBar.vue'

const PER_PAGE = 10

export default defineComponent({
  name: 'OrderListPage',
  components: { OrderFilterBar },
  setup() {
    const router = useRouter()
    const typedOrders = orders as Order[]
    const typedStatuses = statuses as OrderStatus[]

    const searchText = ref('')
    const selectedStatus = ref('')
    const currentPage = ref(1)

    const columns = [
      { name: 'reference', label: 'Reference', minWidth: '140px' },
      { name: 'brandName', label: 'Brand', minWidth: '160px' },
      { name: 'retailerName', label: 'Retailer', minWidth: '180px' },
      { name: 'status', label: 'Status', width: '120px' },
      { name: 'total', label: 'Total', width: '120px', align: 'right' as const },
      { name: 'itemCount', label: 'Items', width: '80px', align: 'center' as const },
      { name: 'createdAt', label: 'Date', width: '120px' },
    ]

    const filteredOrders = computed(() => {
      let result = typedOrders
      if (searchText.value) {
        const q = searchText.value.toLowerCase()
        result = result.filter(
          (o) =>
            o.reference.toLowerCase().includes(q) ||
            o.brandName.toLowerCase().includes(q) ||
            o.retailerName.toLowerCase().includes(q),
        )
      }
      if (selectedStatus.value) {
        result = result.filter((o) => o.status === selectedStatus.value)
      }
      return result
    })

    const totalPages = computed(() => Math.ceil(filteredOrders.value.length / PER_PAGE))

    const paginatedOrders = computed(() => {
      const start = (currentPage.value - 1) * PER_PAGE
      return filteredOrders.value.slice(start, start + PER_PAGE)
    })

    const onFilter = ({ search, status }: { search: string; status: string }) => {
      searchText.value = search
      selectedStatus.value = status
      currentPage.value = 1
    }

    const getStatusLabel = (status: string) =>
      typedStatuses.find((s) => s.value === status)?.label || status

    const getStatusColor = (status: string) =>
      typedStatuses.find((s) => s.value === status)?.color || 'grey'

    const goToOrder = (order: Order) => {
      router.push(`/orders/${order.id}`)
    }

    return {
      columns,
      statuses: typedStatuses,
      filteredOrders,
      paginatedOrders,
      currentPage,
      totalPages,
      onFilter,
      getStatusLabel,
      getStatusColor,
      goToOrder,
    }
  },
})
</script>

<style scoped>
.order-list-page {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-list-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-list-page__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.order-list-page__pagination {
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

.order-list-page__empty {
  margin-top: 0.5rem;
}
</style>
