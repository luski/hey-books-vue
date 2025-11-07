import { expect, vi, afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './src/mocks/handlers';
import { createLogger } from './src/mocks/logger';

import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
vi.mock('./src/mocks/logger');
// @ts-expect-error Don't need to cover all the logger methods:
vi.mocked(createLogger).mockImplementation(() => {
  // Silence logs during tests
  return {
    error: () => {},
    log: () => {},
  };
});
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
