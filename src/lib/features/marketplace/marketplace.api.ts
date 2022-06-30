import type { Sku, Profile, Series, Currency } from '$lib/sku-item/types';
import type { ModeFilterStatus } from './types';
import type { MarketplaceCondition, SkuV2 } from '$lib/infinite-api-sdk/types';
import { skuCategories, skuCreators, skuEditions, skuMaxPrice, skuTilesWithLookAhead } from '$lib/infinite-api-sdk';
import { fetchTracker } from '$lib/api';
import { modeFilters } from './marketplace.service';

export const loading = fetchTracker();

const getModeParameters = (status: ModeFilterStatus): MarketplaceCondition => {
  const { parameters } = modeFilters.find((mf) => mf.status === (status || '')) || modeFilters[0];
  return parameters.status;
};

function getFilterArguments(query: URLSearchParams) {
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
  const currency: Currency = (query.get('currency') as Currency) || undefined;

  return {
    condition: getModeParameters(query.get('mode') as ModeFilterStatus),
    category,
    typeEdition,
    series,
    issuerId,
    minPrice: minPrice && Number.parseFloat(minPrice),
    maxPrice: maxPrice && Number.parseFloat(maxPrice),
    startDate,
    endDate,
    search,
    saleType,
    currency,
  };
}

export async function loadMarketplaceFilters({
  fetch,
  query,
}: {
  fetch: Fetch;
  query: URLSearchParams;
}): Promise<{ maxPrice: number; creators: Profile[]; series: Series[]; categories: Sku[] }> {
  const apiFilter = getFilterArguments(query);
  const [categories, creators, series, maxPrices] = await Promise.all([
    skuCategories(fetch)(apiFilter),
    skuCreators(fetch)(apiFilter),
    skuEditions(fetch)(apiFilter),
    skuMaxPrice(fetch)(apiFilter),
  ]);

  const maxPrice = Math.max(...maxPrices.map(({ amount }) => Number.parseInt(amount, 10)));

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
}): Promise<{ results: SkuV2[]; hasNext: boolean; hasPrevious: boolean }> {
  const lastId = query.get('lastId') || undefined;
  const firstId = query.get('firstId') || undefined;
  const isReverseIn = query.get('isReverse');
  const isReverse: boolean = isReverseIn === 'true';
  const sortBy: string = query.get('sortBy') || 'minStartDate:1';
  const invocationArguments = {
    ...getFilterArguments(query),
    sortBy,
  };
  return skuTilesWithLookAhead(fetch, { tracker: loading })({
    ...invocationArguments,
    per_page: perPage,
    lastId,
    firstId,
    isReverse,
  });
}
