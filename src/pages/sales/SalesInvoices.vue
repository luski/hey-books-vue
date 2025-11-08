<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import PaymentPanel from '@/features/sales/PaymentsPanel.vue';
import InvoiceList from '@/features/sales/InvoiceList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorView from '@/components/ErrorView.vue';
import { queryOptions } from './queries';
import type { Invoice } from '@/domain/types';
import { invoices as mockedInvoices } from '@/mocks/data';

const { data: paymentSummary, isLoading, error } = useQuery(queryOptions.invoicePaymentSummary);

const invoices: Invoice[] = mockedInvoices.slice(0, 5);
const page = ref(1);
const totalPages = 2;

function handleNextPage() {
  if (page.value < totalPages) {
    page.value += 1;
  }
}
function handlePreviousPage() {
  if (page.value > 1) {
    page.value -= 1;
  }
}
function handleSelectInvoice(invoiceId: string) {
  console.log('Selected invoice ID:', invoiceId);
}
</script>

<template>
  <div class="@container -mx-6 flex grow flex-col">
    <div class="px-6 py-6">
      <LoadingSpinner v-if="isLoading" />
      <PaymentPanel v-if="paymentSummary" :payment-summary="paymentSummary" />
      <ErrorView v-if="error">The payment summary cannot be fetched</ErrorView>
    </div>
    <hr />
    <div class="grid grow @min-4xl:grid-cols-2">
      <div class="border-r border-neutral-300 dark:border-neutral-800">
        <InvoiceList
          :invoices="invoices"
          :page="page"
          :total-pages="totalPages"
          @next-page="handleNextPage"
          @previous-page="handlePreviousPage"
          @select-invoice="handleSelectInvoice"
        />
      </div>
      <div>Invoice view placeholder</div>
    </div>
  </div>
</template>
