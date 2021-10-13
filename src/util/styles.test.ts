import { styles } from './styles';

describe('styles', () => {
  it('format the styles correctly from object', () => {
    expect(
      styles({
        width: '5px',
        height: '50%',
        'max-height': '200px',
      })
    ).toBe('width: 5px; height: 50%; max-height: 200px;');
  });

  it('can format units', () => {
    expect(
      styles({
        'width.px': '5',
        'height.%': '50',
        'max-height.px': '200',
      })
    ).toBe('width: 5px; height: 50%; max-height: 200px;');
  });

  it('will ignore falsy values', () => {
    expect(
      styles({
        'width.px': undefined,
        'height.%': '50',
        // eslint-disable-next-line unicorn/no-null
        'max-height.px': null,
      })
    ).toBe('height: 50%;');
  });
});
