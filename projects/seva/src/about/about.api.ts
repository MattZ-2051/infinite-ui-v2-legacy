import type { Sku } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadSingleSku({ fetch }: { fetch: Fetch }) {
  const singleSkuData = await get<Sku>(`skus/615640e1e5b85e4affdb2316/?includeFunctions=true`, { fetch });

  return { singleSkuData };
}
