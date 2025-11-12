<script setup lang="ts">
import { useInvoices } from '../composables/useInvoices';
import InvoiceListView from './InvoiceListView.vue';

interface Props {
  page: number;
  activeInvoiceId?: string | null;
}

defineOptions({ inheritAttrs: false });
const { page } = defineProps<Props>();

const { invoices, totalPages, isFetching } = useInvoices(() => page);
</script>

<template>
  <InvoiceListView
    :page="page"
    :invoices="invoices"
    :active-invoice-id="activeInvoiceId"
    :total-pages="totalPages"
    :is-fetching="isFetching"
    v-bind="$attrs"
  />
</template>
