import type { Profile } from '$lib/sku-item/types';
import { getPage } from '$lib/api';
import { skuTiles } from '$lib/infinite-api-sdk';

export async function loadData({ fetch }: { fetch: Fetch }) {
  const skuTilesCaller = skuTiles(fetch);
  const [{ data: talents }, { docs: drops }, { docs: upcomings }] = await Promise.all([
    getPage<Profile>(`users/issuers?page=1&per_page=6`, { fetch }),
    skuTilesCaller(
      1,
      6,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      true
    ),
    skuTilesCaller(
      1,
      6,
      undefined,
      true,
      'upcoming',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    ),
  ]);

  return { talents, drops, upcomings };
}
