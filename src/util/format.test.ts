import {
  formatCurrency,
  formatCurrencyWithOptionalFractionDigits,
  formatApiCurrency,
  formatInteger,
  formatDecimal,
  formatDate,
  formatBytes,
  capitalizeFirstLetter,
} from './format';

describe('format', () => {
  describe('number', () => {
    it('currency', () => {
      expect(formatCurrency(123_456.789)).toEqual('$123,456.79');
      expect(formatCurrency('123456.789')).toEqual('$123,456.79');
    });

    it('currencyWithOptionalFractionDigits', () => {
      expect(formatCurrencyWithOptionalFractionDigits(123_456.789)).toEqual('$123,456.79');
      expect(formatCurrencyWithOptionalFractionDigits(123_456)).toEqual('$123,456');
      expect(formatCurrencyWithOptionalFractionDigits(123_456)).toEqual('$123,456');
    });

    it('api currency', () => {
      expect(formatApiCurrency(123_456.789)).toEqual('123456.79');
      expect(formatApiCurrency(123_456)).toEqual('123456.00');
      expect(formatApiCurrency(9)).toEqual('9.00');
    });

    it('integer', () => {
      expect(formatInteger(1_234_567)).toEqual('1,234,567');
      expect(formatInteger(1_234_567.89)).toEqual('1,234,568');
    });

    it('decimal', () => {
      expect(formatDecimal(123_456.789, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('123,456.79');
    });

    it('supports fallback', () => {
      expect(formatCurrency(undefined)).toEqual('');
      expect(formatCurrency('abcd')).toEqual('');
      expect(formatCurrency('abcd', { fallback: '--' })).toEqual('--');
    });
  });

  describe('date', () => {
    it('format', async () => {
      expect(formatDate(new Date(2010, 8, 30, 15, 0, 10))).toEqual('Sep 30, 2010, 3:00 PM');
      expect(formatDate(new Date(2010, 8, 30, 15, 0, 10), 'DD/MM/YYYY')).toEqual('30/09/2010');
      expect(formatDate(new Date(2013, 7, 11, 10, 30, 10))).toEqual('Aug 11, 2013, 10:30 AM');
      expect(formatDate('2014-10-23T09:00:00.000Z')).toEqual('Oct 23, 2014, 9:00 AM');
    });

    it('default format will omit year if current', async () => {
      expect(formatDate(new Date(new Date().getFullYear(), 8, 30, 15, 0, 10))).toEqual('Sep 30, 3:00 PM');
    });
  });

  it('should handle bytes', async () => {
    expect(formatBytes(63_023)).toEqual('62 KB');
  });

  describe('string', () => {
    it('capitalize first letter', () => {
      expect(capitalizeFirstLetter('hello123')).toEqual('Hello123');
    });

    it('capitalize first letter and replace underscore with space', () => {
      expect(capitalizeFirstLetter('hello_123')).toEqual('Hello 123');
    });

    it('works on string with first letter capital', () => {
      expect(capitalizeFirstLetter('Hello_123')).toEqual('Hello 123');
    });
  });
});
