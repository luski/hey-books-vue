import { http, HttpResponse, delay, type DefaultBodyType } from 'msw';
import { invoices } from './data';
import type { Invoice, Page } from '@/model/types';
import z from 'zod';

const invoicesRequestParamsSchema = z.object({
  page: z.string().regex(/^\d+$/),
  pageSize: z.string().regex(/^\d+$/),
});
const singleInvoiceRequestParamsSchema = z.object({
  id: z.string(),
});

interface ErrorBody {
  message: string;
}
type InvoicesRequestParams = z.infer<typeof invoicesRequestParamsSchema>;
type SingleInvoiceRequestParams = z.infer<typeof singleInvoiceRequestParamsSchema>;

function createPage<T>(allItems: T[], page: number, pageSize: number): Page<T> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = allItems.slice(start, end);
  return {
    data,
    total: allItems.length,
    page,
    pageSize,
  };
}

export const handlers = [
  http.get<InvoicesRequestParams, DefaultBodyType, Page<Invoice> | ErrorBody>(
    `${location.origin}/api/invoices`,
    async ({ params }) => {
      await delay('real');
      try {
        const { page, pageSize } = invoicesRequestParamsSchema.parse(params);
        return HttpResponse.json(createPage(invoices, Number(page), Number(pageSize)));
      } catch (e) {
        console.error('Parsing error:', e);
        return HttpResponse.json({ message: 'Invalid query parameters' }, { status: 400 });
      }
    },
  ),

  http.get<SingleInvoiceRequestParams, DefaultBodyType, Invoice | ErrorBody>(
    `${location.origin}/api/invoices/:id`,
    async ({ params }) => {
      await delay('real');
      try {
        const { id } = singleInvoiceRequestParamsSchema.parse(params);
        const invoice = invoices.find((inv) => inv.id === id);
        if (!invoice) {
          return HttpResponse.json({ message: 'Invoice not found' }, { status: 404 });
        }
        return HttpResponse.json(invoice);
      } catch (e) {
        console.error('Parsing error:', e);
        return HttpResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
      }
    },
  ),
];
