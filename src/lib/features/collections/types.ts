import type { FileAsset } from '$ui/file';

type SkuCollectionText = {
  text: string;
  position: string;
};
export type SkuCollection = {
  allowedIssuers: [];
  _id: string;
  name: string;
  title: SkuCollectionText[];
  descriptionShort: string;
  description: string | SkuCollectionText[];
  tenant: string;
  featuredSkuId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  mainFileAsset: FileAsset;
  fileAssets: FileAsset[];
  seoMetadata?: {
    title: string;
    description: string;
  };
};
