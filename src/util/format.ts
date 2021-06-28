import { format as dateFnsFormat, parseISO } from 'date-fns';

export function formatCurrency(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', { ...options, style: 'currency', currency: 'USD' }).format(value);
}

export function formatDecimal(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', { ...options, style: 'decimal' }).format(value);
}

export function formatDate(value: Date | string, format = `MMMM do, yyyy 'at' hh:mm a`) {
  return dateFnsFormat(typeof value === 'string' ? parseISO(value) : value, format);
}
