<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import PaymentPanel from '@/features/sales/PaymentsPanel.vue';
import InvoiceList from '@/features/sales/InvoiceList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorView from '@/components/ErrorView.vue';
import { queryOptions } from './queries';
import { useInvoices } from './composables/useInvoices';
import { useRoute, useRouter } from 'vue-router';

const { data: paymentSummary, isLoading, error } = useQuery(queryOptions.invoicePaymentSummary);
const route = useRoute();
const router = useRouter();

const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

const { invoices, totalPages } = useInvoices(page);

function handleNextPage() {
  if (page.value < totalPages.value) {
    router.replace({ query: { ...route.query, page: page.value + 1 } });
  }
}
function handlePreviousPage() {
  if (page.value > 1) {
    router.replace({ query: { ...route.query, page: page.value - 1 } });
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
