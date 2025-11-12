<script setup lang="ts">
import { usePaymentSummary } from '../composables/usePaymentSummary';
import PaymentSummaryView from './PaymentSummaryView.vue';
import StateWrapper from '../StateWrapper.vue';

const { paymentSummary, isLoading, error } = usePaymentSummary();
</script>

<template>
  <StateWrapper :is-loading="isLoading" :error="error" :resource="paymentSummary">
    <template #default="{ resource }">
      <PaymentSummaryView :payment-summary="resource" />
    </template>
    <template #error> The payment summary cannot be fetched </template>
  </StateWrapper>
</template>
