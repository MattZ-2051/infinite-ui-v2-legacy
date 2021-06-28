import { formatCurrency, formatDecimal, formatDate } from './format';

describe('format', () => {
  it('currency', () => {
    expect(formatCurrency(123_456.789)).toEqual('$123,456.79');
  });

  it('decimal', () => {
    expect(formatDecimal(123_456.789, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toEqual('123,456.79');
  });

  it('date', async () => {
    expect(formatDate(new Date(2010, 8, 30, 15, 0, 10))).toEqual('September 30th, 2010 at 03:00 PM');
    expect(formatDate(new Date(2010, 8, 30, 15, 0, 10), 'dd/MM/yyyy')).toEqual('30/09/2010');
    expect(formatDate(new Date(2013, 7, 11, 10, 30, 10))).toEqual('August 11th, 2013 at 10:30 AM');
    expect(formatDate('2014-10-23T09:00:00.000Z')).toEqual('October 23rd, 2014 at 09:00 AM');
  });
});
