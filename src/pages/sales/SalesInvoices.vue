<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PaymentSummary from '@/features/sales/PaymentSummary';
import InvoiceList from '@/features/sales/InvoiceList';
import InvoiceDetails from '@/features/sales/InvoiceDetails';

const route = useRoute();
const router = useRouter();

const page = computed(() => (route.query.page ? Number(route.query.page) : 1));
const invoiceId = computed(() => (route.params.id as string) ?? null);

function handleNextPage() {
  router.replace({ query: { ...route.query, page: page.value + 1 } });
}
function handlePreviousPage() {
  router.replace({ query: { ...route.query, page: page.value - 1 } });
}
function handleSelectInvoice(invoiceId: string) {
  router.replace({ name: 'sales-invoices', query: route.query, params: { id: invoiceId } });
}
function handleCloseInvoice() {
  router.replace({ name: 'sales-invoices', query: route.query });
}
</script>

<template>
  <div class="@container/invoices-viewport -mx-6 flex grow flex-col">
    <PaymentSummary />
    <hr />
    <div class="grid grow @min-4xl/invoices-viewport:grid-cols-2">
      <div class="border-r border-neutral-300 dark:border-neutral-800">
        <InvoiceList
          :activeInvoiceId="invoiceId"
          :page="page"
          @next-page="handleNextPage"
          @previous-page="handlePreviousPage"
          @select-invoice="handleSelectInvoice"
        />
      </div>
      <div class="bg-sidebar">
        <InvoiceDetails :invoice-id="invoiceId" @close="handleCloseInvoice" />
      </div>
    </div>
  </div>
</template>
