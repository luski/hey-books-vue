import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { computed, type MaybeRefOrGetter } from 'vue';
import { queryOptions } from './queries';

const PAGE_SIZE = 5;

export function useInvoices(page: MaybeRefOrGetter<number>) {
  const {
    data: invoicesData,
    isFetching,
    error,
  } = useQuery({
    ...queryOptions.invoicesPage(page, () => PAGE_SIZE),
    placeholderData: keepPreviousData,
  });
  const totalPages = computed(() => {
    const totalItems = invoicesData.value?.total || 0;
    return Math.ceil(totalItems / PAGE_SIZE);
  });

  const invoices = computed(() => invoicesData.value?.data || []);

  return { invoices, isFetching, error, totalPages };
}
