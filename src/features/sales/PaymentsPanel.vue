<script lang="ts" setup>
import type { PaymentSummary } from '@/domain/types';
import { CircleAlert, Clock } from 'lucide-vue-next';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/shared/formatters/currency';
import { computed } from 'vue';

interface Props {
  paymentSummary: PaymentSummary;
}

const { paymentSummary } = defineProps<Props>();

const overdueFormatted = computed(() => formatCurrency(paymentSummary.overduePayments));
const dueSoonFormatted = computed(() => formatCurrency(paymentSummary.dueSoonPayments));
const ratio = computed(
  () =>
    (paymentSummary.overduePayments /
      (paymentSummary.overduePayments + paymentSummary.dueSoonPayments)) *
    100,
);
</script>

<template>
  <div class="@container container text-sm text-neutral-500 uppercase dark:text-neutral-400">
    <div class="grid items-center gap-4 @min-lg:grid-cols-[auto_1fr_auto]">
      <div class="flex items-center gap-2" data-testid="overdue-payments">
        <CircleAlert class="stroke-red-700 dark:stroke-red-400" />
        <span
          ><span class="mr-2 text-xl">{{ overdueFormatted }}</span>
          <span class="text-xs">overdue</span></span
        >
      </div>
      <div><Progress :model-value="ratio" /></div>

      <div class="flex items-center gap-2" data-testid="due-soon-payments">
        <Clock class="stroke-orange-500 dark:stroke-orange-400" />
        <span
          ><span class="mr-2 text-xs">due soon</span>
          <span class="text-xl">{{ dueSoonFormatted }}</span></span
        >
      </div>
    </div>
  </div>
</template>
