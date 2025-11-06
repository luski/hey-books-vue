import z from 'zod';
import { ApiError } from './errors';

const BASE_URL = location.origin;

const errorSchema = z.object({
  message: z.string(),
});

function buildUrl(...segments: string[]) {
  return segments.map((segment) => segment.split('/').filter(Boolean).join('/')).join('/');
}

function parseErrorResponse(status: number, body: unknown): ApiError {
  const parsedError = errorSchema.safeParse(body);
  if (parsedError.success) {
    return new ApiError(status, parsedError.data.message);
  } else {
    return new ApiError(status, `API request failed with status ${status}`);
  }
}

export function createHttpClient() {
  async function get(path: string): Promise<unknown> {
    const url = new URL(buildUrl('api', path), BASE_URL).toString();
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw parseErrorResponse(response.status, await response.json());
    }
    return response.json();
  }

  return { get };
}
