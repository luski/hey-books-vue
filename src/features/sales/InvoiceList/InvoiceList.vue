<script setup lang="ts">
import { useInvoices } from '../composables/useInvoices';
import InvoiceListView from './InvoiceListView.vue';

interface Props {
  page: number;
}

defineOptions({ inheritAttrs: false });
const { page } = defineProps<Props>();

const { invoices, totalPages, isFetching } = useInvoices(() => page);
</script>

<template>
  <InvoiceListView
    :page="page"
    :invoices="invoices"
    :total-pages="totalPages"
    :is-fetching="isFetching"
    v-bind="$attrs"
  />
</template>
