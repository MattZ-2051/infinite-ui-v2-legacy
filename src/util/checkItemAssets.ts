import { isSkuV2 } from '$lib/infinite-api-sdk/guard.service';

export function checkItemAssets(product, sku) {
  if (product) {
    return product.nftPublicAssets?.[0] || (isSkuV2(sku) ? sku?.nftPublicAsset : sku.nftPublicAssets?.[0]);
  } else if (isSkuV2(sku)) return sku?.nftPublicAsset;
  else {
    return sku.nftPublicAssets?.[0];
  }
}
