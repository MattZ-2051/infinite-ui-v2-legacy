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
      expect(formatCurrency(123_456.789)).toBe('$123,456.79');
      expect(formatCurrency('123456.789')).toBe('$123,456.79');
    });

    it('currencyWithOptionalFractionDigits', () => {
      expect(formatCurrencyWithOptionalFractionDigits(123_456.789)).toBe('$123,456.79');
      expect(formatCurrencyWithOptionalFractionDigits(123_456)).toBe('$123,456');
      expect(formatCurrencyWithOptionalFractionDigits(123_456)).toBe('$123,456');
    });

    it('api currency', () => {
      expect(formatApiCurrency(123_456.789)).toBe('123456.79');
      expect(formatApiCurrency(123_456)).toBe('123456.00');
      expect(formatApiCurrency(9)).toBe('9.00');
    });

    it('integer', () => {
      expect(formatInteger(1_234_567)).toBe('1,234,567');
      expect(formatInteger(1_234_567.89)).toBe('1,234,568');
    });

    it('decimal', () => {
      expect(formatDecimal(123_456.789, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toBe('123,456.79');
    });

    it('supports fallback', () => {
      expect(formatCurrency(undefined)).toBe('');
      expect(formatCurrency('abcd')).toBe('');
      expect(formatCurrency('abcd', { fallback: '--' })).toBe('--');
    });
  });

  describe('date', () => {
    it('format', async () => {
      expect(formatDate(new Date(2010, 8, 30, 15, 0, 10))).toBe('Sep 30, 2010, 3:00 PM');
      expect(formatDate(new Date(2010, 8, 30, 15, 0, 10), 'DD/MM/YYYY')).toBe('30/09/2010');
      expect(formatDate(new Date(2013, 7, 11, 10, 30, 10))).toBe('Aug 11, 2013, 10:30 AM');
      expect(formatDate('2014-10-23T09:00:00.000Z')).toBe('Oct 23, 2014, 9:00 AM');
    });

    it('default format will omit year if current', async () => {
      expect(formatDate(new Date(new Date().getFullYear(), 8, 30, 15, 0, 10))).toBe('Sep 30, 3:00 PM');
    });
  });

  it('should handle bytes', async () => {
    expect(formatBytes(63_023)).toBe('62 KB');
  });

  describe('string', () => {
    it('capitalize first letter', () => {
      expect(capitalizeFirstLetter('hello123')).toBe('Hello123');
    });

    it('capitalize first letter and replace underscore with space', () => {
      expect(capitalizeFirstLetter('hello_123')).toBe('Hello 123');
    });

    it('works on string with first letter capital', () => {
      expect(capitalizeFirstLetter('Hello_123')).toBe('Hello 123');
    });
  });
});
