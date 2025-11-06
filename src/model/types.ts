export type InvoiceStatus = 'OVERDUE' | 'DUE_TODAY' | 'DUE_IN' | 'PAID';

export interface Page<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  client: string;
  year: number;
  amount: number;
  status: InvoiceStatus;
  dueDate: string; // ISO
  invoiceDate: string; // ISO
  items: InvoiceItem[];
}
