import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { render } from '@testing-library/vue';

export function renderWithVueQuery<C, O>(component: C, options: O) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(component, {
    ...options,
    global: {
      plugins: [[VueQueryPlugin, { queryClient }]],
    },
  });
}
