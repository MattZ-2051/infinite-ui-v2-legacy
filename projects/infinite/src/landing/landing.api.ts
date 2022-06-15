import type { SkuV2 } from '$lib/infinite-api-sdk/types';
// eslint-disable-next-line no-empty-pattern
export async function loadData({}: { fetch: Fetch }): Promise<{ skus: SkuV2[] }> {
  return { skus: [] };
}
