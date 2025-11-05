import { http, HttpResponse, delay } from 'msw';
import { invoices } from './data';

export const handlers = [
  http.get(`${location.origin}/api/invoices`, async () => {
    await delay('real');
    return HttpResponse.json({
      data: invoices,
    });
  }),
];
