import type { FileAsset } from '$ui/file';

export type PrivateAssets = {
  total: number;
  assets: FileAsset[];
  isOwner?: boolean;
  productId: string;
};
