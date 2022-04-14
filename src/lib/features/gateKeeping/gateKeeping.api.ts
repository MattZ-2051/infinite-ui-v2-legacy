// function for api call to check required skus needed to purchase

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
    return await { skus: [] };
  }
};
