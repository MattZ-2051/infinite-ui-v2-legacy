import type { Sku } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadSingleSku({ fetch }: { fetch: Fetch }) {
  const singleSkuData = await get<Sku>(`skus/${import.meta.env.VITE_FEATURED_SKU_ID}/?includeFunctions=true`, {
    fetch,
  });

  return { singleSkuData };
}
