<script setup lang="ts">
import InvoiceStatusBadge from '../InvoiceStatusBadge.vue';
import { formatCurrency } from '@/shared/formatters/currency';
import { formatDate } from '@/shared/formatters/date';
import type { Invoice } from '@/domain/types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
interface Props {
  invoice: Invoice;
}

const { invoice } = defineProps<Props>();
</script>

<template>
  <Card class="drop-shadow-md">
    <CardHeader>
      <CardTitle class="mb-4 flex items-start text-5xl font-semibold">
        <span>{{ invoice.client }}</span>
        <InvoiceStatusBadge :status="invoice.status" class="ml-auto rounded-xl text-lg" />
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
