import type { Sku, Profile, Series } from '$lib/sku-item/types';
import type { ModeFilterStatus } from './types';
import { skuTiles } from '$lib/infinite-api-sdk';
import { fetchTracker } from '$lib/api';
import { modeFilters } from './marketplace.service';

export const loading = fetchTracker();

const getModeParameters = (status: ModeFilterStatus) => {
  // if status is falsy convert it to ''
  // if status is not any of the strings in ModeFilterStatus, default to the first mode (all)
  const { parameters } = modeFilters.find((mf) => mf.status === (status || '')) || modeFilters[0];
  return parameters;
};

export async function loadMarketplaceFilters({
  fetch,
  query,
}: {
  fetch: Fetch;
  query: URLSearchParams;
}): Promise<{ maxPrice: number; creators: Profile[]; series: Series[]; categories: Sku[] }> {
  const mode = getModeParameters(query.get('mode') as ModeFilterStatus);
  const { categories, creators, maxPrice, series } = await skuTiles(fetch)({
    page: 1,
    per_page: 1,
    forSale: mode.forSale && mode.forSale === 'true',
    status: mode.status,
  });

  // Need to sort alphabetically since creators and categories change the order in each response
  const sortCreators = creators.sort((a, b) =>
    a?.username?.toLowerCase().localeCompare(b?.username?.toLowerCase(), 'en', { ignorePunctuation: true })
  );
  const sortCategories = categories.sort((a, b) =>
    a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase(), 'en', { ignorePunctuation: true })
  );

  return {
    maxPrice: maxPrice as unknown as number,
    categories: sortCategories as unknown as Sku[],
    creators: sortCreators as unknown as Profile[],
    series: series as unknown as Series[],
  };
}

export const perPage = 9;

export async function loadMarketplaceItems({
  fetch,
  query,
}: {
  fetch: Fetch;
  query: URLSearchParams;
}): Promise<{ total: number; data: Sku[] }> {
  const page: number = +query.get('page') || 1;
  const mode = getModeParameters(query.get('mode') as ModeFilterStatus);
  const category: string = query.get('category') || undefined;
  const typeEdition: string = query.get('typeEdition') || undefined;
  const series: string = query.get('series') || undefined;
  const issuerId: string = query.get('issuerId') || undefined;
  const minPrice: string = query.get('minPrice') || undefined;
  const maxPrice: string = query.get('maxPrice') || undefined;
  const startDate: string = query.get('startDate') || undefined;
  const endDate: string = query.get('endDate') || undefined;
  const search: string = query.get('search') || undefined;
  const saleType: string = query.get('saleType') || undefined;
  const currency: string = query.get('currency') || undefined;
  const sortBy: string = query.get('sortBy') || 'startDate:1';

  const { docs, count } = await skuTiles(fetch, { tracker: loading })({
    page,
    per_page: perPage,
    sortBy,
    forSale: mode.forSale && mode.forSale === 'true',
    status: mode.status || undefined,
    category,
    typeEdition,
    series,
    issuerId,
    minPrice: minPrice && Number.parseInt(minPrice, 10),
    maxPrice: maxPrice && Number.parseInt(maxPrice, 10),
    startDate,
    endDate,
    search,
    saleType,
    currency,
  });

  return {
    data: docs,
    total: count,
  };
}
