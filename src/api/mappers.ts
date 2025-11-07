import type { InvoiceDto, PageDto, PaymentSummaryDto } from '@/api/dto';
import type { Invoice, PaymentSummary } from '@/domain/types';
import type { Page } from '@/shared/pagination/types';

export function mapInvoicesDtoToDomain(dto: PageDto<InvoiceDto>): Page<Invoice> {
  return {
    data: dto.data.map(mapInvoiceDtoToDomain),
    total: dto.total,
    page: dto.page,
    pageSize: dto.pageSize,
  };
}

export function mapInvoiceDtoToDomain(dto: InvoiceDto): Invoice {
  return {
    id: dto.id,
    client: dto.client,
    year: dto.year,
    amount: dto.amount,
    status: dto.status,
    dueDate: dto.dueDate,
    invoiceDate: dto.invoiceDate,
    items: dto.items.map((item) => ({
      id: item.id,
      description: item.description,
      amount: item.amount,
    })),
  };
}

export function mapPaymentSummaryDtoToDomain(dto: PaymentSummaryDto): PaymentSummary {
  return {
    overduePayments: dto.overduePayments,
    dueSoonPayments: dto.dueSoonPayments,
  };
}
