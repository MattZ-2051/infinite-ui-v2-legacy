import type { Profile, Product, Sku, SkuStatus } from '$lib/sku-item/types';
import { get, getPage } from '$lib/api';
import { skuIssuedByMeWithLookAhead, skuTilesWithLookAhead } from '$lib/infinite-api-sdk';

export async function loadProfile({ username, fetch }: { username: string; fetch?: Fetch }): Promise<Profile> {
  return get<Profile>(`users/issuers/${username}`, { fetch, skipTenant: true });
}

export async function loadSkus({
  lastId,
  firstId,
  isReverse,
  sortBy,
  perPage,
  forSale,
  skuStatus,
  issuerId,
}: {
  lastId?: string;
  firstId?: string;
  isReverse?: boolean;
  sortBy: string;
  perPage: number;
  forSale?: boolean;
  skuStatus?: SkuStatus;
  issuerId?: string;
}) {
  return issuerId
    ? skuTilesWithLookAhead(fetch)({
        lastId,
        firstId,
        isReverse: isReverse,
        per_page: perPage,
        sortBy,
        condition: forSale ? 'available' : 'all',
        issuerId,
      })
    : skuIssuedByMeWithLookAhead(fetch)({
        lastId,
        firstId,
        isReverse: isReverse,
        per_page: perPage,
        sortBy,
        condition: forSale ? 'available' : 'all',
        skuStatus,
      });
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
