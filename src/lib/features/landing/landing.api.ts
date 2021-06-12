import { get } from '$lib/api';
import type { SkuItem } from '$lib/sku-item';

export async function loadFeatured({ fetch }) {
  const items = await get<SkuItem[]>(`skus/tiles/?page=1&per_page=8&sortBy=startDate:1`, fetch);
  return { items };
}
