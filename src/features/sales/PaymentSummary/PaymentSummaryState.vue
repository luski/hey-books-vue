<script lang="ts" setup>
import ErrorView from '@/components/ErrorView.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import PaymentSummaryView from './PaymentSummaryView.vue';
import type { PaymentSummary } from '@/domain/types';

interface Props {
  isLoading: boolean;
  paymentSummary?: PaymentSummary;
  error: Error | null;
}

const { isLoading, paymentSummary, error } = defineProps<Props>();
</script>

<template>
  <div class="px-6 py-6">
    <LoadingSpinner v-if="isLoading" />
    <PaymentSummaryView v-if="paymentSummary" :payment-summary="paymentSummary" />
    <ErrorView v-if="error">The payment summary cannot be fetched</ErrorView>
  </div>
</template>
