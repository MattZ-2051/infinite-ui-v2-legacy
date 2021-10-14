import type { Sku } from '$lib/sku-item/types';
import { getPage } from '$lib/api';
import { loadSingleSku } from '../about/about.api';

export async function loadData({ fetch }: { fetch: Fetch }) {
  const [{ data: skus }, { singleSkuData }] = await Promise.all([
    await getPage<Sku>(`skus/tiles/?page=1&per_page=8&sortBy=startDate:1`, { fetch }),
    await loadSingleSku({ fetch }),
  ]);

  return { skus, singleSkuData };
}
