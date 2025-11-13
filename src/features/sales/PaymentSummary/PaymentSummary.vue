<script setup lang="ts">
import { usePaymentSummary } from '../composables/usePaymentSummary';
import PaymentSummaryView from './PaymentSummaryView.vue';
import StateWrapper from '../StateWrapper.vue';
import { computed } from 'vue';

const { paymentSummary, isLoading, error } = usePaymentSummary();

const errorMessage = computed(() => {
  if (error.value) {
    return 'The payment summary cannot be fetched';
  }
  return null;
});
</script>

<template>
  <StateWrapper
    :is-loading="isLoading"
    :error="errorMessage"
    :resource="paymentSummary"
    class="p-6"
  >
    <template #default="{ resource }">
      <PaymentSummaryView :payment-summary="resource" />
    </template>
  </StateWrapper>
</template>
