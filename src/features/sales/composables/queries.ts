import { queryOptions } from '@tanstack/vue-query';
import { toValue, type MaybeRefOrGetter } from 'vue';
import { fetchInvoicePaymentSummary, fetchInvoices, fetchInvoiceById } from '@/api/endpoints';

const invoicePaymentSummary = queryOptions({
  queryKey: ['invoicePaymentSummary'],
  queryFn: fetchInvoicePaymentSummary,
});

const invoices = (page: MaybeRefOrGetter<number>, pageSize: MaybeRefOrGetter<number>) =>
  queryOptions({
    queryKey: ['invoicesPage', page, pageSize] as const,
    queryFn: ({ queryKey: [, page, pageSize] }) => fetchInvoices(toValue(page), toValue(pageSize)),
  });

const invoice = (invoiceId: MaybeRefOrGetter<string | null>) => {
  return queryOptions({
    queryKey: ['invoice', invoiceId] as const,
    enabled: () => !!toValue(invoiceId),
    queryFn: ({ queryKey: [, invoiceId] }) => fetchInvoiceById(toValue(invoiceId)!),
  });
};

export const queries = {
  invoicePaymentSummary,
  invoices,
  invoice,
};
