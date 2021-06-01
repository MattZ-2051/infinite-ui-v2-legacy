import { styles } from './styles';

// {'max-width.px': widthExp}

describe('styles', () => {
  it('format the styles correctly from object', () => {
    expect(
      styles({
        width: '5px',
        height: '50%',
        'max-height': '200px',
      })
    ).toEqual('width: 5px; height: 50%; max-height: 200px;');
  });

  it('can format units', () => {
    expect(
      styles({
        'width.px': '5',
        'height.%': '50',
        'max-height.px': '200',
      })
    ).toEqual('width: 5px; height: 50%; max-height: 200px;');
  });

  it('will ignore null values', () => {
    expect(
      styles({
        'width.px': null,
        'height.%': '50',
        'max-height.px': null,
      })
    ).toEqual('height: 50%;');
  });
});
