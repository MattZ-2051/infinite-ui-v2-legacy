import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(advancedFormat);

export function formatCurrency(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', { ...options, style: 'currency', currency: 'USD' }).format(value);
}

export function formatDecimal(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', { ...options, style: 'decimal' }).format(value);
}

export function formatDate(value: Date | string, format = `MMMM Do, YYYY [at] hh:mm A`) {
  const _dayjs = typeof value === 'string' ? dayjs(value, 'YYYY-MM-DDTHH:mm:ss.SSSZ') : dayjs(value);
  return _dayjs.format(format);
}
