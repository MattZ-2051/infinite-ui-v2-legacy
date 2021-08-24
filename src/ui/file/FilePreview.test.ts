import type { FileAsset } from './types';
import { render } from '@testing-library/svelte';
import FilePreview from './FilePreview.svelte';

describe('FilePreview', () => {
  const imageAsset = { url: '1.png', type: 'image/jpeg' } as FileAsset;

  it('render & update props correctly', async () => {
    const { getByAltText } = render(FilePreview, {
      props: { item: imageAsset },
    });

    const image = getByAltText('preview');
    expect(image).toHaveAttribute('src', '1.png');
  });

  it('supports `blur`', async () => {
    const { getByAltText } = render(FilePreview, {
      props: { item: imageAsset, blur: 10 },
    });

    const image = getByAltText('preview');
    expect(image).toHaveStyle('filter: blur(10px)');
  });
});
