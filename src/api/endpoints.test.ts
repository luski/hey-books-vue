import { it, expect, describe } from 'vitest';
import { fetchInvoiceById, fetchInvoices, fetchInvoicePaymentSummary } from './endpoints';
import { ApiError } from './errors';
import { invoices } from '@/mocks/data';

describe('API Endpoints / invoices', () => {
  it('should fetch a paginated list of invoices', async () => {
    const dto = await fetchInvoices(1, 4);
    expect(dto).toMatchObject({
      page: 1,
      pageSize: 4,
      total: 23,
    });
    expect(dto.data.length).toBe(4);
  });

  it('should fetch a different page of invoices', async () => {
    const dto = await fetchInvoices(2, 2);
    expect(dto).toMatchObject({
      page: 2,
      pageSize: 2,
      total: 23,
    });
    expect(dto.data.length).toBe(2);
  });

  it('should fetch the last page of invoices with remaining items', async () => {
    const dto = await fetchInvoices(3, 10);
    expect(dto).toMatchObject({
      page: 3,
      pageSize: 10,
      total: 23,
    });
    expect(dto.data.length).toBe(3);
  });

  it('should return an empty list for out-of-range page', async () => {
    const dto = await fetchInvoices(5, 10);
    expect(dto).toMatchObject({
      page: 5,
      pageSize: 10,
      total: 23,
    });
    expect(dto.data.length).toBe(0);
  });

  it('should handle invalid page parameter', async () => {
    await expect(fetchInvoices(NaN, 10)).rejects.toThrow(ApiError);
  });

  it('should handle invalid pageSize parameter', async () => {
    await expect(fetchInvoices(1, NaN)).rejects.toThrow(ApiError);
  });
});

describe('API Endpoints / invoices/:id', () => {
  it('should fetch an invoice by ID', async () => {
    const testInvoice = invoices[4]!;
    const invoice = await fetchInvoiceById(testInvoice.id);
    expect(invoice).toMatchObject(testInvoice);
  });

  it('should handle non-existent invoice ID', async () => {
    await expect(fetchInvoiceById('non-existent-id')).rejects.toThrow(
      new ApiError(404, 'Invoice not found'),
    );
  });
});

describe('API Endpoints / invoices/summary/payments', () => {
  it('should fetch invoice payment summary', async () => {
    const summary = await fetchInvoicePaymentSummary();
    expect(summary).toMatchInlineSnapshot(`
      {
        "dueSoonPayments": 46000,
        "overduePayments": 63100,
      }
    `);
  });
});
