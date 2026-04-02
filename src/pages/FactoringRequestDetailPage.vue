<template>
  <div class="detail-page">
    <!-- Breadcrumb -->
    <div class="detail-page__breadcrumb">
      <span class="detail-page__breadcrumb-link" @click="$router.push('/orders')">Orders</span>
      <span class="detail-page__breadcrumb-sep">›</span>
      <span class="detail-page__breadcrumb-current">{{ request.reference }}</span>
    </div>

    <!-- Header -->
    <div class="detail-page__header">
      <div>
        <div class="detail-page__overline">LOAN REQUEST</div>
        <h2 class="detail-page__title">{{ request.buyer.name }}</h2>
        <div class="detail-page__meta">
          <span :class="statusClass">{{ statusIcon }} {{ statusLabel }}</span>
          · Ref: {{ request.reference }}
          · {{ currentDate }}
          · {{ statusMeta }}
        </div>
      </div>
      <AkBadge :content="statusBadgeLabel" :color="statusBadgeColor" size="md" />
    </div>

    <div class="detail-page__layout">
      <!-- Main column -->
      <div class="detail-page__main">
        <!-- Status alert -->
        <AkAlert v-if="requestStatus === 'in-review'" type="warning" title="Aria is reviewing your request">
          You'll be notified by email once the review is complete.
        </AkAlert>
        <AkAlert v-else-if="requestStatus === 'approved'" type="success" title="Aria approved this loan request">
          Ship the order and upload your Proof of Delivery. Once confirmed, &euro;{{ request.youReceive.toLocaleString() }} will be sent to your account within 24h.
        </AkAlert>
        <AkAlert v-else-if="requestStatus === 'funded'" type="success" title="Payment released!">
          &euro;{{ request.youReceive.toLocaleString() }} has been sent to your account. You should receive it within 24 hours.
        </AkAlert>

        <!-- Financial summary -->
        <div class="detail-page__finance-row">
          <div class="detail-page__finance-card">
            <div class="detail-page__finance-label">ORDER VALUE</div>
            <div class="detail-page__finance-value">&euro;{{ request.orderValue.toLocaleString() }}</div>
          </div>
          <div class="detail-page__finance-card">
            <div class="detail-page__finance-label">YOU RECEIVE (AFTER 3%)</div>
            <div class="detail-page__finance-value detail-page__finance-value--green">&euro;{{ request.youReceive.toLocaleString() }}</div>
            <div v-if="requestStatus === 'approved'" class="detail-page__finance-note">Released on delivery confirmation</div>
          </div>
        </div>

        <!-- PoD upload (approved state) -->
        <div v-if="requestStatus === 'approved'" class="detail-page__card">
          <div class="detail-page__card-header">
            <span>📦</span>
            <strong>UPLOAD PROOF OF DELIVERY</strong>
          </div>
          <p class="detail-page__card-desc">Upload your signed delivery note or carrier confirmation to release the payment.</p>

          <div v-if="!podUploaded" class="detail-page__dropzone" @click="simulateUploadPod">
            <div class="detail-page__dropzone-icon">📦</div>
            <div class="detail-page__dropzone-text"><strong>Click to upload Proof of Delivery</strong></div>
            <div class="detail-page__dropzone-hint">PDF, JPG, or PNG · Max 10 MB</div>
          </div>

          <div v-if="podUploaded" class="detail-page__uploaded-file">
            <span style="font-size: 1.5rem;">📦</span>
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: var(--text-sm);">pod_boutique_lumiere.pdf</div>
              <div style="font-size: var(--text-xs); color: var(--neutral-700);">Proof of Delivery · 189 KB</div>
            </div>
            <AkButton outlined size="md" @click="podUploaded = false">Replace</AkButton>
          </div>

          <AkButton
            color="primary"
            :disabled="!podUploaded"
            @click="onConfirmDelivery"
            style="width: 100%; padding: var(--space-4);"
          >
            Confirm delivery &amp; release &euro;{{ request.youReceive.toLocaleString() }} →
          </AkButton>
          <p class="detail-page__confirm-note">This action is irreversible. Payment will be sent within 24h.</p>
        </div>

        <!-- Submitted documents -->
        <div class="detail-page__card">
          <div class="detail-page__overline">SUBMITTED DOCUMENTS</div>
          <div v-for="doc in request.documents" :key="doc.name" class="detail-page__doc-row">
            <span style="font-size: 1.25rem;">📄</span>
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: var(--text-sm);">{{ doc.name }}</div>
              <div style="font-size: var(--text-xs); color: var(--neutral-700);">{{ docTypeLabel(doc.type) }} · {{ doc.size }}</div>
            </div>
            <span class="detail-page__doc-view">View</span>
          </div>
        </div>

        <!-- Customer details -->
        <div class="detail-page__card">
          <div class="detail-page__overline">CUSTOMER DETAILS</div>
          <table class="detail-page__details-table">
            <tr>
              <td class="detail-page__details-label">Company</td>
              <td class="detail-page__details-value">{{ request.buyer.name }}</td>
            </tr>
            <tr>
              <td class="detail-page__details-label">SIREN</td>
              <td class="detail-page__details-value">{{ request.buyer.siren }}</td>
            </tr>
            <tr>
              <td class="detail-page__details-label">Address</td>
              <td class="detail-page__details-value">{{ request.buyer.address }}</td>
            </tr>
            <tr>
              <td class="detail-page__details-label">Contact</td>
              <td class="detail-page__details-value">{{ request.buyer.contactName }} · {{ request.buyer.contactEmail }}</td>
            </tr>
          </table>
        </div>

        <!-- Simulate buttons (in-review only) -->
        <div v-if="requestStatus === 'in-review'" class="detail-page__simulate">
          <AkButton color="primary" @click="simulateApproval">Simulate: Aria approves →</AkButton>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="detail-page__sidebar">
        <FactoringTimeline :title="timelineTitle" :steps="timelineSteps" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFactoringState } from '@/composables/useFactoringState'
import FactoringTimeline from '@/components/FactoringTimeline.vue'
import factoringData from '@/data/factoring.json'
import type { FactoringLoanRequest } from '@/data/types'

const {
  requestStatus,
  podUploaded,
  simulateUploadPod,
  simulateApproval,
  confirmDelivery,
} = useFactoringState()

const request = factoringData.submittedRequests[0] as unknown as FactoringLoanRequest

const currentDate = '2 Mar 2026'

const statusIcon = computed(() => {
  const map: Record<string, string> = { 'in-review': '●', approved: '✓', funded: '✓' }
  return map[requestStatus.value] || '●'
})

const statusLabel = computed(() => {
  const map: Record<string, string> = { 'in-review': 'Submitted', approved: 'Approved', funded: 'Funded' }
  return map[requestStatus.value] || requestStatus.value
})

const statusClass = computed(() => `detail-page__status--${requestStatus.value}`)

const statusMeta = computed(() => {
  const map: Record<string, string> = {
    'in-review': 'Invoice under review · decision expected within 1 business day',
    approved: 'Ship the order and upload your Proof of Delivery to release payment',
    funded: 'Payment released to your account',
  }
  return map[requestStatus.value] || ''
})

const statusBadgeLabel = computed(() => {
  const map: Record<string, string> = { 'in-review': '● In Review', approved: '✓ Approved', funded: '✓ Funded' }
  return map[requestStatus.value] || requestStatus.value
})

const statusBadgeColor = computed(() => {
  const map: Record<string, string> = { 'in-review': 'orange', approved: 'green', funded: 'green' }
  return map[requestStatus.value] || 'grey'
})

const timelineTitle = computed(() =>
  requestStatus.value === 'in-review' ? 'What happens next?' : 'What happens next?'
)

const timelineSteps = computed(() => {
  if (requestStatus.value === 'funded') {
    return [
      { label: 'Invoice submitted', detail: '2 Mar 2026', status: 'completed' as const },
      { label: 'Aria approved', detail: '3 Mar 2026', status: 'completed' as const },
      { label: 'Ship & upload PoD', detail: 'Completed', status: 'completed' as const },
      { label: `€${request.youReceive.toLocaleString()} to your account`, detail: 'Within 24h of delivery', status: 'active' as const },
    ]
  }
  if (requestStatus.value === 'approved') {
    return [
      { label: 'Invoice submitted', detail: '2 Mar 2026', status: 'completed' as const },
      { label: 'Aria approved', detail: '3 Mar 2026', status: 'completed' as const },
      { label: 'Ship & upload PoD', detail: 'Upload delivery confirmation above', status: 'active' as const },
      { label: `€${request.youReceive.toLocaleString()} to your account`, detail: 'Within 24h of delivery', status: 'upcoming' as const },
    ]
  }
  return [
    { label: 'Invoice submitted', detail: 'Today, 2 Mar 2026', status: 'completed' as const },
    { label: 'Aria reviews', detail: 'Within 1 business day', status: 'active' as const },
    { label: 'Ship & upload PoD', detail: 'Once approved', status: 'upcoming' as const },
    { label: `€${request.youReceive.toLocaleString()} to your account`, detail: 'Within 24h of delivery', status: 'upcoming' as const },
  ]
})

function docTypeLabel(type: string) {
  const map: Record<string, string> = { proforma: 'Proforma', invoice: 'Final invoice', pod: 'Proof of Delivery' }
  return map[type] || type
}

function onConfirmDelivery() {
  confirmDelivery()
}
</script>

<style scoped>
.detail-page {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.detail-page__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--neutral-700);
}
.detail-page__breadcrumb-link { cursor: pointer; color: var(--neutral-700); }
.detail-page__breadcrumb-link:hover { color: var(--primary); }
.detail-page__breadcrumb-sep { color: var(--neutral-500); }
.detail-page__breadcrumb-current { font-weight: 600; color: var(--primary); }

.detail-page__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.detail-page__overline {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-700);
  margin-bottom: var(--space-1);
}

.detail-page__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.detail-page__meta {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin-top: var(--space-1);
}

.detail-page__status--in-review { color: var(--success); font-weight: 600; }
.detail-page__status--approved { color: var(--success); font-weight: 600; }
.detail-page__status--funded { color: var(--success); font-weight: 600; }

.detail-page__layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--space-5);
  align-items: start;
}

.detail-page__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-page__sidebar {
  position: sticky;
  top: var(--space-5);
}

.detail-page__finance-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.detail-page__finance-card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.detail-page__finance-label {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-700);
  margin-bottom: var(--space-1);
}

.detail-page__finance-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.detail-page__finance-value--green {
  color: var(--success);
}

.detail-page__finance-note {
  font-size: var(--text-xs);
  color: var(--neutral-700);
  margin-top: var(--space-1);
}

.detail-page__card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.detail-page__card-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--primary);
}

.detail-page__card-desc {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin: 0;
}

.detail-page__dropzone {
  border: 2px dashed var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-8) var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  transition: border-color 0.15s;
}
.detail-page__dropzone:hover { border-color: var(--primary); }
.detail-page__dropzone-icon { font-size: 2rem; }
.detail-page__dropzone-text { font-size: var(--text-sm); color: var(--primary); }
.detail-page__dropzone-hint { font-size: var(--text-xs); color: var(--neutral-700); }

.detail-page__uploaded-file {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--neutral-100);
  border-radius: var(--radius-md);
}

.detail-page__confirm-note {
  font-size: var(--text-xs);
  color: var(--neutral-700);
  text-align: center;
  margin: 0;
}

.detail-page__doc-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}
.detail-page__doc-row:last-child {
  border-bottom: none;
}

.detail-page__doc-view {
  font-size: var(--text-sm);
  color: var(--success);
  cursor: pointer;
  font-weight: 600;
}

.detail-page__details-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-page__details-table tr {
  border-bottom: 1px solid var(--color-border-light);
}
.detail-page__details-table tr:last-child {
  border-bottom: none;
}

.detail-page__details-label {
  padding: var(--space-3);
  font-size: var(--text-sm);
  color: var(--neutral-700);
  width: 120px;
}

.detail-page__details-value {
  padding: var(--space-3);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
}

.detail-page__simulate {
  display: flex;
  gap: var(--space-3);
}
</style>
