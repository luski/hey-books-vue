const currenctFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(value: number) {
  return currenctFormatter.format(value);
}
