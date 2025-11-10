import { render, screen, within } from '@testing-library/vue';
import { expect, test, vi } from 'vitest';
import InvoiceListView from './InvoiceListView.vue';
import { invoices as mockInvoices } from '@/mocks/data';

test('displays a header with the correct title', () => {
  render(InvoiceListView, {
    props: {
      invoices: [],
      page: 1,
      totalPages: 1,
      isFetching: false,
    },
  });

  expect(screen.getByRole('heading', { name: /Invoice list/i })).toBeInTheDocument();
});

test('displays a pagination component', () => {
  render(InvoiceListView, {
    props: {
      invoices: mockInvoices.slice(0, 3),
      page: 1,
      totalPages: 2,
      isFetching: false,
    },
  });
  const paginationElement = screen.getByRole('navigation');
  expect(paginationElement).toBeInTheDocument();
  expect(paginationElement).toHaveTextContent('Page 1 of 2');
  expect(within(paginationElement).getByTestId('button-next')).toBeEnabled();
  expect(within(paginationElement).getByTestId('button-previous')).toBeDisabled();
});

test('displays a list with the correct number of invoices', () => {
  render(InvoiceListView, {
    props: {
      invoices: mockInvoices.slice(0, 3),
      page: 1,
      totalPages: 1,
      isFetching: false,
    },
  });

  const invoiceItems = screen.getAllByRole('listitem');
  expect(invoiceItems).toHaveLength(3);
});

test('displays an empty state when there are no invoices', () => {
  // TODO: Test implementation goes here
});

test('displays a loading state when invoices are being fetched', () => {
  render(InvoiceListView, {
    props: {
      invoices: mockInvoices.slice(0, 3),
      page: 1,
      totalPages: 1,
      isFetching: true,
    },
  });

  expect(screen.getByText(/Loading invoices.../i)).toBeInTheDocument();
});

test('displays an error message when there is an error fetching invoices', () => {
  // TODO: Test implementation goes here
});

test('displays invoice details correctly in the list', () => {
  render(InvoiceListView, {
    props: {
      invoices: [
        {
          amount: 100,
          client: 'Test Client',
          dueDate: '2024-01-01',
          invoiceDate: '2024-01-01',
          items: [],
          year: 2024,
          id: 'inv_1',
          status: 'OVERDUE',
        },
      ],
      page: 1,
      totalPages: 1,
      isFetching: false,
    },
  });

  const invoiceItem = screen.getByRole('listitem');
  expect(within(invoiceItem).getByText('Test Client')).toBeInTheDocument();
  expect(within(invoiceItem).getByText('$100.00')).toBeInTheDocument();
  expect(within(invoiceItem).getByText('OVERDUE')).toBeInTheDocument();
});

test('handles pagination correctly when navigating between pages', async () => {
  const handleNextPage = vi.fn();
  const handlePreviousPage = vi.fn();
  const { rerender } = render(InvoiceListView, {
    props: {
      invoices: mockInvoices.slice(0, 3),
      page: 1,
      totalPages: 2,
      onNextPage: handleNextPage,
      onPreviousPage: handlePreviousPage,
      isFetching: false,
    },
  });

  const nextButton = screen.getByTestId('button-next');
  expect(nextButton).toBeEnabled();

  nextButton.click();

  expect(handleNextPage).toHaveBeenCalled();

  await rerender({
    invoices: mockInvoices.slice(3, 6),
    page: 2,
    totalPages: 2,
  });

  const previousButton = screen.getByTestId('button-previous');
  expect(previousButton).toBeEnabled();

  previousButton.click();

  expect(handlePreviousPage).toHaveBeenCalled();
});
