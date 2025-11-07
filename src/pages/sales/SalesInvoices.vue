<script setup lang="ts">
import type { PaymentSummary } from '@/domain/types';
import PaymentPanel from '@/features/sales/PaymentsPanel.vue';

const paymentSummary: PaymentSummary = {
  overduePayments: 1500,
  dueSoonPayments: 3000,
};
</script>

<template>
  <div class="py-6"><PaymentPanel :payment-summary="paymentSummary" /></div>
</template>
