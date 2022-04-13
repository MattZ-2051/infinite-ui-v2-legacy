import type { Profile, Product, Sku, SkuStatus } from '$lib/sku-item/types';
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
  skuStatus,
}: {
  profileId: string;
  page: number;
  sortBy: string;
  perPage: number;
  forSale?: boolean;
  skuStatus?: SkuStatus;
}) {
  const { docs: skus, count: totalSkus } = await skuTiles(fetch)({
    page,
    per_page: perPage,
    sortBy,
    forSale,
    issuerId: profileId,
    skuStatus,
  });
  return { skus, totalSkus };
}

export async function loadProducts({
  profileId,
  page,
  sortBy,
  perPage,
}: {
  profileId: string;
  page: number;
  sortBy: string;
  perPage: number;
}) {
  const { data: products, total: totalProducts } = await getPage<Product>(
    `products?owner=${profileId}&includeFunctions=true&page=${page}&per_page=${perPage}`,
    {
      cache: 'no-store',
      params: {
        ...(sortBy && { sortBy }),
      },
    }
  );

  return { products, totalProducts };
}

export async function loadFeaturedSku({ id }: { id: string }) {
  return await get<Sku>(`skus/${id}/?includeFunctions=true`, {
    fetch,
  });
}

export async function loadExternalProducts({
  ids,
  page,
  sortBy,
  perPage,
}: {
  ids: string[];
  page: number;
  sortBy: string;
  perPage: number;
}) {
  const { data: products, total: totalProducts } = await getPage<Product>(
    `products?tokenId=${ids}&includeFunctions=true&page=${page}&per_page=${perPage}`,
    {
      params: {
        ...(sortBy && { sortBy }),
      },
    }
  );

  return { products, totalProducts };
}
