import { skuTiles } from '$lib/infinite-api-sdk';

export async function loadData({ fetch }: { fetch: Fetch }) {
  const { docs: skus } = await skuTiles(fetch)({
    page: 1,
    per_page: 8,
    sortBy: 'startDate:1',
  });
  return { skus };
}
