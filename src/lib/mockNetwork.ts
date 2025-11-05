export async function withMockNetwork<T>(fn: () => T | Promise<T>): Promise<T> {
  const latency = 300 + Math.random() * 1200;
  await new Promise((res) => setTimeout(res, latency));

  const chaosFactor = 0.1;
  if (Math.random() < chaosFactor) {
    throw new Error('Database connection failed');
  }

  return fn();
}
