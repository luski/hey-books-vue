import { invoices } from '@/lib/data'
import { http, HttpResponse, delay } from 'msw'

export const handlers = [
  http.get(`${location.origin}/api/invoices`, async () => {
    await delay('real')
    return HttpResponse.json({
      data: invoices,
    })
  }),
]
