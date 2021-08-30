import type { Sku } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadData({ fetch }: { fetch: Fetch }) {
  return get<Sku>(`skus/tiles/?page=1&per_page=8&sortBy=startDate:1`, { fetch });
}
