import { formatCurrency, formatDecimal } from './format';

describe('format', () => {
  it('currency', () => {
    expect(formatCurrency(123_456.789)).toEqual('$123,456.79');
  });

  it('decimal', () => {
    expect(
      formatDecimal(123_456.789, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    ).toEqual('123,456.79');
  });
});
