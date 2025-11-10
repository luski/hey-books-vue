<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import InvoiceListItem from './InvoiceListItem.vue';
import InvoiceListPagination from './InvoiceListPagination.vue';
import type { Invoice } from '@/domain/types';

interface Props {
  page: number;
  invoices: Invoice[];
  totalPages: number;
  isFetching: boolean;
}

const { page, invoices, totalPages, isFetching } = defineProps<Props>();

const emit = defineEmits<{
  nextPage: [];
  previousPage: [];
  selectInvoice: [invoiceId: string];
}>();

const handleNextPage = () => {
  if (page < totalPages) {
    emit('nextPage');
  }
};

const handlePreviousPage = () => {
  if (page > 1) {
    emit('previousPage');
  }
};
</script>

<template>
  <div class="flex h-full flex-col">
    <div
      class="border-b border-neutral-200 bg-neutral-50 px-6 py-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h2 class="text-sm font-semibold tracking-wider text-neutral-500 uppercase">Invoice list</h2>
    </div>
    <div class="relative grow">
      <transition
        ><div
          v-if="isFetching"
          class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/80 dark:bg-black/80"
        >
          <LoadingSpinner>Loading invoices...</LoadingSpinner>
        </div></transition
      >
      <ul class="basis-0 overflow-auto">
        <li v-for="invoice in invoices" :key="invoice.id">
          <InvoiceListItem :invoice="invoice" @select="emit('selectInvoice', invoice.id)" />
        </li>
      </ul>
    </div>
    <InvoiceListPagination
      :page="page"
      :total-pages="totalPages"
      @next-page="handleNextPage"
      @previous-page="handlePreviousPage"
    />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
