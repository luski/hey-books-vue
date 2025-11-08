<script setup lang="ts">
import type { Invoice } from '@/domain/types';
import InvoiceListItem from './InvoiceListItem.vue';
import InvoiceListPagination from './InvoiceListPagination.vue';

interface Props {
  invoices: Invoice[];
  page: number;
  totalPages: number;
}

const { invoices } = defineProps<Props>();

const emit = defineEmits<{
  nextPage: [];
  previousPage: [];
  selectInvoice: [invoiceId: string];
}>();
</script>

<template>
  <div class="flex h-full flex-col">
    <div
      class="border-b border-neutral-200 bg-neutral-50 px-6 py-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h2 class="text-sm font-semibold tracking-wider text-neutral-500 uppercase">Invoice list</h2>
    </div>
    <ul class="grow basis-0 overflow-auto">
      <li v-for="invoice in invoices" :key="invoice.id">
        <InvoiceListItem :invoice="invoice" @select="emit('selectInvoice', invoice.id)" />
      </li>
    </ul>
    <InvoiceListPagination
      :page="page"
      :total-pages="totalPages"
      @next-page="emit('nextPage')"
      @previous-page="emit('previousPage')"
    />
  </div>
</template>
