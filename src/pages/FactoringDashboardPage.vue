<template>
  <div class="factoring">
    <!-- Header -->
    <div class="factoring__header">
      <h2 class="factoring__title">Factoring</h2>
      <p class="factoring__subtitle">Get paid on delivery for your direct orders · 3% service fee · Powered by Aria</p>
    </div>

    <!-- Two entry points -->
    <div class="factoring__actions">
      <div class="factoring__action-card" @click="$router.push('/factoring/new')">
        <div class="factoring__action-icon">👤</div>
        <div class="factoring__action-content">
          <h3 class="factoring__action-title">Verify your customer</h3>
          <p class="factoring__action-desc">Add a new customer and check their eligibility for factoring with Aria.</p>
        </div>
        <div class="factoring__action-arrow">→</div>
      </div>
      <div class="factoring__action-card" @click="$router.push('/factoring/new/review')">
        <div class="factoring__action-icon">📄</div>
        <div class="factoring__action-content">
          <h3 class="factoring__action-title">New financing request</h3>
          <p class="factoring__action-desc">Create a quote, upload an invoice, and submit a financing request for an eligible customer.</p>
        </div>
        <div class="factoring__action-arrow">→</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="factoring__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="factoring__tab"
        :class="{ 'factoring__tab--active': activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span v-if="tab.count !== undefined" class="factoring__tab-count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Tab: Customers -->
    <div v-if="activeTab === 'customers'" class="factoring__panel">
      <div class="factoring__panel-header">
        <AkInput v-model="customerSearch" placeholder="Search customers..." iconLeft="search" />
      </div>

      <AkTable
        :columns="customerColumns"
        :data="filteredCustomers"
        :border="true"
        :rowStyles="['hover', 'cursor-pointer']"
        @rowClick="openCustomerDrawer"
      >
        <template #item.name="{ item }">
          <div @click="openCustomerDrawer(item)" style="cursor: pointer;">
            <div style="font-weight: 600;">{{ item.name }}</div>
            <AkBadge
              :content="item.eligible ? 'Eligible' : 'Ineligible'"
              :color="item.eligible ? 'green' : 'red'"
              size="sm"
              style="margin-top: 4px;"
            />
          </div>
        </template>
        <template #item.requestCount="{ item }">
          {{ item.requestCount }}
        </template>
        <template #item.contact="{ item }">
          <div>
            <div style="font-size: var(--text-sm);">{{ item.contactName }}</div>
            <div style="font-size: var(--text-xs); color: var(--neutral-700);">{{ item.contactEmail }}</div>
          </div>
        </template>
        <template #item.actions="{ item }">
          <span class="factoring__view-link" @click.stop="openCustomerDrawer(item)">View →</span>
        </template>
      </AkTable>

      <div v-if="filteredCustomers.length === 0" style="margin-top: var(--space-4);">
        <AkAlert type="info" title="No customers found">Try adjusting your search.</AkAlert>
      </div>
    </div>

    <!-- Customer detail drawer -->
    <div v-if="selectedCustomer" class="factoring__drawer-overlay" @click="selectedCustomer = null">
      <div class="factoring__drawer" @click.stop>
        <div class="factoring__drawer-header">
          <h3 class="factoring__drawer-title">{{ selectedCustomer.name }}</h3>
          <button class="factoring__drawer-close" @click="selectedCustomer = null">✕</button>
        </div>

        <div class="factoring__drawer-badge">
          <AkBadge
            :content="selectedCustomer.eligible ? 'Eligible' : 'Ineligible'"
            :color="selectedCustomer.eligible ? 'green' : 'red'"
            size="sm"
          />
          <span style="font-size: var(--text-xs); color: var(--neutral-700);">since {{ selectedCustomer.eligibilityDate }}</span>
        </div>

        <div class="factoring__drawer-section">
          <div class="factoring__drawer-label">Available credit with Aria</div>
          <div class="factoring__drawer-credit">&euro;{{ selectedCustomer.availableCredit.toLocaleString() }}</div>
        </div>

        <div class="factoring__drawer-section">
          <div class="factoring__drawer-label">Business details</div>
          <div class="factoring__drawer-grid">
            <div class="factoring__drawer-field">
              <span class="factoring__drawer-field-label">SIREN</span>
              <span class="factoring__drawer-field-value">{{ selectedCustomer.siren }}</span>
            </div>
            <div class="factoring__drawer-field">
              <span class="factoring__drawer-field-label">VAT</span>
              <span class="factoring__drawer-field-value">{{ selectedCustomer.vat }}</span>
            </div>
            <div class="factoring__drawer-field">
              <span class="factoring__drawer-field-label">Address</span>
              <span class="factoring__drawer-field-value">{{ selectedCustomer.address }}</span>
            </div>
            <div class="factoring__drawer-field">
              <span class="factoring__drawer-field-label">City</span>
              <span class="factoring__drawer-field-value">{{ selectedCustomer.city }}</span>
            </div>
          </div>
        </div>

        <div class="factoring__drawer-section">
          <div class="factoring__drawer-label">Contact person</div>
          <div class="factoring__drawer-grid">
            <div class="factoring__drawer-field">
              <span class="factoring__drawer-field-label">Name</span>
              <span class="factoring__drawer-field-value">{{ selectedCustomer.contactName }}</span>
            </div>
            <div class="factoring__drawer-field">
              <span class="factoring__drawer-field-label">Email</span>
              <span class="factoring__drawer-field-value">{{ selectedCustomer.contactEmail }}</span>
            </div>
          </div>
        </div>

        <div class="factoring__drawer-section">
          <div class="factoring__drawer-label">Financing</div>
          <div class="factoring__drawer-field">
            <span class="factoring__drawer-field-label">Requests</span>
            <span class="factoring__drawer-field-value">{{ selectedCustomer.requestCount }}</span>
          </div>
        </div>

        <div class="factoring__drawer-actions">
          <AkButton color="primary" @click="$router.push('/factoring/new/review')">
            New financing request →
          </AkButton>
        </div>
      </div>
    </div>

    <!-- Tab: Orders -->
    <div v-if="activeTab === 'orders'" class="factoring__panel">
      <div class="factoring__panel-header">
        <AkInput v-model="orderSearch" placeholder="Search orders..." iconLeft="search" />
        <AkSelect v-model="orderStatusFilter" :options="orderStatusOptions" placeholder="All statuses" />
      </div>

      <AkTable
        :columns="orderColumns"
        :data="filteredOrders"
        :border="true"
        :rowStyles="['hover', 'cursor-pointer']"
        @rowClick="goToOrderDetail"
      >
        <template #item.buyerName="{ item }">
          <span style="font-weight: 600;">{{ item.buyerName }}</span>
        </template>
        <template #item.amount="{ item }">
          &euro;{{ item.amount.toLocaleString() }}
        </template>
        <template #item.status="{ item }">
          <AkBadge :content="orderStatusLabel(item.status)" :color="orderStatusColor(item.status)" size="sm" />
        </template>
        <template #item.products="{ item }">
          <span style="font-size: var(--text-xs); color: var(--neutral-700);">{{ item.products }}</span>
        </template>
      </AkTable>

      <div v-if="filteredOrders.length === 0" style="margin-top: var(--space-4);">
        <AkAlert type="info" title="No orders found">Try adjusting your filters.</AkAlert>
      </div>
    </div>

    <!-- Tab: Documents / Get Paid -->
    <div v-if="activeTab === 'documents'" class="factoring__panel">
      <div class="factoring__docs-intro">
        <h3 class="factoring__docs-title">Upload documents to get paid</h3>
        <p class="factoring__docs-desc">Upload proforma invoices, final invoices, or proof of delivery to advance your orders through the factoring process.</p>
      </div>

      <!-- Pending actions -->
      <div class="factoring__docs-section">
        <h4 class="factoring__docs-section-title">Pending actions</h4>
        <div v-for="req in pendingRequests" :key="req.id" class="factoring__docs-card">
          <div class="factoring__docs-card-header">
            <div>
              <div style="font-weight: 600;">{{ req.buyer.name }}</div>
              <div style="font-size: var(--text-xs); color: var(--neutral-700);">{{ req.reference }} · &euro;{{ req.orderValue.toLocaleString() }}</div>
            </div>
            <AkBadge content="Invoice needed" color="orange" size="sm" />
          </div>
          <AkButton color="primary" @click="$router.push('/factoring/new')">
            Upload invoice →
          </AkButton>
        </div>
      </div>

      <!-- Submitted documents -->
      <div class="factoring__docs-section">
        <h4 class="factoring__docs-section-title">Submitted documents</h4>
        <div v-for="req in submittedRequests" :key="req.id" class="factoring__docs-card">
          <div class="factoring__docs-card-header">
            <div>
              <div style="font-weight: 600;">{{ req.buyer.name }}</div>
              <div style="font-size: var(--text-xs); color: var(--neutral-700);">{{ req.reference }} · &euro;{{ req.orderValue.toLocaleString() }}</div>
            </div>
            <AkBadge :content="docStatusLabel(req.status)" :color="docStatusColor(req.status)" size="sm" />
          </div>
          <div v-for="doc in req.documents" :key="doc.name" class="factoring__docs-file">
            <span style="font-size: 1.25rem;">📄</span>
            <div style="flex: 1;">
              <div style="font-size: var(--text-sm); font-weight: 600;">{{ doc.name }}</div>
              <div style="font-size: var(--text-xs); color: var(--neutral-700);">{{ docTypeLabel(doc.type) }} · {{ doc.size }}</div>
            </div>
            <span style="font-size: var(--text-sm); color: var(--success); cursor: pointer; font-weight: 600;">View</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import factoringData from '@/data/factoring.json'
import type { FactoringBuyer, FactoringOrder, FactoringLoanRequest } from '@/data/types'

const router = useRouter()

const stats = factoringData.stats
const customers = factoringData.customers as unknown as FactoringBuyer[]
const orders = factoringData.orders as unknown as FactoringOrder[]
const pendingRequests = factoringData.pendingRequests as unknown as FactoringLoanRequest[]
const submittedRequests = factoringData.submittedRequests as unknown as FactoringLoanRequest[]

const activeTab = ref('customers')
const selectedCustomer = ref<FactoringBuyer | null>(null)
const customerSearch = ref('')
const orderSearch = ref('')
const orderStatusFilter = ref('')

const tabs = computed(() => [
  { key: 'customers', label: 'Customers', count: customers.length },
  { key: 'orders', label: 'Finance requests', count: orders.length },
  { key: 'documents', label: 'Your payments', count: pendingRequests.length },
])

// --- Customers tab ---
const customerColumns = [
  { name: 'name', label: 'Business name', minWidth: '220px' },
  { name: 'requestCount', label: 'Requests', width: '100px', align: 'center' as const },
  { name: 'contact', label: 'Contact person', minWidth: '200px' },
  { name: 'actions', label: '', width: '80px' },
]

function openCustomerDrawer(customer: FactoringBuyer) {
  selectedCustomer.value = customer
}

const filteredCustomers = computed(() => {
  if (!customerSearch.value) return customers
  const q = customerSearch.value.toLowerCase()
  return customers.filter(
    c => c.name.toLowerCase().includes(q) || c.siren.includes(q) || c.contactName.toLowerCase().includes(q)
  )
})

// --- Orders tab ---
const orderColumns = [
  { name: 'reference', label: 'Reference', width: '160px' },
  { name: 'buyerName', label: 'Customer', minWidth: '160px' },
  { name: 'products', label: 'Products', minWidth: '220px' },
  { name: 'amount', label: 'Amount', width: '120px', align: 'right' as const },
  { name: 'status', label: 'Status', width: '120px' },
  { name: 'createdDate', label: 'Date', width: '120px' },
]

const orderStatusOptions = [
  { label: 'All statuses', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'In review', value: 'in-review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Funded', value: 'funded' },
]

const filteredOrders = computed(() => {
  let result = orders
  if (orderSearch.value) {
    const q = orderSearch.value.toLowerCase()
    result = result.filter(
      o => o.reference.toLowerCase().includes(q) || o.buyerName.toLowerCase().includes(q) || o.products.toLowerCase().includes(q)
    )
  }
  if (orderStatusFilter.value) {
    result = result.filter(o => o.status === orderStatusFilter.value)
  }
  return result
})

const orderStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    draft: 'Draft', submitted: 'Submitted', 'in-review': 'In review',
    approved: 'Approved', shipped: 'Shipped', delivered: 'Delivered', funded: 'Funded',
  }
  return map[status] || status
}

const orderStatusColor = (status: string) => {
  const map: Record<string, string> = {
    draft: 'grey', submitted: 'blue', 'in-review': 'orange',
    approved: 'green', shipped: 'purple', delivered: 'green', funded: 'green',
  }
  return map[status] || 'grey'
}

function goToOrderDetail(order: FactoringOrder) {
  router.push(`/factoring/request/${order.reference}`)
}

// --- Documents tab ---
const docStatusLabel = (status: string) => {
  const map: Record<string, string> = { 'in-review': 'In review', funded: 'Funded ✓', refused: 'Refused' }
  return map[status] || status
}

const docStatusColor = (status: string) => {
  const map: Record<string, string> = { 'in-review': 'blue', funded: 'green', refused: 'red' }
  return map[status] || 'grey'
}

const docTypeLabel = (type: string) => {
  const map: Record<string, string> = { proforma: 'Proforma', invoice: 'Final invoice', pod: 'Proof of Delivery' }
  return map[type] || type
}
</script>

<style scoped>
.factoring {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.factoring__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
}

.factoring__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.factoring__subtitle {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin: var(--space-1) 0 0;
}

/* Action cards */
.factoring__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.factoring__action-card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.factoring__action-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.factoring__action-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.factoring__action-content {
  flex: 1;
}

.factoring__action-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 var(--space-1);
}

.factoring__action-desc {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin: 0;
  line-height: 1.4;
}

.factoring__action-arrow {
  font-size: 1.25rem;
  color: var(--neutral-500);
  flex-shrink: 0;
}

.factoring__view-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--success);
  cursor: pointer;
}
.factoring__view-link:hover {
  text-decoration: underline;
}

/* Drawer */
.factoring__drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: var(--z-modal-backdrop);
  display: flex;
  justify-content: flex-end;
}

.factoring__drawer {
  width: 420px;
  max-width: 90vw;
  background: var(--white);
  height: 100%;
  overflow-y: auto;
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  box-shadow: var(--shadow-lg);
}

.factoring__drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.factoring__drawer-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.factoring__drawer-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--neutral-700);
  cursor: pointer;
  padding: var(--space-1);
}

.factoring__drawer-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.factoring__drawer-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.factoring__drawer-label {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-700);
}

.factoring__drawer-credit {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--success);
}

.factoring__drawer-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.factoring__drawer-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.factoring__drawer-field:last-child {
  border-bottom: none;
}

.factoring__drawer-field-label {
  font-size: var(--text-sm);
  color: var(--neutral-700);
}

.factoring__drawer-field-value {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
}

.factoring__drawer-actions {
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
}

.factoring__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.factoring__stat {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.factoring__stat-label {
  font-size: var(--text-xs);
  color: var(--neutral-700);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-1);
}

.factoring__stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.factoring__stat-value--warning {
  color: var(--warning);
}

/* Tabs */
.factoring__tabs {
  display: flex;
  gap: 0;
  border-bottom: 2px solid var(--color-border-light);
}

.factoring__tab {
  padding: var(--space-3) var(--space-5);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  font-family: var(--font-family);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--neutral-700);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: color 0.15s, border-color 0.15s;
}

.factoring__tab:hover {
  color: var(--primary);
}

.factoring__tab--active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.factoring__tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: var(--neutral-100);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--neutral-700);
}

.factoring__tab--active .factoring__tab-count {
  background: var(--primary);
  color: var(--white);
}

/* Panel */
.factoring__panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.factoring__panel-header {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
}

/* Documents tab */
.factoring__docs-intro {
  margin-bottom: var(--space-2);
}

.factoring__docs-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 var(--space-1);
}

.factoring__docs-desc {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin: 0;
}

.factoring__docs-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.factoring__docs-section-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--neutral-900);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.factoring__docs-card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.factoring__docs-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.factoring__docs-file {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  border-top: 1px solid var(--color-border-light);
}
</style>
