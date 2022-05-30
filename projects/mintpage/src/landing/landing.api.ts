import { skuTiles } from '$lib/infinite-api-sdk';
import { loadSingleSku } from '../about/about.api';

export async function loadData({ fetch }: { fetch: Fetch }) {
  const [{ docs: skus }, { singleSkuData }] = await Promise.all([
    skuTiles(fetch)({
      page: 1,
      per_page: 8,
      sortBy: 'startDate:1',
    }),
    loadSingleSku({ fetch }),
  ]);

  return { skus, singleSkuData };
}
