import type { Sku } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadSingleSku({ fetch }: { fetch: Fetch }) {
  const singleSkuData = await get<Sku>(`skus/6181759e0318051e2ac2c2df/?includeFunctions=true`, { fetch });

  return { singleSkuData };
}
