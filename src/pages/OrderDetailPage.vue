<template>
  <div class="order-detail-page">
    <div class="order-detail-page__header">
      <AkButton outlined symbol="chevron-left" @click="$router.push('/orders')">
        Back to Orders
      </AkButton>
    </div>

    <template v-if="order">
      <div class="order-detail-page__grid">
        <!-- Order Info Card -->
        <div class="order-detail-page__card">
          <h2 class="order-detail-page__card-title">Order Information</h2>
          <dl class="order-detail-page__dl">
            <dt>Reference</dt>
            <dd>{{ order.reference }}</dd>
            <dt>Status</dt>
            <dd>
              <AkBadge :content="statusLabel" :color="statusColor" size="sm" />
            </dd>
            <dt>Date</dt>
            <dd>{{ order.createdAt }}</dd>
            <dt>Items</dt>
            <dd>{{ order.itemCount }}</dd>
          </dl>
        </div>

        <!-- Parties Card -->
        <div class="order-detail-page__card">
          <h2 class="order-detail-page__card-title">Parties</h2>
          <dl class="order-detail-page__dl">
            <dt>Brand</dt>
            <dd>{{ order.brandName }}</dd>
            <dt>Retailer</dt>
            <dd>{{ order.retailerName }}</dd>
          </dl>
        </div>

        <!-- Financial Card -->
        <div class="order-detail-page__card">
          <h2 class="order-detail-page__card-title">Financial</h2>
          <dl class="order-detail-page__dl">
            <dt>Total</dt>
            <dd class="order-detail-page__total">&euro;{{ order.total.toLocaleString() }}</dd>
            <dt>Currency</dt>
            <dd>{{ order.currency }}</dd>
          </dl>
        </div>
      </div>
    </template>

    <AkAlert v-else type="warning" title="Order not found">
      No order found with ID "{{ $route.params.id }}". Please check the order reference and try again.
    </AkAlert>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import orders from '@/data/orders.json'
import statuses from '@/data/order-statuses.json'
import type { Order, OrderStatus } from '@/data/types'

export default defineComponent({
  name: 'OrderDetailPage',
  setup() {
    const route = useRoute()
    const typedOrders = orders as Order[]
    const typedStatuses = statuses as OrderStatus[]

    const order = computed(() =>
      typedOrders.find((o) => o.id === route.params.id),
    )

    const statusLabel = computed(() =>
      typedStatuses.find((s) => s.value === order.value?.status)?.label || '',
    )

    const statusColor = computed(() =>
      typedStatuses.find((s) => s.value === order.value?.status)?.color || 'grey',
    )

    return { order, statusLabel, statusColor }
  },
})
</script>

<style scoped>
.order-detail-page {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-detail-page__header {
  display: flex;
  align-items: center;
}

.order-detail-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.order-detail-page__card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  padding: 1.25rem;
}

.order-detail-page__card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border-light);
}

.order-detail-page__dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
}

.order-detail-page__dl dt {
  font-size: 0.875rem;
  color: var(--neutral-700);
}

.order-detail-page__dl dd {
  font-size: 0.875rem;
  color: var(--primary);
  margin: 0;
}

.order-detail-page__total {
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
