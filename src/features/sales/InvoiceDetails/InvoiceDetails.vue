<script setup lang="ts">
import { invoices } from '@/mocks/data';
import StateWrapper from '../StateWrapper.vue';
import InvoiceDetailsView from './InvoiceDetailsView.vue';
import { computed } from 'vue';

interface Props {
  invoiceId: string | null;
}

const { invoiceId } = defineProps<Props>();
const invoice = computed(() => invoices.find((inv) => inv.id === invoiceId) || null);
</script>

<template>
  <StateWrapper :resource="invoice" :is-loading="false" :error="null">
    <template #default="{ resource }">
      <InvoiceDetailsView :invoice="resource" />
    </template>
    <template #error> The invoice details cannot be fetched </template>
  </StateWrapper>
</template>
