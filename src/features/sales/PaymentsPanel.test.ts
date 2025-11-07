import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/vue';
import PaymentsPanel from './PaymentsPanel.vue';

afterEach(cleanup);

test('displays provided values correctly', () => {
  render(PaymentsPanel, {
    props: {
      paymentSummary: {
        overduePayments: 300,
        dueSoonPayments: 100,
      },
    },
  });
  expect(screen.getByTestId('due-soon-payments').textContent).toMatch(/due soon\s?\$100\.00/);
  expect(screen.getByTestId('overdue-payments').textContent).toMatch(/overdue\s?\$300\.00/);
  expect(screen.getByRole('progressbar')).toHaveAttribute('data-value', '75');
});

test('rerenders when props change', async () => {
  const { rerender } = render(PaymentsPanel, {
    props: {
      paymentSummary: {
        overduePayments: 300,
        dueSoonPayments: 100,
      },
    },
  });

  await rerender({
    paymentSummary: {
      overduePayments: 200,
      dueSoonPayments: 200,
    },
  });

  expect(screen.getByTestId('due-soon-payments').textContent).toMatch(/due soon\s?\$200\.00/);
  expect(screen.getByTestId('overdue-payments').textContent).toMatch(/overdue\s?\$200\.00/);
  expect(screen.getByRole('progressbar')).toHaveAttribute('data-value', '50');
});
