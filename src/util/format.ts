export function formatCurrency(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', { ...options, style: 'currency', currency: 'USD' }).format(
    value
  );
}

export function formatDecimal(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', { ...options, style: 'decimal' }).format(value);
}
