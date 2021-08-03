import type { Profile, Product, Sku } from '$lib/sku-item/types';
import { get, getPage } from '$lib/api';

export async function loadProfile({ username, fetch }: { username: string; fetch?: Fetch }) {
  const profiles = await get<Profile[]>(`users?username=${username}`, { fetch });
  const profile = profiles[0];

  return profile;
}

export async function loadSkus({ profileId, page, fetch }: { profileId: string; page: number; fetch?: Fetch }) {
  const { data: skus, total: totalSkus } = await getPage<Sku>(
    `skus/tiles/?issuerId=${profileId}&page=${page}&per_page=8&sortBy=startDate:1`,
    {
      fetch,
    }
  );

  return { skus, totalSkus };
}

export async function loadProducts({ profileId, page, fetch }: { profileId: string; page: number; fetch?: Fetch }) {
  const { data: products, total: totalProducts } = await getPage<Product>(
    `products?owner=${profileId}&includeFunctions=true&page=${page}&per_page=8`,
    {
      fetch,
    }
  );

  return { products, totalProducts };
}
