import type { FileAsset } from '$ui/file';

const getImageElement = (nftPublicAssets: FileAsset[] = []): FileAsset => {
  return nftPublicAssets.find(({ type, url }) => {
    const isImage = type.split('/')[0].toLowerCase() === 'image';
    return isImage && url;
  });
};

export default getImageElement;
