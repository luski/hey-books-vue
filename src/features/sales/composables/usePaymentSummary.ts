import { useQuery } from '@tanstack/vue-query';
import { queryOptions } from './queries';

export function usePaymentSummary() {
  const { data: paymentSummary, isLoading, error } = useQuery(queryOptions.invoicePaymentSummary);

  return { paymentSummary, isLoading, error };
}
