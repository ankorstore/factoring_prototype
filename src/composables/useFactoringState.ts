import { ref } from 'vue'

// Module-level singleton state — shared across all factoring pages
const wizardStep = ref<1 | 2>(1)
const eligibilityStatus = ref<'idle' | 'checking' | 'eligible' | 'ineligible'>('idle')
const proformaUploaded = ref(false)
const invoiceUploaded = ref(false)
const podUploaded = ref(false)
const deliveryConfirmed = ref(false)
const requestStatus = ref<'pending' | 'in-review' | 'approved' | 'funded'>('pending')
const currentRequestId = ref('FACT-2026-0044')

export function useFactoringState() {
  function simulateUploadProforma() {
    proformaUploaded.value = true
  }

  function simulateUploadInvoice() {
    invoiceUploaded.value = true
  }

  function simulateUploadPod() {
    podUploaded.value = true
  }

  function startEligibilityCheck() {
    eligibilityStatus.value = 'checking'
  }

  function simulateEligible() {
    eligibilityStatus.value = 'eligible'
  }

  function submitRequest() {
    requestStatus.value = 'in-review'
  }

  function simulateApproval() {
    requestStatus.value = 'approved'
  }

  function confirmDelivery() {
    deliveryConfirmed.value = true
    requestStatus.value = 'funded'
  }

  function resetWizard() {
    wizardStep.value = 1
    eligibilityStatus.value = 'idle'
    proformaUploaded.value = false
    invoiceUploaded.value = false
    podUploaded.value = false
    deliveryConfirmed.value = false
    requestStatus.value = 'pending'
  }

  return {
    wizardStep,
    eligibilityStatus,
    proformaUploaded,
    invoiceUploaded,
    podUploaded,
    deliveryConfirmed,
    requestStatus,
    currentRequestId,
    startEligibilityCheck,
    simulateEligible,
    simulateUploadProforma,
    simulateUploadInvoice,
    simulateUploadPod,
    submitRequest,
    simulateApproval,
    confirmDelivery,
    resetWizard,
  }
}
