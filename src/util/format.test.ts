import {
  formatCurrency,
  formatCurrencyWithOptionalFractionDigits,
  formatInteger,
  formatDecimal,
  formatDate,
  formatBytes,
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

  it('date', async () => {
    expect(formatDate(new Date(2010, 8, 30, 15, 0, 10))).toEqual('September 30th, 2010 at 03:00 PM');
    expect(formatDate(new Date(2010, 8, 30, 15, 0, 10), 'DD/MM/YYYY')).toEqual('30/09/2010');
    expect(formatDate(new Date(2013, 7, 11, 10, 30, 10))).toEqual('August 11th, 2013 at 10:30 AM');
    expect(formatDate('2014-10-23T09:00:00.000Z')).toEqual('October 23rd, 2014 at 09:00 AM');
  });

  it('should handle bytes', async () => {
    expect(formatBytes(63_023)).toEqual('62 KB');
  });
});
