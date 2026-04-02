<template>
  <div class="new-customer">
    <!-- Breadcrumb -->
    <div class="new-customer__breadcrumb">
      <span class="new-customer__breadcrumb-link" @click="$router.push('/orders')">Orders</span>
      <span class="new-customer__breadcrumb-sep">›</span>
      <span class="new-customer__breadcrumb-link" @click="$router.push('/factoring')">Factoring</span>
      <span class="new-customer__breadcrumb-sep">›</span>
      <span class="new-customer__breadcrumb-current">Verify customer</span>
    </div>

    <!-- STATE: Form (idle) -->
    <template v-if="eligibilityStatus === 'idle'">
      <div class="new-customer__card">
        <h3 class="new-customer__card-title">Verify your customer</h3>
        <p class="new-customer__card-desc">
          Upload a proforma or add customer details manually to check their eligibility with Aria.
        </p>

        <div v-if="!proformaUploaded" class="new-customer__dropzone" @click="onUpload">
          <div class="new-customer__dropzone-icon">📄</div>
          <div class="new-customer__dropzone-text"><strong>Drop your file here or click to browse</strong></div>
          <div class="new-customer__dropzone-hint">Upload a proforma or purchase order to auto-fill · PDF, PNG, JPG · max 20 MB</div>
        </div>

        <div v-if="proformaUploaded" class="new-customer__uploaded-file">
          <span style="font-size: 1.5rem;">📄</span>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: var(--text-sm);">proforma_boutique_lumiere.pdf</div>
            <div style="font-size: var(--text-xs); color: var(--neutral-700);">Proforma · 324 KB</div>
          </div>
          <AkButton outlined @click="onReset">Replace</AkButton>
        </div>
      </div>

      <!-- Customer details form (always shown, pre-filled if uploaded) -->
      <div class="new-customer__card">
        <div class="new-customer__form-header">
          <h4 class="new-customer__form-title">Customer details</h4>
          <span v-if="proformaUploaded" class="new-customer__auto-badge">PRE-FILLED FROM DOCUMENT</span>
        </div>

        <div class="new-customer__form-grid">
          <AkInput v-model="form.buyerName" label="Business name" placeholder="Enter business name..." required />
          <AkInput v-model="form.siren" label="SIREN / Business ID" placeholder="e.g. 456 789 012" required />
        </div>
        <div class="new-customer__form-grid">
          <AkInput v-model="form.address" label="Address" placeholder="Enter full address..." required />
          <AkInput v-model="form.vat" label="VAT number (optional)" placeholder="e.g. FR12456789012" />
        </div>
        <div class="new-customer__form-grid">
          <AkInput v-model="form.contactName" label="Contact name" placeholder="Enter contact name..." required />
          <AkInput v-model="form.contactEmail" label="Contact email" type="email" placeholder="Enter contact email..." required />
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="new-customer__bottom">
        <div class="new-customer__bottom-step">Add customer &amp; check eligibility</div>
        <div class="new-customer__bottom-actions">
          <AkButton outlined @click="$router.push('/factoring')">Cancel</AkButton>
          <AkButton color="primary" :disabled="!formComplete" @click="onCheckEligibility">
            Check eligibility →
          </AkButton>
        </div>
      </div>
    </template>

    <!-- STATE: Checking -->
    <template v-if="eligibilityStatus === 'checking'">
      <div class="new-customer__card new-customer__checking">
        <div class="new-customer__checking-icon">⏳</div>
        <h3 class="new-customer__card-title" style="text-align: center;">Verifying customer eligibility</h3>
        <p class="new-customer__card-desc" style="text-align: center;">
          Aria is checking the eligibility of <strong>{{ form.buyerName }}</strong> (SIREN: {{ form.siren }}).<br>
          This usually takes a few minutes but can take up to 24 hours.
        </p>

        <div class="new-customer__checking-progress">
          <div class="new-customer__checking-bar">
            <div class="new-customer__checking-fill" />
          </div>
        </div>

        <div class="new-customer__checking-steps">
          <div class="new-customer__checking-step new-customer__checking-step--done">
            <span>✅</span> Customer details submitted
          </div>
          <div class="new-customer__checking-step new-customer__checking-step--active">
            <span class="new-customer__spinner">◌</span> Eligibility verification in progress
          </div>
        </div>

        <AkAlert type="info" title="You can leave this page">
          We'll notify you by email once the verification is complete. You can check the status anytime from the <strong>Customers</strong> tab.
        </AkAlert>

        <div class="new-customer__checking-actions">
          <AkButton outlined @click="$router.push('/factoring')">Back to Factoring</AkButton>
          <AkButton color="primary" @click="simulateEligible">Simulate: Aria confirms eligible</AkButton>
        </div>
      </div>
    </template>

    <!-- STATE: Eligible -->
    <template v-if="eligibilityStatus === 'eligible'">
      <div class="new-customer__card">
        <div style="text-align: center; font-size: 2.5rem;">✅</div>
        <h3 class="new-customer__card-title" style="text-align: center;">Customer is eligible</h3>
        <p class="new-customer__card-desc" style="text-align: center;">
          <strong>{{ form.buyerName }}</strong> has been verified and is eligible for factoring with Aria.
        </p>

        <div class="new-customer__eligible-summary">
          <div class="new-customer__eligible-row">
            <span class="new-customer__eligible-label">Business name</span>
            <span class="new-customer__eligible-value">{{ form.buyerName }}</span>
          </div>
          <div class="new-customer__eligible-row">
            <span class="new-customer__eligible-label">SIREN</span>
            <span class="new-customer__eligible-value">{{ form.siren }}</span>
          </div>
          <div class="new-customer__eligible-row">
            <span class="new-customer__eligible-label">Address</span>
            <span class="new-customer__eligible-value">{{ form.address }}</span>
          </div>
          <div class="new-customer__eligible-row">
            <span class="new-customer__eligible-label">Contact</span>
            <span class="new-customer__eligible-value">{{ form.contactName }} · {{ form.contactEmail }}</span>
          </div>
          <div class="new-customer__eligible-row">
            <span class="new-customer__eligible-label">Available credit with Aria</span>
            <span class="new-customer__eligible-value" style="color: var(--success); font-size: 1.125rem;">&euro;25,000</span>
          </div>
          <div class="new-customer__eligible-row">
            <span class="new-customer__eligible-label">Status</span>
            <AkBadge content="Eligible" color="green" size="sm" />
          </div>
        </div>

        <AkAlert type="success" title="Customer added successfully">
          You can now create financing requests for this customer from the Finance requests tab.
        </AkAlert>
      </div>

      <div class="new-customer__bottom">
        <div class="new-customer__bottom-step">Customer verified</div>
        <div class="new-customer__bottom-actions">
          <AkButton outlined @click="$router.push('/factoring')">Back to Factoring</AkButton>
          <AkButton color="primary" @click="$router.push('/factoring/new/review')">
            Create financing request →
          </AkButton>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFactoringState } from '@/composables/useFactoringState'

const router = useRouter()
const { proformaUploaded, simulateUploadProforma, eligibilityStatus, startEligibilityCheck, simulateEligible } = useFactoringState()

const form = reactive({
  buyerName: '',
  siren: '',
  address: '',
  vat: '',
  contactName: '',
  contactEmail: '',
})

const formComplete = computed(() =>
  !!(form.buyerName && form.siren && form.address && form.contactName && form.contactEmail)
)

function onUpload() {
  simulateUploadProforma()
  // Pre-fill form from "extracted" data
  form.buyerName = 'Boutique Lumière'
  form.siren = '456 789 012'
  form.address = '12 Rue du Faubourg, 75001 Paris'
  form.vat = 'FR12456789012'
  form.contactName = 'Marie Dupont'
  form.contactEmail = 'marie@example.com'
}

function onReset() {
  proformaUploaded.value = false
  form.buyerName = ''
  form.siren = ''
  form.address = ''
  form.vat = ''
  form.contactName = ''
  form.contactEmail = ''
}

function onCheckEligibility() {
  startEligibilityCheck()
}
</script>

<style scoped>
.new-customer {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding-bottom: 100px;
}

.new-customer__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--neutral-700);
}
.new-customer__breadcrumb-link { cursor: pointer; color: var(--neutral-700); }
.new-customer__breadcrumb-link:hover { color: var(--primary); }
.new-customer__breadcrumb-sep { color: var(--neutral-500); }
.new-customer__breadcrumb-current { font-weight: 600; color: var(--primary); }

.new-customer__card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.new-customer__card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.new-customer__card-desc {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin: 0;
  line-height: 1.5;
}

/* Method tabs */
.new-customer__method-tabs {
  display: flex;
  gap: 0;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.new-customer__method-tab {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  background: var(--neutral-100);
  border: none;
  font-family: var(--font-family);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--neutral-700);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.new-customer__method-tab:first-child {
  border-right: 1px solid var(--color-border-light);
}

.new-customer__method-tab--active {
  background: var(--white);
  color: var(--primary);
}

.new-customer__method-tab:hover:not(.new-customer__method-tab--active) {
  background: var(--white);
}

/* Dropzone */
.new-customer__dropzone {
  border: 2px dashed var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-6) var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  transition: border-color 0.15s;
}
.new-customer__dropzone:hover { border-color: var(--primary); }
.new-customer__dropzone-icon { font-size: 2rem; }
.new-customer__dropzone-text { font-size: var(--text-sm); color: var(--primary); }
.new-customer__dropzone-hint { font-size: var(--text-xs); color: var(--neutral-700); }

.new-customer__uploaded-file {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--neutral-100);
  border-radius: var(--radius-md);
}

/* Form */
.new-customer__form-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.new-customer__form-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.new-customer__form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.new-customer__auto-badge {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: 3px;
  background: var(--info-700);
  color: var(--white);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* Bottom bar */
.new-customer__bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--white);
  border-top: 1px solid var(--color-border-light);
  padding: var(--space-4) var(--space-5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: var(--z-sticky);
}

.new-customer__bottom-step {
  font-size: var(--text-sm);
  color: var(--neutral-700);
}

.new-customer__bottom-actions {
  display: flex;
  gap: var(--space-3);
}

/* Checking state */
.new-customer__checking {
  align-items: center;
  padding: var(--space-8) var(--space-5);
}

.new-customer__checking-icon { font-size: 3rem; }

.new-customer__checking-progress {
  width: 100%;
  max-width: 400px;
}

.new-customer__checking-bar {
  height: 6px;
  background: var(--neutral-100);
  border-radius: 3px;
  overflow: hidden;
}

.new-customer__checking-fill {
  height: 100%;
  width: 65%;
  background: var(--success);
  border-radius: 3px;
  animation: checking-pulse 2s ease-in-out infinite;
}

@keyframes checking-pulse {
  0%, 100% { width: 45%; }
  50% { width: 75%; }
}

.new-customer__checking-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  max-width: 400px;
}

.new-customer__checking-step {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--neutral-700);
}

.new-customer__checking-step--done { color: var(--primary); }
.new-customer__checking-step--active { color: var(--warning); font-weight: 600; }

.new-customer__spinner {
  display: inline-block;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.new-customer__checking-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

/* Eligible state */
.new-customer__eligible-summary {
  width: 100%;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.new-customer__eligible-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
}

.new-customer__eligible-row:last-child { border-bottom: none; }

.new-customer__eligible-label {
  font-size: var(--text-sm);
  color: var(--neutral-700);
}

.new-customer__eligible-value {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
}
</style>
