import type { Sku, Profile } from '$lib/sku-item/types';
import { getPage } from '$lib/api';

export async function loadData({ fetch }: { fetch: Fetch }) {
  const [{ data: talents }, { data: drops }, { data: upcomings }] = await Promise.all([
    getPage<Profile>(`users/?role=issuer&featured=true&page=1&per_page=10`, { fetch }),
    getPage<Sku>(`skus/tiles/?includeFunctions=true&forSale=true&featured=true&page=1&per_page=10`, { fetch }),
    getPage<Sku>(`skus/tiles/?includeFunctions=true&status=upcoming&page=1&per_page=10`, { fetch }),
  ]);

  return { talents, drops, upcomings };
}
