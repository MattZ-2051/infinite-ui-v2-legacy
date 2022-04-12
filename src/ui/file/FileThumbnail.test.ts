import type { FileAsset } from './types';
import { render } from '@testing-library/svelte';
import FileThumbnail from './FileThumbnail.svelte';

describe('FileThumbnail | Image Asset', () => {
  const imageAsset = { url: '1.png', type: 'image/jpeg' } as FileAsset;

  it('renders img thumbnail', async () => {
    const { getByTestId } = render(FileThumbnail, {
      props: { item: imageAsset },
    });

    const image = getByTestId('filethumbnail-img');
    expect(image).toHaveAttribute('src', '1.png');
    expect(image).toHaveClass('object-cover custom-border-element');
  });

  it('renders img thumbnail with preview url', async () => {
    const { getByTestId } = render(FileThumbnail, {
      props: { item: { ...imageAsset, previewUrl: 'preview.png' } },
    });

    const image = getByTestId('filethumbnail-img');
    expect(image).toHaveAttribute('src', 'preview.png');
    expect(image).toHaveClass('object-cover custom-border-element');
  });
});

describe('FileThumbnail | Video Asset', () => {
  const videoAsset = { url: '1.mp4', type: 'video/mp4' } as FileAsset;

  it('renders video thumbnail', async () => {
    const { getByTestId } = render(FileThumbnail, {
      props: { item: videoAsset },
    });

    const video = getByTestId('filethumbnail-video');
    expect(video).toHaveAttribute('src', videoAsset.url);
    expect(video).toHaveClass('object-cover custom-border-element');
  });
});

describe('FileThumbnail | Vector Asset', () => {
  const vectorAsset = { url: '1.vectary' } as FileAsset;

  it('renders vector thumbnail', async () => {
    const { getByTestId } = render(FileThumbnail, {
      props: { item: vectorAsset },
    });

    const vector = getByTestId('filethumbnail-vector');
    expect(vector).toBeInTheDocument();
    expect(vector).toHaveClass('object-cover md:object-contain');
  });
});

describe('FileThumbnail | Audio Asset', () => {
  const audioAsset = { url: '1.mp3' } as FileAsset;

  it('renders', async () => {
    const { getByTestId } = render(FileThumbnail, {
      props: { item: audioAsset },
    });

    const audio = getByTestId('filethumbnail-audio');
    expect(audio).toBeInTheDocument();
  });
});
