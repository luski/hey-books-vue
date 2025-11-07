<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import PaymentPanel from '@/features/sales/PaymentsPanel.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorView from '@/components/ErrorView.vue';
import { queryOptions } from './queries';

const { data: paymentSummary, isLoading, error } = useQuery(queryOptions.invoicePaymentSummary);
</script>

<template>
  <div class="py-6">
    <LoadingSpinner v-if="isLoading" />
    <PaymentPanel v-if="paymentSummary" :payment-summary="paymentSummary" />
    <ErrorView v-if="error">The payment summary cannot be fetched</ErrorView>
  </div>
  <hr class="-mx-6" />
</template>
