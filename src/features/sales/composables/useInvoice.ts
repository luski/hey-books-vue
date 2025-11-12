import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { queries } from './queries';
import { computed, type MaybeRefOrGetter } from 'vue';

export function useInvoice(invoiceId: MaybeRefOrGetter<string | null>) {
  const { data, isFetching, isLoading, error, isEnabled } = useQuery({
    ...queries.invoice(invoiceId),
    placeholderData: keepPreviousData,
  });

  const invoice = computed(() => (isEnabled.value ? data.value : null));
  return { invoice, isFetching, isLoading, error };
}
