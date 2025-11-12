import { useQuery } from '@tanstack/vue-query';
import { queries } from './queries';

export function usePaymentSummary() {
  const { data: paymentSummary, isLoading, error } = useQuery(queries.invoicePaymentSummary);

  return { paymentSummary, isLoading, error };
}
