import { render, screen } from '@testing-library/vue';
import { expect, test } from 'vitest';
import InvoiceDetailsView from './InvoiceDetailsView.vue';
import { invoices } from '@/mocks/data';
import type { Invoice } from '@/domain/types';

const testInvoice = invoices[0] as Invoice;

test('Displays invoice details correctly', () => {
  render(InvoiceDetailsView, {
    props: {
      invoice: testInvoice,
      isFetching: false,
    },
  });

  expect(screen.getByText(testInvoice.client)).toBeInTheDocument();
  expect(screen.getByText(testInvoice.status)).toBeInTheDocument();
  //... etc
});

test('Does not show status if it is not overdue', () => {
  const nonOverdueInvoice = { ...testInvoice, status: 'PAID' } as Invoice;

  render(InvoiceDetailsView, {
    props: {
      invoice: nonOverdueInvoice,
      isFetching: false,
    },
  });

  expect(screen.queryByText(nonOverdueInvoice.status)).not.toBeInTheDocument();
});

test('Shows loading state while fetching invoice data', async () => {
  const { rerender } = render(InvoiceDetailsView, {
    props: {
      invoice: testInvoice,
      isFetching: true,
    },
  });

  expect(screen.getByText('Please wait...')).toBeInTheDocument();

  await rerender({
    invoice: testInvoice,
    isFetching: false,
  });

  expect(screen.queryByText('Please wait...')).not.toBeInTheDocument();
});
