import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(advancedFormat);

type FormatNumberOptions = Intl.NumberFormatOptions & { fallback?: string };

export function formatCurrency(value: number | string, options?: FormatNumberOptions) {
  return numberFormat(value, { ...options, style: 'currency', currency: 'USD' });
}

export function formatCurrencyWithOptionalFractionDigits(value: number | string, options?: FormatNumberOptions) {
  return formatCurrency(value, { ...options, minimumFractionDigits: 0 });
}

export function formatApiCurrency(value: number | string) {
  return numberFormat(value, { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatInteger(value: number | string, options?: FormatNumberOptions) {
  return numberFormat(value, { ...options, minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatDecimal(value: number | string, options?: FormatNumberOptions) {
  return numberFormat(value, { ...options, style: 'decimal' });
}

function numberFormat(value: number | string, options: FormatNumberOptions) {
  return Number.isNaN(+value) ? options.fallback || '' : new Intl.NumberFormat('en-US', options).format(+value);
}

export function formatDate(value: Date | string | number, format = `MMMM Do, YYYY [at] hh:mm A`) {
  return dayjs(new Date(value)).format(format);
}

export function formatBytes(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, index)) + ' ' + sizes[index];
}
