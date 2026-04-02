<template>
  <div class="home-page">
    <AkAlert type="info" title="Welcome to the DS Prototype Template">
      Build static prototypes using the Ankorstore Design System. Check the example pages in the sidebar for common patterns.
    </AkAlert>

    <div class="home-page__cards">
      <div class="home-page__card">
        <div class="home-page__card-label">Total Orders</div>
        <div class="home-page__card-value">{{ orders.length }}</div>
      </div>
      <div class="home-page__card">
        <div class="home-page__card-label">Total Revenue</div>
        <div class="home-page__card-value">&euro;{{ totalRevenue.toLocaleString() }}</div>
      </div>
      <div class="home-page__card">
        <div class="home-page__card-label">Avg. Items/Order</div>
        <div class="home-page__card-value">{{ avgItems }}</div>
      </div>
      <div class="home-page__card">
        <div class="home-page__card-label">Delivered</div>
        <div class="home-page__card-value">{{ deliveredCount }}</div>
      </div>
    </div>

    <div class="home-page__links">
      <h2 class="home-page__section-title">Quick Links</h2>
      <div class="home-page__link-grid">
        <router-link to="/orders" class="home-page__link">
          <AkIcon symbol="list" size="md" />
          <span>Order List</span>
          <p>Table with filters and pagination</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import orders from '@/data/orders.json'
import type { Order } from '@/data/types'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const typedOrders = orders as Order[]

    const totalRevenue = computed(() =>
      typedOrders.reduce((sum, o) => sum + o.total, 0),
    )

    const avgItems = computed(() =>
      Math.round(typedOrders.reduce((sum, o) => sum + o.itemCount, 0) / typedOrders.length),
    )

    const deliveredCount = computed(() =>
      typedOrders.filter((o) => o.status === 'delivered').length,
    )

    return { orders: typedOrders, totalRevenue, avgItems, deliveredCount }
  },
})
</script>

<style scoped>
.home-page {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.home-page__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.home-page__card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  padding: 1.25rem;
}

.home-page__card-label {
  font-size: 0.875rem;
  color: var(--neutral-700);
  margin-bottom: 0.25rem;
}

.home-page__card-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
}

.home-page__section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 0.75rem;
}

.home-page__link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.home-page__link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  padding: 1.25rem;
  text-decoration: none;
  color: var(--primary);
  transition: border-color 0.15s;
}
.home-page__link:hover {
  border-color: var(--primary);
}
.home-page__link span {
  font-weight: 600;
}
.home-page__link p {
  font-size: 0.875rem;
  color: var(--neutral-700);
  margin: 0;
}
</style>
