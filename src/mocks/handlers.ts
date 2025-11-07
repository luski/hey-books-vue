import { http, HttpResponse, delay, type DefaultBodyType, type PathParams } from 'msw';
import { invoices } from './data';
import { sumBy } from 'es-toolkit';
import type { InvoiceDto, PageDto } from '@/api/dto';
import z from 'zod';
import { createLogger } from './logger';

const singleInvoiceRequestParamsSchema = z.object({
  id: z.string(),
});

interface ErrorBody {
  message: string;
}
type SingleInvoiceRequestParams = z.infer<typeof singleInvoiceRequestParamsSchema>;

interface SummaryResponseBody {
  overduePayments: number;
  dueSoonPayments: number;
}

const logger = createLogger();

function createPage<T>(allItems: T[], page: number, pageSize: number): PageDto<T> {
  if (Number.isNaN(page) || Number.isNaN(pageSize) || page < 1 || pageSize < 1) {
    throw new Error('Invalid page or pageSize');
  }
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
  http.get<PathParams, DefaultBodyType, PageDto<InvoiceDto> | ErrorBody>(
    `${location.origin}/api/invoices`,
    async ({ request }) => {
      await delay('real');

      const url = new URL(request.url);
      try {
        const page = z.string().parse(url.searchParams.get('page'));
        const pageSize = z.string().parse(url.searchParams.get('pageSize'));
        return HttpResponse.json(createPage(invoices, Number(page), Number(pageSize)));
      } catch (e) {
        logger.error('Parsing error:', e);
        return HttpResponse.json({ message: 'Invalid query parameters' }, { status: 400 });
      }
    },
  ),

  http.get<SingleInvoiceRequestParams, DefaultBodyType, InvoiceDto | ErrorBody>(
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
        logger.error('Parsing error:', e);
        return HttpResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
      }
    },
  ),

  http.get<PathParams, DefaultBodyType, SummaryResponseBody>(
    `${location.origin}/api/invoices/summary/payments`,
    async () => {
      await delay('real');

      return HttpResponse.json({
        overduePayments: sumBy(
          invoices.filter((inv) => inv.status === 'OVERDUE'),
          (invoice) => invoice.amount,
        ),
        dueSoonPayments: sumBy(
          invoices.filter((inv) => inv.status === 'DUE_TODAY'),
          (invoice) => invoice.amount,
        ),
      });
    },
  ),
];
