import type { Sku, Profile, Series } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadCategoriesItems({ fetch }: { fetch: Fetch }) {
  const [skus, categories, creators, series] = await Promise.all([
    get<Sku>(`skus/tiles/?page=1&per_page=50&sortBy=startDate:1`, { fetch }),
    get<Sku>(`categories/`, { fetch }),
    get<Profile[]>(`users?role=issuer&page=1&per_page=50`, { fetch }),
    get<Series[]>(`series/`, { fetch }),
  ]);
  return { skus, categories, creators, series };
}
