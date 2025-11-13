<script setup lang="ts">
import StateWrapper from '../StateWrapper.vue';
import InvoiceDetailsView from './InvoiceDetailsView.vue';
import InvoiceDetailsPlaceholder from './InvoiceDetailsPlaceholder.vue';
import { useInvoice } from '../composables/useInvoice';

interface Props {
  invoiceId: string | null;
}

const { invoiceId } = defineProps<Props>();
const { invoice, isLoading, isFetching, error } = useInvoice(() => invoiceId);

defineEmits<{ close: [] }>();
</script>

<template>
  <StateWrapper :resource="invoice" :is-loading="isLoading" :error="error">
    <template #default="{ resource }">
      <InvoiceDetailsView :invoice="resource" :is-fetching="isFetching" @close="$emit('close')" />
    </template>
    <template #loading><InvoiceDetailsPlaceholder is-loading /></template>
    <template #error>The invoice details cannot be fetched</template>
    <template #placeholder
      ><InvoiceDetailsPlaceholder
        >Select an invoice to see the details</InvoiceDetailsPlaceholder
      ></template
    >
  </StateWrapper>
</template>
