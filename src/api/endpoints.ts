import {
  mapInvoiceDtoToDomain,
  mapInvoicesDtoToDomain,
  mapPaymentSummaryDtoToDomain,
} from './mappers';
import { InvoiceDto, PageDto, PaymentSummaryDto } from './dto';
import { createHttpClient } from './httpClient';

const http = createHttpClient();

export async function fetchInvoices(page: number, pageSize: number) {
  const q = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const raw = await http.get(`/invoices?${q}`);
  const dto = PageDto(InvoiceDto).parse(raw);
  return mapInvoicesDtoToDomain(dto);
}

export async function fetchInvoiceById(id: string) {
  const raw = await http.get(`/invoices/${encodeURIComponent(id)}`);
  const dto = InvoiceDto.parse(raw);
  return mapInvoiceDtoToDomain(dto);
}

export async function fetchInvoicePaymentSummary() {
  const raw = await http.get(`/invoices/summary/payments`);
  const dto = PaymentSummaryDto.parse(raw);
  return mapPaymentSummaryDtoToDomain(dto);
}
