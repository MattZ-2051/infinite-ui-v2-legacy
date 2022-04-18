import type { FileAsset, FileType } from './types';

export const mediaMapper: { [key: string]: FileType } = {
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  mov: 'video',
  mp4: 'video',
  mp3: 'audio',
  vectary: 'vector',
};

export function getFileType(item: FileAsset): FileType {
  if (!item) {
    return;
  }
  const { url } = item;

  const extension = url.trim().split('.').pop().toLowerCase();
  if (extension in mediaMapper) {
    return mediaMapper[extension];
  }

  if (url.includes('vectary')) {
    return 'vector';
  }

  return;
}

export function getAspectRatioStyle(item: FileAsset, preview = false) {
  if (preview) {
    return { 'aspect-ratio': '1 / 1' };
  }
  return item?.width && item.height ? { 'aspect-ratio': item.width / item.height } : undefined;
}
