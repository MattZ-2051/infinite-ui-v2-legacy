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
