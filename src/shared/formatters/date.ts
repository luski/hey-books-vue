const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function formatDate(date: string) {
  return dateFormatter.format(new Date(date));
}
