import type { FileAsset } from './types';
import { getFileType, getAspectRatioStyle, mediaMapper } from './file-utils';

describe('getFileType', () => {
  for (const [key, value] of Object.entries(mediaMapper)) {
    it(`returns ${value} for ${key} filetype`, async () => {
      const item = { url: `1.${key}` } as FileAsset;
      const filetype = getFileType(item);
      expect(filetype).toBe(value);
    });
  }
  it('returns vector when vectary word in url', async () => {
    const item = { url: 'asdfvectarytest.svg' } as FileAsset;
    const filetype = getFileType(item);
    expect(filetype).toBe('vector');
  });

  it('returns undefined when no item param', async () => {
    const filetype = getFileType(undefined);
    expect(filetype).toBeUndefined();
  });

  it('returns undefined when no match', async () => {
    const item = { url: '1.asdf' } as FileAsset;
    const filetype = getFileType(item);
    expect(filetype).toBeUndefined();
  });
});

describe('getAspectRatioStyle', () => {
  it('returns item.width / item.height aspect ratio', async () => {
    const item = { url: 'asdf.test', width: 4, height: 2 } as FileAsset;
    const aspectRatioStyle = getAspectRatioStyle(item);
    expect(aspectRatioStyle).toStrictEqual({ 'aspect-ratio': 2 });
  });

  it('returns preview when second param is true', async () => {
    const item = { url: 'asdf.test' } as FileAsset;
    const aspectRatioStyle = getAspectRatioStyle(item, true);
    expect(aspectRatioStyle).toEqual({ 'aspect-ratio': '1 / 1' });
  });

  it('returns undefined when no item object', async () => {
    const aspectRatioStyle = getAspectRatioStyle(undefined);
    expect(aspectRatioStyle).toBeUndefined();
  });

  it('returns undefined when no width prop in item object', async () => {
    const item = { url: 'asdf.test', height: 1 } as FileAsset;
    const aspectRatioStyle = getAspectRatioStyle(item);
    expect(aspectRatioStyle).toBeUndefined();
  });

  it('returns undefined when no height prop in item object', async () => {
    const item = { url: 'asdf.test', width: 1 } as FileAsset;
    const aspectRatioStyle = getAspectRatioStyle(item);
    expect(aspectRatioStyle).toBeUndefined();
  });
});
