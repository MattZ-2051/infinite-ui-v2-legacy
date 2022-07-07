import type { SkuV2 } from '$lib/infinite-api-sdk/types';
import type { Sku } from '$lib/sku-item/type';
import { skuTiles } from '$lib/infinite-api-sdk';
import { loadSingleSku } from '../about/about.api';

export async function loadData({ fetch }: { fetch: Fetch }): Promise<{ skus: SkuV2[]; singleSkuData: Sku }> {
  const [{ body: skus }, { singleSkuData }] = await Promise.all([
    skuTiles(fetch)({
      per_page: 8,
      sortBy: 'minStartDate:1',
    }),
    loadSingleSku({ fetch }),
  ]);

  return { skus, singleSkuData };
}
