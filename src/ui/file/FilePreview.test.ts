import type { FileAsset } from './types';
import { render } from '@testing-library/svelte';
import FilePreview from './FilePreview.svelte';

describe('FilePreview | Image Asset', () => {
  const imageAsset = { url: '1.png', type: 'image/jpeg' } as FileAsset;

  it('render & update props correctly', async () => {
    const { getByAltText } = render(FilePreview, {
      props: { item: imageAsset },
    });

    const image = getByAltText('preview');
    expect(image).toHaveAttribute('src', '1.png');
    expect(image).toHaveClass(
      'absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full object-contain'
    );
  });

  it('renders image with preview', async () => {
    const { getByAltText } = render(FilePreview, {
      props: { item: { ...imageAsset, previewUrl: 'preview.png' }, preview: true },
    });

    const image = getByAltText('preview');
    expect(image).toHaveAttribute('src', 'preview.png');
    expect(image).toHaveClass('w-full h-full object-cover');
  });

  it('supports `blur`', async () => {
    const { getByAltText } = render(FilePreview, {
      props: { item: imageAsset, blur: 10 },
    });

    const image = getByAltText('preview');
    expect(image).toHaveStyle('filter: blur(10px)');
  });
});

describe('FilePreview | Video Asset', () => {
  const videoAsset = { url: '1.mp4', type: 'video/mp4' } as FileAsset;

  it('renders video with no preview', async () => {
    const { getByTestId } = render(FilePreview, {
      props: { item: videoAsset },
    });

    const video = getByTestId('filepreview-video');
    expect(video).toHaveAttribute('src', videoAsset.url);
  });

  it('supports `blur`', async () => {
    const { getByTestId } = render(FilePreview, {
      props: { item: videoAsset, blur: 10 },
    });

    const video = getByTestId('filepreview-video');
    expect(video).toHaveStyle('filter: blur(10px)');
  });
});

describe('FilePreview | Vector Asset', () => {
  const vectorAsset = { url: '1.vectary' } as FileAsset;

  it('render & update props correctly', async () => {
    const { getByTestId } = render(FilePreview, {
      props: { item: vectorAsset },
    });

    const vector = getByTestId('filepreview-vector');
    expect(vector).toHaveAttribute('src', '1.vectary');
  });
});

describe('FilePreview | Audio Asset', () => {
  const audioAsset = { url: '1.mp3' } as FileAsset;

  it('render & update props correctly', async () => {
    const { getByTestId } = render(FilePreview, {
      props: { item: audioAsset },
    });

    const audio = getByTestId('filepreview-audio-src');
    expect(audio).toHaveAttribute('src', '1.mp3');
  });

  it('render', async () => {
    const { getByTestId } = render(FilePreview, {
      props: { item: audioAsset, preview: true },
    });

    const audioWithPreview = getByTestId('filepreview-audio-withpreview');
    expect(audioWithPreview).toBeInTheDocument();
  });
});

describe('FilePreview | Unrecognized Asset', () => {
  const unrecognizedAsset = { url: '1.asdf' } as FileAsset;

  it('render & update props correctly', async () => {
    const { getByText } = render(FilePreview, {
      props: { item: unrecognizedAsset },
    });

    const unrecognized = getByText('Unrecognized type');
    expect(unrecognized).toBeInTheDocument();
  });
});
