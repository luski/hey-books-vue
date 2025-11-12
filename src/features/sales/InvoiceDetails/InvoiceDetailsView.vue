<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import InvoiceStatusBadge from '../InvoiceStatusBadge.vue';
import { formatCurrency } from '@/shared/formatters/currency';
import { formatDate } from '@/shared/formatters/date';
import BackdropView from '@/components/BackdropView.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Invoice } from '@/domain/types';

defineEmits<{ close: [] }>();

interface Props {
  invoice: Invoice;
  isFetching: boolean;
}

const { invoice } = defineProps<Props>();
</script>

<template>
  <Card class="relative drop-shadow-md">
    <BackdropView :show="isFetching">
      <LoadingSpinner />
    </BackdropView>
    <CardHeader>
      <CardTitle class="mb-4 flex items-center gap-6 text-5xl font-semibold">
        <span>{{ invoice.client }}</span>
        <InvoiceStatusBadge :status="invoice.status" class="rounded-xl text-lg" />
        <Button variant="outline" class="ml-auto" @click="$emit('close')"><X /></Button>
      </CardTitle>
      <CardDescription class="flex flex-col gap-4 text-base text-black dark:text-white">
        <p class="text-2xl font-bold text-black dark:text-white">
          {{ formatCurrency(invoice.amount) }}
        </p>
        <p class="text-sm font-medium text-neutral-500 uppercase dark:text-neutral-400">
          Due: {{ formatDate(invoice.dueDate) }}
        </p>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <table class="w-full text-lg font-medium">
        <tbody>
          <tr
            v-for="item in invoice.items"
            :key="item.description"
            class="border-b border-neutral-300 last:border-0 dark:border-neutral-700"
          >
            <td class="py-4">{{ item.description }}</td>
            <td class="py-4 text-right font-semibold text-black dark:text-white">
              {{ formatCurrency(item.amount) }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t border-neutral-600 dark:border-neutral-500">
            <td class="py-4 font-bold">Total</td>
            <td class="py-4 text-right font-bold text-black dark:text-white">
              {{ formatCurrency(invoice.amount) }}
            </td>
          </tr>
        </tfoot>
      </table>
    </CardContent>
  </Card>
</template>
