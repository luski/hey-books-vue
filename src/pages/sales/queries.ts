import { fetchInvoicePaymentSummary } from '@/api/endpoints';

const queryKeys = {
  invoicePaymentSummary: ['invoicePaymentSummary'] as const,
};

const invocePaymentSummary = {
  queryKey: queryKeys.invoicePaymentSummary,
  queryFn: fetchInvoicePaymentSummary,
};

export const queryOptions = {
  invocePaymentSummary,
};
