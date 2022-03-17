import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

const maxCompleteNumber = 1 * 10 ** 6;
const maxCompactNumber = 1 * 10 ** 18;

dayjs.extend(advancedFormat);

type FormatNumberOptions = Intl.NumberFormatOptions & { fallback?: string } & { eth_currency_symbol?: string };

export const cryptoCurrencySymbols = {
  USDC: '$',
  ETH: 'Ξ',
  ETH_WORD: 'ETH ',
};

export function formatCurrency(value: number | string, options?: FormatNumberOptions) {
  if (options?.currency === 'ETH') {
    return formatEthCurrency(value, options);
  }
  if (value >= maxCompleteNumber && value <= maxCompactNumber)
    options = { notation: 'compact', maximumSignificantDigits: 7, ...options };
  if (value > maxCompactNumber) options = { notation: 'engineering', maximumSignificantDigits: 7, ...options };
  return numberFormat(value, { ...options, style: 'currency', currency: 'USD' });
}

export function formatCurrencyWithOptionalFractionDigits(value: number | string, options?: FormatNumberOptions) {
  return formatCurrency(value, { minimumFractionDigits: 0, ...options });
}

export function formatApiCurrency(value: number | string) {
  return numberFormat(value, { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatEthCurrency(value: number | string, options?: FormatNumberOptions) {
  return `${
    options?.eth_currency_symbol === cryptoCurrencySymbols.ETH_WORD
      ? cryptoCurrencySymbols.ETH_WORD
      : cryptoCurrencySymbols.ETH
  }${formatDecimal(value, {
    minimumFractionDigits: 0,
    maximumFractionDigits: options?.maximumFractionDigits || 4,
  })}`;
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

const currentYear = new Date().getFullYear();
export function formatDate(value: Date | string | number, format?: string) {
  const date = new Date(value);
  if (!format) {
    format = date.getFullYear() === currentYear ? `MMM D, h:mm A` : `MMM D, YYYY, h:mm A`;
  }
  return dayjs(date).format(format);
}

export function formatBytes(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, index)) + ' ' + sizes[index];
}

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).replace('_', ' ');
}
