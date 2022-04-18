import type { Sku } from '$lib/sku-item/types';

export const checkRequiredSkus = async ({
  skuId,
  ownerId,
}: {
  skuId: string;
  ownerId: string;
}): Promise<{ skus: Sku[] }> => {
  // TODO (matt): Update with api call to new endpoint once BE finishes
  if (skuId && ownerId) {
    // NOTE (matt): This is just here for testing purposes, you can uncomment and pass these values in the array to test gatekeep

    // const sku = await getSkuOnly({ id: '6195d1ce74f27d2e0452b2f6' });
    // const secondSku = await getSkuOnly({ id: '6195d1ce74f27d2e0452b2f6' });
    // return { skus: [sku, secondSku] };
    return { skus: [] };
  }
};
