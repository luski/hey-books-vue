<script lang="ts" setup>
import { computed } from 'vue';
import type { PaymentSummary } from '@/domain/types';
import { CircleAlert, Clock } from 'lucide-vue-next';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/shared/formatters/currency';
import PaymentSummaryLabel from './PaymentSummaryLabel.vue';

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
      <PaymentSummaryLabel data-testid="overdue-payments">
        <template #icon>
          <CircleAlert class="size-6 stroke-red-700 md:size-8 dark:stroke-red-400" />
        </template>
        <template #label>overdue</template>
        <template #value>{{ overdueFormatted }}</template>
      </PaymentSummaryLabel>
      <div><Progress :model-value="ratio" /></div>

      <PaymentSummaryLabel data-testid="due-soon-payments">
        <template #icon>
          <Clock class="size-6 stroke-orange-500 md:size-8 dark:stroke-orange-400" />
        </template>
        <template #label>due soon</template>
        <template #value>{{ dueSoonFormatted }}</template>
      </PaymentSummaryLabel>
    </div>
  </div>
</template>
