<script setup lang="ts">
import { usePaymentSummary } from '../composables/usePaymentSummary';
import PaymentSummaryState from './PaymentSummaryState.vue';

const { paymentSummary, isLoading, error } = usePaymentSummary();
</script>

<template>
  <PaymentSummaryState :is-loading="isLoading" :payment-summary="paymentSummary" :error="error" />
</template>
