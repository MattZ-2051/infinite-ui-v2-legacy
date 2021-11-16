import type { Profile, Product, Sku } from '$lib/sku-item/types';
import { get, getPage } from '$lib/api';

export async function loadProfile({ username, fetch }: { username: string; fetch?: Fetch }) {
  const profiles = await get<Profile[]>(`users?username=${username}`, { fetch });
  const profile = profiles[0];

  return profile;
}

export async function loadSkus({
  profileId,
  page,
  sortBy,
  perPage,
  forSale,
  fetch,
}: {
  profileId: string;
  page: number;
  sortBy: string;
  perPage: number;
  forSale?: string;
  fetch?: Fetch;
}) {
  const { data: skus, total: totalSkus } = await getPage<Sku>(`skus/tiles`, {
    params: {
      page: page.toString(10),
      per_page: perPage.toString(10),
      isuerId: profileId,
      ...(sortBy && { sortBy }),
      ...(forSale && { forSale }),
    },
    fetch,
  });

  return { skus, totalSkus };
}

export async function loadProducts({
  profileId,
  page,
  sortBy,
  perPage,
  fetch,
}: {
  profileId: string;
  page: number;
  sortBy: string;
  perPage: number;
  fetch?: Fetch;
}) {
  const { data: products, total: totalProducts } = await getPage<Product>(
    `products?owner=${profileId}&includeFunctions=true&page=${page}&per_page=${perPage}`,
    {
      params: {
        ...(sortBy && { sortBy }),
      },
      fetch,
    }
  );

  return { products, totalProducts };
}
