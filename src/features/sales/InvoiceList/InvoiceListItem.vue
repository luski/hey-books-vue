<script lang="ts" setup>
import { formatCurrency } from '@/shared/formatters/currency';
import type { Invoice } from '@/domain/types';
import InvoiceOverdueStatusBadge from '../InvoiceOverdueStatusBadge.vue';
import { twMerge } from 'tailwind-merge';

interface Props {
  invoice: Invoice;
  isActive: boolean;
}
const { invoice, isActive } = defineProps<Props>();

const emit = defineEmits<{
  select: [];
}>();
</script>

<template>
  <button
    type="button"
    @click="emit('select')"
    :class="
      twMerge(
        'grid w-full cursor-pointer items-center border border-transparent px-6 py-5 text-left transition-all hover:bg-neutral-100 @min-lg:grid-cols-[1fr_min-content] dark:hover:bg-neutral-800',
        isActive &&
          'border border-y-neutral-300 bg-neutral-200 hover:bg-neutral-200/50 dark:border-y-neutral-600 dark:bg-neutral-700 dark:hover:bg-neutral-700',
      )
    "
  >
    <div class="flex items-center gap-4">
      <span class="text-xl font-bold">{{ invoice.client }}</span>
      <InvoiceOverdueStatusBadge v-if="invoice.status === 'OVERDUE'" />
    </div>
    <div class="row-start-2 text-sm tracking-wider text-neutral-500 dark:text-neutral-400">
      {{ invoice.year }}
    </div>
    <div class="row-span-2 text-right text-xl font-bold">{{ formatCurrency(invoice.amount) }}</div>
  </button>
</template>
