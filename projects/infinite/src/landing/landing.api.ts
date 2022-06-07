import type { SkuV2 } from '$lib/infinite-api-sdk/types';

export async function loadData(): Promise<{ skus: SkuV2[] }> {
  return { skus: [] };
}
