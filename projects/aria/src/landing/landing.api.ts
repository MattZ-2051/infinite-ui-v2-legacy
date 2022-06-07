import type { Profile } from '$lib/sku-item/types';
import type { SkuV2 } from '$lib/infinite-api-sdk/types';
import { getPage } from '$lib/api';
import { skuTiles } from '$lib/infinite-api-sdk';

export async function loadData({
  fetch,
}: {
  fetch: Fetch;
}): Promise<{ talents: Profile[]; drops: SkuV2[]; upcomings: SkuV2[] }> {
  const skuTilesCaller = skuTiles(fetch);
  const [{ data: talents }, drops, upcomings] = await Promise.all([
    getPage<Profile>(`users/issuers?page=1&per_page=6`, { fetch }),
    skuTilesCaller({
      per_page: 6,
      condition: 'available',
      featured: true,
    }),
    skuTilesCaller({
      per_page: 6,
      condition: 'upcoming',
    }),
  ]);

  return { talents, drops, upcomings };
}
