import type { Sku } from '$lib/sku-item/types';

export function chooseSkuSocialImage(sku: Sku) {
  return sku.nftPublicAssets?.find((item) => item.type?.includes('image'));
}
