import type { Sku, Profile, Series } from '$lib/sku-item/types';
import { writable } from 'svelte/store';
import { get, send } from '$lib/api';

export const loading = writable(false);

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
  loading.set(true);

  const page: number = +query.get('page') || 1;
  const status: string = query.get('status');
  const response = await send(`skus/tiles/`, {
    fetch,
    params: { page: `${page}`, per_page: `6`, sortBy: 'startDate:1', ...(status && { status }) },
  });

  const { headers } = response;
  const total = +headers.get('content-range').split('/')[1];

  const data: Sku[] = await response.json();

  loading.set(false);

  return { data, total };
}
