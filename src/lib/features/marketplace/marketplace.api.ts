import type { Sku, Profile, Series } from '$lib/sku-item/types';
import { get, send } from '$lib/api';

export async function loadMarketplaceFilters({ fetch }: { fetch: Fetch }) {
  const [categories, creators, series] = await Promise.all([
    get<Sku>(`categories/`, { fetch }),
    get<Profile[]>(`users?role=issuer&page=1&per_page=500`, { fetch }),
    get<Series[]>(`series/`, { fetch }),
  ]);
  return { categories, creators, series };
}

export async function loadMarketplaceItems({
  fetch,
  query,
}: {
  fetch: Fetch;
  query: URLSearchParams;
}): Promise<{ total: number; data: Sku[] }> {
  const page: number = +query.get('page') || 1;
  const response = await send(`skus/tiles/`, {
    fetch,
    params: { page: `${page}`, per_page: `6`, sortBy: 'startDate:1' },
  });

  const { headers } = response;
  const total = +headers.get('content-range').split('/')[1];

  const data: Sku[] = await response.json();

  return { data, total };
}
