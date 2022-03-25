import { skuTiles } from '$lib/infinite-api-sdk';

export async function loadData({ fetch }: { fetch: Fetch }) {
  const { data: skus } = await skuTiles(fetch)(1, 8, 'startDate:1');
  return { skus };
}
