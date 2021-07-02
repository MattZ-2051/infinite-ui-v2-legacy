import type { Sku, Profile, Series } from '$lib/sku-item/types';
import { writable } from 'svelte/store';
import { get, getPage } from '$lib/api';

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
  const category: string = query.get('category');
  const rarity: string = query.get('rarity');
  const series: string = query.get('series');
  const issuerName: string = query.get('creators');
  const minPrice: string = query.get('minPrice');
  const maxPrice: string = query.get('maxPrice');
  const startDate: string = query.get('startDate');
  const endDate: string = query.get('endDate');
  const search: string = query.get('search');
  const sortBy: string = query.get('sortBy') || 'startDate:1';
  const { data, total } = await getPage<Sku>(`skus/tiles/`, {
    fetch,
    params: {
      page: `${page}`,
      per_page: `6`,
      ...{ sortBy },
      ...(status && { status }),
      ...(category && { category }),
      ...(rarity && { rarity }),
      ...(series && { series }),
      ...(issuerName && { issuerName }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(search && { search }),
    },
  });

  loading.set(false);

  return { data, total };
}
