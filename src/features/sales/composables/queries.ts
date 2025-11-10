import { fetchInvoicePaymentSummary, fetchInvoices } from '@/api/endpoints';
import { toValue, type MaybeRefOrGetter } from 'vue';

const queryKeys = {
  invoicePaymentSummary: ['invoicePaymentSummary'] as const,
  invoicesPage: (page: MaybeRefOrGetter<number>, pageSize: MaybeRefOrGetter<number>) =>
    ['invoicesPage', page, pageSize] as const,
};

const invoicePaymentSummary = {
  queryKey: queryKeys.invoicePaymentSummary,
  queryFn: fetchInvoicePaymentSummary,
};

const invoicesPage = (page: MaybeRefOrGetter<number>, pageSize: MaybeRefOrGetter<number>) => ({
  queryKey: queryKeys.invoicesPage(page, pageSize),
  queryFn: ({ queryKey }: { queryKey: ReturnType<typeof queryKeys.invoicesPage> }) => {
    const [, page, pageSize] = queryKey;
    return fetchInvoices(toValue(page), toValue(pageSize));
  },
});

export const queryOptions = {
  invoicePaymentSummary,
  invoicesPage,
};
