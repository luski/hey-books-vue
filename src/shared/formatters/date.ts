const yearFormatter = new Intl.DateTimeFormat(undefined, { year: 'numeric' });

export function formatYear(date: Date): string {
  return yearFormatter.format(date);
}
