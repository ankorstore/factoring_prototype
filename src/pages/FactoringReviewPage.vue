<template>
  <div class="financing-page">
    <!-- Breadcrumb -->
    <div class="financing-page__breadcrumb">
      <span class="financing-page__breadcrumb-link" @click="$router.push('/orders')">Orders</span>
      <span class="financing-page__breadcrumb-sep">›</span>
      <span class="financing-page__breadcrumb-link" @click="$router.push('/factoring')">Factoring</span>
      <span class="financing-page__breadcrumb-sep">›</span>
      <span class="financing-page__breadcrumb-current">New financing request</span>
    </div>

    <!-- Stepper -->
    <div class="financing-page__stepper">
      <AkSteps :steps="wizardSteps" :currentStep="currentWizardStep" />
    </div>

    <!-- STEP 1: Create quote -->
    <template v-if="currentWizardStep === 0">
      <!-- Customer summary -->
      <div class="financing-page__card">
        <div class="financing-page__buyer-header">
          <div>
            <div class="financing-page__overline">CUSTOMER</div>
            <h3 class="financing-page__buyer-name">Boutique Lumière</h3>
            <div class="financing-page__buyer-meta">SIREN 456 789 012 · Paris</div>
          </div>
          <AkBadge content="✓ Eligible" color="green" size="sm" />
        </div>
      </div>

      <!-- Order / Quote form -->
      <div class="financing-page__card">
        <h4 class="financing-page__card-title">Create a quote</h4>
        <p class="financing-page__card-desc">Enter the order details for this financing request.</p>

        <div class="financing-page__form-grid">
          <AkInput v-model="quote.orderValue" label="Order value (€)" required placeholder="e.g. 6200" />
          <AkSelect v-model="quote.currency" :options="currencyOptions" label="Currency" />
        </div>
        <AkInput v-model="quote.description" label="Products / description" placeholder="Describe the products or services..." />
        <div class="financing-page__form-grid">
          <AkInput v-model="quote.invoiceRef" label="Invoice / proforma reference" placeholder="e.g. INV-2026-0044" />
          <AkInput v-model="quote.deliveryDate" label="Expected delivery date" placeholder="e.g. 15 Apr 2026" />
        </div>
      </div>

      <!-- Fee preview -->
      <div v-if="quote.orderValue" class="financing-page__card">
        <div class="financing-page__overline">FINANCING PREVIEW</div>
        <div class="financing-page__summary-row">
          <div class="financing-page__summary-item">
            <div class="financing-page__summary-label">ORDER VALUE</div>
            <div class="financing-page__summary-value">&euro;{{ parsedOrderValue.toLocaleString() }}</div>
          </div>
          <div class="financing-page__summary-item">
            <div class="financing-page__summary-label">FACTORING FEE (3%)</div>
            <div class="financing-page__summary-value" style="color: var(--neutral-700);">&minus;&euro;{{ factoringFee.toLocaleString() }}</div>
          </div>
          <div class="financing-page__summary-item">
            <div class="financing-page__summary-label">YOU RECEIVE</div>
            <div class="financing-page__summary-value" style="color: var(--success); font-weight: 700;">&euro;{{ youReceive.toLocaleString() }}</div>
          </div>
        </div>
      </div>

      <div class="financing-page__bottom">
        <div class="financing-page__bottom-step">Step 1 of 3 · Create quote</div>
        <div class="financing-page__bottom-actions">
          <AkButton outlined @click="$router.push('/factoring')">Cancel</AkButton>
          <AkButton color="primary" :disabled="!quote.orderValue" @click="currentWizardStep = 1">
            Continue →
          </AkButton>
        </div>
      </div>
    </template>

    <!-- STEP 2: Upload invoice -->
    <template v-if="currentWizardStep === 1">
      <div class="financing-page__card">
        <div class="financing-page__iban-header">
          <span>📁</span>
          <strong>Add these to your invoice before uploading</strong>
        </div>
        <p class="financing-page__card-desc">Your final invoice must include Aria's IBAN as the payment account, and a legal assignment notification.</p>

        <div class="financing-page__iban-grid">
          <div class="financing-page__iban-box">
            <div class="financing-page__iban-label">ARIA'S IBAN (PAYMENT ACCOUNT)</div>
            <div class="financing-page__iban-value">{{ ariaIban }}</div>
            <div class="financing-page__iban-bic">BIC: {{ ariaBic }}</div>
            <AkButton outlined @click="copyIban">{{ ibanCopied ? 'Copied!' : 'Copy IBAN' }}</AkButton>
          </div>
          <div class="financing-page__iban-box">
            <div class="financing-page__iban-label">ASSIGNMENT NOTIFICATION (LEGAL TEXT)</div>
            <div class="financing-page__iban-legal">"{{ assignmentText }}"</div>
            <AkButton outlined @click="copyText">{{ textCopied ? 'Copied!' : 'Copy text' }}</AkButton>
          </div>
        </div>
      </div>

      <div class="financing-page__card">
        <h4 class="financing-page__card-title">Upload your final invoice</h4>
        <p class="financing-page__card-desc">Upload the invoice with Aria's IBAN and the assignment notification included.</p>

        <div v-if="!invoiceUploaded" class="financing-page__dropzone" @click="simulateUploadInvoice">
          <div class="financing-page__dropzone-icon">📄</div>
          <div class="financing-page__dropzone-text"><strong>Drop your file here or click to browse</strong></div>
          <div class="financing-page__dropzone-hint">Final invoice · PDF, PNG, JPG · max 20 MB</div>
        </div>

        <div v-if="invoiceUploaded" class="financing-page__uploaded-file">
          <span style="font-size: 1.5rem;">📄</span>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: var(--text-sm);">invoice_boutique_lumiere_4044.pdf</div>
            <div style="font-size: var(--text-xs); color: var(--neutral-700);">Final invoice · 245 KB</div>
          </div>
          <AkButton outlined @click="invoiceUploaded = false">Replace</AkButton>
        </div>

        <AkAlert v-if="invoiceUploaded" type="success" title="Invoice uploaded successfully">
          Your invoice has been validated and is ready to submit.
        </AkAlert>
      </div>

      <div class="financing-page__bottom">
        <div class="financing-page__bottom-step">Step 2 of 3 · Upload invoice</div>
        <div class="financing-page__bottom-actions">
          <AkButton outlined @click="currentWizardStep = 0">← Back</AkButton>
          <AkButton color="primary" :disabled="!invoiceUploaded" @click="currentWizardStep = 2">
            Continue →
          </AkButton>
        </div>
      </div>
    </template>

    <!-- STEP 3: Review & submit -->
    <template v-if="currentWizardStep === 2">
      <div class="financing-page__card">
        <h4 class="financing-page__card-title">Review your financing request</h4>
        <p class="financing-page__card-desc">Please confirm all details before submitting to Aria.</p>

        <div class="financing-page__review-section">
          <div class="financing-page__overline">BUYER</div>
          <div class="financing-page__review-row">
            <span>Boutique Lumière</span>
            <AkBadge content="Eligible" color="green" size="sm" />
          </div>
          <div class="financing-page__review-detail">SIREN 456 789 012 · 12 Rue du Faubourg, 75001 Paris</div>
        </div>

        <div class="financing-page__review-section">
          <div class="financing-page__overline">ORDER</div>
          <div class="financing-page__review-grid">
            <div>
              <div class="financing-page__review-label">Value</div>
              <div class="financing-page__review-value">&euro;{{ parsedOrderValue.toLocaleString() }}</div>
            </div>
            <div>
              <div class="financing-page__review-label">Reference</div>
              <div class="financing-page__review-value">{{ quote.invoiceRef || '—' }}</div>
            </div>
            <div>
              <div class="financing-page__review-label">You receive</div>
              <div class="financing-page__review-value" style="color: var(--success); font-weight: 700;">&euro;{{ youReceive.toLocaleString() }}</div>
            </div>
            <div>
              <div class="financing-page__review-label">Fee</div>
              <div class="financing-page__review-value">3% (&euro;{{ factoringFee.toLocaleString() }})</div>
            </div>
          </div>
        </div>

        <div class="financing-page__review-section">
          <div class="financing-page__overline">DOCUMENTS</div>
          <div class="financing-page__review-doc">
            <span>📄</span>
            <span>invoice_boutique_lumiere_4044.pdf</span>
            <span style="font-size: var(--text-xs); color: var(--neutral-700);">245 KB</span>
          </div>
        </div>
      </div>

      <div class="financing-page__bottom">
        <div class="financing-page__bottom-step">Step 3 of 3 · Review &amp; submit</div>
        <div class="financing-page__bottom-actions">
          <AkButton outlined @click="currentWizardStep = 1">← Back</AkButton>
          <AkButton outlined @click="$router.push('/factoring')">Save &amp; finish later</AkButton>
          <AkButton color="primary" @click="onSubmit">
            Submit financing request →
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
import factoringData from '@/data/factoring.json'

const router = useRouter()
const { invoiceUploaded, simulateUploadInvoice, submitRequest } = useFactoringState()

const ariaIban = factoringData.ariaIban
const ariaBic = factoringData.ariaBic
const assignmentText = factoringData.assignmentText

const currentWizardStep = ref(0)
const ibanCopied = ref(false)
const textCopied = ref(false)

const quote = reactive({
  orderValue: '6200',
  currency: 'EUR',
  description: 'Organic candles (x24), Scented diffusers (x12)',
  invoiceRef: 'INV-2026-0044',
  deliveryDate: '15 Apr 2026',
})

const currencyOptions = [
  { label: 'EUR (€)', value: 'EUR' },
  { label: 'GBP (£)', value: 'GBP' },
]

const wizardSteps = computed(() => [
  { title: 'Create quote', completed: currentWizardStep.value > 0 },
  { title: 'Upload invoice', completed: currentWizardStep.value > 1, disabled: currentWizardStep.value < 1 },
  { title: 'Review & submit', disabled: currentWizardStep.value < 2 },
])

const parsedOrderValue = computed(() => {
  const n = parseFloat(String(quote.orderValue).replace(/,/g, ''))
  return isNaN(n) ? 0 : n
})

const factoringFee = computed(() => Math.round(parsedOrderValue.value * 0.03))
const youReceive = computed(() => parsedOrderValue.value - factoringFee.value)

async function copyIban() {
  try {
    await navigator.clipboard.writeText(ariaIban)
    ibanCopied.value = true
    setTimeout(() => { ibanCopied.value = false }, 2000)
  } catch { /* fallback */ }
}

async function copyText() {
  try {
    await navigator.clipboard.writeText(assignmentText)
    textCopied.value = true
    setTimeout(() => { textCopied.value = false }, 2000)
  } catch { /* fallback */ }
}

function onSubmit() {
  submitRequest()
  router.push('/factoring/request/FACT-2026-0044')
}
</script>

<style scoped>
.financing-page {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding-bottom: 100px;
}

.financing-page__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--neutral-700);
}
.financing-page__breadcrumb-link { cursor: pointer; color: var(--neutral-700); }
.financing-page__breadcrumb-link:hover { color: var(--primary); }
.financing-page__breadcrumb-sep { color: var(--neutral-500); }
.financing-page__breadcrumb-current { font-weight: 600; color: var(--primary); }

.financing-page__stepper {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}

.financing-page__card {
  background: var(--white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.financing-page__card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.financing-page__card-desc {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin: 0;
}

.financing-page__overline {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-700);
  margin-bottom: var(--space-1);
}

.financing-page__buyer-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.financing-page__buyer-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0;
}

.financing-page__buyer-meta {
  font-size: var(--text-sm);
  color: var(--neutral-700);
  margin-top: var(--space-1);
}

.financing-page__form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.financing-page__summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-4);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.financing-page__summary-label {
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--neutral-700);
  letter-spacing: 0.05em;
  margin-bottom: var(--space-1);
}

.financing-page__summary-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

/* IBAN section */
.financing-page__iban-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--primary);
}

.financing-page__iban-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.financing-page__iban-box {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.financing-page__iban-label {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--neutral-700);
  font-weight: 600;
}

.financing-page__iban-value {
  font-family: monospace;
  font-size: var(--text-sm);
  color: var(--primary);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.financing-page__iban-bic {
  font-size: var(--text-xs);
  color: var(--neutral-700);
}

.financing-page__iban-legal {
  font-size: var(--text-sm);
  color: var(--primary);
  font-style: italic;
  line-height: 1.5;
}

/* Upload */
.financing-page__dropzone {
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
.financing-page__dropzone:hover { border-color: var(--primary); }
.financing-page__dropzone-icon { font-size: 2rem; }
.financing-page__dropzone-text { font-size: var(--text-sm); color: var(--primary); }
.financing-page__dropzone-hint { font-size: var(--text-xs); color: var(--neutral-700); }

.financing-page__uploaded-file {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--neutral-100);
  border-radius: var(--radius-md);
}

/* Review step */
.financing-page__review-section {
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: var(--space-4);
}
.financing-page__review-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.financing-page__review-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
}

.financing-page__review-detail {
  font-size: var(--text-xs);
  color: var(--neutral-700);
  margin-top: var(--space-1);
}

.financing-page__review-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.financing-page__review-label {
  font-size: var(--text-xs);
  color: var(--neutral-700);
  margin-bottom: 2px;
}

.financing-page__review-value {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
}

.financing-page__review-doc {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--primary);
}

/* Bottom bar */
.financing-page__bottom {
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

.financing-page__bottom-step {
  font-size: var(--text-sm);
  color: var(--neutral-700);
}

.financing-page__bottom-actions {
  display: flex;
  gap: var(--space-3);
}

.financing-page__summary-item {
  display: flex;
  flex-direction: column;
}
</style>
