import type { Sku } from '$lib/sku-item/types';
import { getPage } from '$lib/api';

export async function loadData({ fetch }: { fetch: Fetch }) {
  const { data: skus } = await getPage<Sku>(`skus/tiles/?page=1&per_page=8&sortBy=startDate:1`, { fetch });
  return { skus };
}
