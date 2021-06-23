import { formatCurrency } from './format';

describe('format', () => {
  it('currency', () => {
    expect(formatCurrency(123_456.789)).toEqual('$123,456.79');
  });
});
