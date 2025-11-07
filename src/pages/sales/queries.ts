import { fetchInvoicePaymentSummary } from '@/api/endpoints';

const queryKeys = {
  invoicePaymentSummary: ['invoicePaymentSummary'] as const,
};

const invoicePaymentSummary = {
  queryKey: queryKeys.invoicePaymentSummary,
  queryFn: fetchInvoicePaymentSummary,
};

export const queryOptions = {
  invoicePaymentSummary,
};
