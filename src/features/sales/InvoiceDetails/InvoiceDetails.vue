<script setup lang="ts">
import ErrorView from '@/components/ErrorView.vue';
import StateWrapper from '../StateWrapper.vue';
import InvoiceDetailsView from './InvoiceDetailsView.vue';
import InvoiceDetailsPlaceholder from './InvoiceDetailsPlaceholder.vue';
import { useInvoice } from '../composables/useInvoice';
import { computed } from 'vue';

interface Props {
  invoiceId: string | null;
}

const { invoiceId } = defineProps<Props>();
const { invoice, isLoading, isFetching, error } = useInvoice(() => invoiceId);
const errorMessage = computed(() => (error.value ? 'The invoice details cannot be fetched' : null));

defineEmits<{ close: [] }>();
</script>

<template>
  <StateWrapper :resource="invoice" :is-loading="isLoading" :error="errorMessage">
    <template #default="{ resource }">
      <InvoiceDetailsView :invoice="resource" :is-fetching="isFetching" @close="$emit('close')" />
    </template>
    <template #loading><InvoiceDetailsPlaceholder is-loading /></template>
    <template #error>
      <InvoiceDetailsPlaceholder>
        <ErrorView class="-mt-10">The invoice details cannot be fetched</ErrorView>
      </InvoiceDetailsPlaceholder>
    </template>
    <template #placeholder
      ><InvoiceDetailsPlaceholder
        >Select an invoice to see the details</InvoiceDetailsPlaceholder
      ></template
    >
  </StateWrapper>
</template>
