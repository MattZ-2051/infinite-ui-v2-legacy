import type { Profile, Product, Sku } from '$lib/sku-item/types';
import { get, getPage } from '$lib/api';
import { skuTiles } from '$lib/infinite-api-sdk';

export async function loadProfile({ username, fetch }: { username: string; fetch?: Fetch }): Promise<Profile> {
  return get<Profile>(`users/issuers/${username}`, { fetch, skipTenant: true });
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
  const { docs: skus, count: totalSkus } = await skuTiles(fetch)({
    page,
    per_page: perPage,
    sortBy,
    forSale: forSale && forSale === 'true',
    issuerId: profileId,
    skuStatus: '',
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

export async function loadFeaturedSku({ id, fetch }: { id: string; fetch: Fetch }) {
  return await get<Sku>(`skus/${id}/?includeFunctions=true`, {
    fetch,
  });
}

export async function loadExternalProducts({
  ids,
  page,
  sortBy,
  perPage,
  fetch,
}: {
  ids: string[];
  page: number;
  sortBy: string;
  perPage: number;
  fetch?: Fetch;
}) {
  const { data: products, total: totalProducts } = await getPage<Product>(
    `products?tokenId=${ids}&includeFunctions=true&page=${page}&per_page=${perPage}`,
    {
      params: {
        ...(sortBy && { sortBy }),
      },
      fetch,
    }
  );

  return { products, totalProducts };
}
