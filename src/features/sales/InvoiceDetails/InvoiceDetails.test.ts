import { screen, waitForElementToBeRemoved } from '@testing-library/vue';
import { expect, test } from 'vitest';
import InvoiceDetails from './InvoiceDetails.vue';
import { invoices } from '@/mocks/data';
import type { Invoice } from '@/domain/types';
import { renderWithVueQuery } from '@/test/utils';

const existingInvoice = invoices[4] as Invoice;

test('fetches the invoice details and displays them correctly', async () => {
  renderWithVueQuery(InvoiceDetails, {
    props: {
      invoiceId: existingInvoice.id,
    },
  });

  expect(screen.getByText('Loading invoice details...')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText('Loading invoice details...'));

  expect(screen.getByText(existingInvoice.client)).toBeInTheDocument();
});

test('displays an error message when the invoice is not found', async () => {
  renderWithVueQuery(InvoiceDetails, {
    props: {
      invoiceId: 'non-existent-invoice-id',
    },
  });

  expect(screen.getByText('Loading invoice details...')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText('Loading invoice details...'));

  expect(screen.getByText('The invoice details cannot be fetched')).toBeInTheDocument();
});
