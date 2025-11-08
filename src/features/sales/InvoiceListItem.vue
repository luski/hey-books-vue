<script lang="ts" setup>
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/shared/formatters/currency';
import type { Invoice } from '@/domain/types';
import { formatYear } from '@/shared/formatters/date';

interface Props {
  invoice: Invoice;
}
const { invoice } = defineProps<Props>();

const emit = defineEmits<{
  select: [];
}>();
</script>

<template>
  <button
    type="button"
    @click="emit('select')"
    class="grid w-full cursor-pointer grid-cols-[1fr_min-content] items-center px-6 py-5 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
  >
    <div class="flex items-center gap-4">
      <span class="text-xl font-bold">{{ invoice.client }}</span>
      <Badge
        variant="destructive"
        class="bg-red-700 dark:bg-red-400"
        v-if="invoice.status === 'OVERDUE'"
        >{{ invoice.status }}</Badge
      >
    </div>
    <div class="row-start-2 text-sm tracking-wider text-neutral-500 dark:text-neutral-400">
      {{ formatYear(new Date(invoice.invoiceDate)) }}
    </div>
    <div class="row-span-2 text-xl font-bold">{{ formatCurrency(invoice.amount) }}</div>
  </button>
</template>
