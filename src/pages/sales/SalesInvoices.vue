<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PaymentSummary from '@/features/sales/PaymentSummary';
import InvoiceList from '@/features/sales/InvoiceList';

const route = useRoute();
const router = useRouter();

const page = computed(() => (route.query.page ? Number(route.query.page) : 1));

function handleNextPage() {
  router.replace({ query: { ...route.query, page: page.value + 1 } });
}
function handlePreviousPage() {
  router.replace({ query: { ...route.query, page: page.value - 1 } });
}
function handleSelectInvoice(invoiceId: string) {
  console.log('Selected invoice ID:', invoiceId);
}
</script>

<template>
  <div class="@container -mx-6 flex grow flex-col">
    <PaymentSummary />
    <hr />
    <div class="grid grow @min-4xl:grid-cols-2">
      <div class="border-r border-neutral-300 dark:border-neutral-800">
        <InvoiceList
          :page="page"
          @next-page="handleNextPage"
          @previous-page="handlePreviousPage"
          @select-invoice="handleSelectInvoice"
        />
      </div>
      <div>Invoice view placeholder</div>
    </div>
  </div>
</template>
