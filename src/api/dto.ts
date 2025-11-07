import z from 'zod';

export const InvoiceItemDto = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.number(),
});

export const InvoiceDto = z.object({
  id: z.string(),
  client: z.string(),
  year: z.number(),
  amount: z.number(),
  status: z.enum(['OVERDUE', 'DUE_TODAY', 'DUE_IN', 'PAID']),
  dueDate: z.string(), // ISO
  invoiceDate: z.string(), // ISO
  items: z.array(InvoiceItemDto),
});

export const PageDto = <T>(itemSchema: z.ZodType<T>) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
  });

export const PaymentSummaryDto = z.object({
  overduePayments: z.number(),
  dueSoonPayments: z.number(),
});

export type InvoiceDto = z.infer<typeof InvoiceDto>;
export type PageDto<T> = z.infer<ReturnType<typeof PageDto<T>>>;
export type PaymentSummaryDto = z.infer<typeof PaymentSummaryDto>;
