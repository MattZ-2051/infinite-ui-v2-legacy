import type { Profile, Series } from '$lib/sku-item/types';
import type {
  SkuIssuedFilterParameters,
  SkuIssuedRequestParameters,
  SkuTileFilterParameters,
  SkuTileRequestParameters,
  SkuV2,
  SkuV2Page,
  CollectorProductV2,
  CollectorProductBaseFilterParameters,
  CollectorProductRequestParameters,
  CollectorProductV2Page,
} from './types';
import { send } from '$lib/api';

function wipeEmptyParameters(parameters: Record<string, string | boolean | number>) {
  return Object.fromEntries(
    // eslint-disable-next-line unicorn/no-null
    Object.entries(parameters).filter(([, value]) => ![undefined, null].includes(value))
  );
}

function handleFilterParameters({
  category,
  typeEdition,
  series,
  minPrice,
  maxPrice,
  startDate,
  endDate,
  search,
  saleType,
  currency,
  featured,
}: SkuTileFilterParameters) {
  return wipeEmptyParameters({
    featured: featured && Boolean(featured).toString(),
    categories: category,
    editionType: typeEdition,
    series,
    minPrice: minPrice && Number(minPrice).toString(10),
    maxPrice: maxPrice && Number(maxPrice).toString(10),
    currencies: currency,
    startDate,
    endDate,
    search,
    saleType,
  });
}

function handleRequestParameters({
  startId,
  isReverse,
  per_page,
  sortBy,
  issuerId,
  ...more
}: SkuTileRequestParameters) {
  return wipeEmptyParameters({
    ...handleFilterParameters(more),
    issuers: issuerId,
    startId,
    isReverse,
    limit: per_page && Number(per_page).toString(10),
    sortBy,
  });
}

function handleIssuedParameters({
  startId,
  isReverse,
  per_page,
  sortBy,
  skuStatus,
  ...more
}: SkuIssuedRequestParameters) {
  return wipeEmptyParameters({
    ...handleFilterParameters(more),
    status: skuStatus || undefined,
    startId,
    isReverse,
    limit: per_page && Number(per_page).toString(10),
    sortBy,
  });
}

export function skuCategories(fetch, options?) {
  async function skuCategoriesCall(
    skuTileRequestParameters: SkuTileFilterParameters
  ): Promise<{ _id: string; name: string }[]> {
    const parameters = handleFilterParameters(skuTileRequestParameters);
    const { body } = await send<{ _id: string; name: string }[]>(
      `/v2/skus/categories/${skuTileRequestParameters.condition}`,
      {
        ...options,
        method: 'GET',
        fetch,
        params: parameters,
      }
    );
    return body;
  }
  return skuCategoriesCall;
}

export function skuEditions(fetch, options?) {
  async function skuEditionsCall(skuTileRequestParameters: SkuTileFilterParameters): Promise<Series[]> {
    const parameters = handleFilterParameters(skuTileRequestParameters);
    const { body } = await send<Series[]>(`/v2/skus/editions/${skuTileRequestParameters.condition}`, {
      ...options,
      method: 'GET',
      fetch,
      params: parameters,
    });
    return body;
  }
  return skuEditionsCall;
}

export function skuCreators(fetch, options?) {
  async function skuCreatorsCall(skuTileRequestParameters: SkuTileFilterParameters): Promise<Profile[]> {
    const parameters = handleFilterParameters(skuTileRequestParameters);
    const { body } = await send<Profile[]>(`/v2/skus/creators/${skuTileRequestParameters.condition}`, {
      ...options,
      method: 'GET',
      fetch,
      params: parameters,
    });
    return body;
  }
  return skuCreatorsCall;
}

export function skuMaxPrice(fetch, options?) {
  async function skuMaxPriceCall(
    skuTileRequestParameters: SkuTileFilterParameters
  ): Promise<{ amount: string; currency: 'ETH' | 'USD' }[]> {
    const parameters = handleFilterParameters(skuTileRequestParameters);
    const { body } = await send<{ amount: string; currency: 'ETH' | 'USD' }[]>(
      `/v2/skus/max-price/${skuTileRequestParameters.condition}`,
      {
        ...options,
        method: 'GET',
        fetch,
        params: parameters,
      }
    );
    return body;
  }
  return skuMaxPriceCall;
}

export function skuTiles(fetch, options?) {
  async function skuTilesCall(requestParameters: SkuTileRequestParameters): Promise<SkuV2[]> {
    const parameters = handleRequestParameters(requestParameters);
    const { body } = await send<SkuV2Page>(`/v2/skus/tiles/${requestParameters.condition}`, {
      ...options,
      method: 'GET',
      fetch,
      params: parameters,
    });
    return body.resource.map((value) => ({ ...value, version: '2' }));
  }
  return skuTilesCall;
}

export function skuTilesWithLookAhead(fetch, options?) {
  const apiCall = skuTiles(fetch, options);
  async function wrapApiCall({
    lastId,
    firstId,
    isReverse,
    per_page,
    ...skuTileFilterParameters
  }: SkuTileFilterParameters & {
    lastId?: string;
    firstId?: string;
    isReverse?: boolean;
    per_page?: number;
    sortBy?: string; // ToDO: possible values are startDate:1 startDate:-1 startDate:-1
  }): Promise<{
    results: SkuV2[];
    hasNext: boolean;
    hasPrevious: boolean;
  }> {
    const startId = isReverse ? firstId : lastId;
    const results = await apiCall({
      ...skuTileFilterParameters,
      per_page: per_page + 1,
      startId,
      isReverse,
    });
    const hasF = results.length > per_page;
    const hasR = Boolean(startId);
    return {
      results: isReverse ? results.slice(-per_page) : results.slice(0, per_page),
      hasNext: isReverse ? hasR : hasF,
      hasPrevious: isReverse ? hasF : hasR,
    };
  }
  return wrapApiCall;
}

export function skuIssuedByMe(fetch, options?) {
  async function skuTilesCall(requestParameters: SkuIssuedRequestParameters): Promise<SkuV2[]> {
    const parameters = handleIssuedParameters(requestParameters);
    const { body } = await send<SkuV2Page>(`/v2/skus/issued-by-me/${requestParameters.condition}`, {
      ...options,
      method: 'GET',
      fetch,
      params: parameters,
    });
    return body.resource.map((value) => ({ ...value, version: '2' }));
  }
  return skuTilesCall;
}

export function skuIssuedByMeWithLookAhead(fetch, options?) {
  const apiCall = skuIssuedByMe(fetch, options);
  async function wrapApiCall({
    lastId,
    firstId,
    isReverse,
    per_page,
    ...skuIssuedFilterParameters
  }: SkuIssuedFilterParameters & {
    lastId?: string;
    firstId?: string;
    isReverse?: boolean;
    per_page?: number;
    sortBy?: string; // ToDO: possible values are startDate:1 startDate:-1 startDate:-1
  }): Promise<{
    results: SkuV2[];
    hasNext: boolean;
    hasPrevious: boolean;
  }> {
    const startId = isReverse ? firstId : lastId;
    const results = await apiCall({
      ...skuIssuedFilterParameters,
      per_page: per_page + 1,
      startId,
      isReverse,
    });
    const hasF = results.length > per_page;
    const hasR = Boolean(startId);
    return {
      results: isReverse ? results.slice(-per_page) : results.slice(0, per_page),
      hasNext: isReverse ? hasR : hasF,
      hasPrevious: isReverse ? hasF : hasR,
    };
  }
  return wrapApiCall;
}

export function skuTile(fetch, options?) {
  async function skuTileCall(id: string): Promise<SkuV2> {
    const { body } = await send<SkuV2>(`/v2/skus/${id}`, {
      ...options,
      method: 'GET',
      fetch,
    });
    return body;
  }
  return skuTileCall;
}

// ************* COLLECTORS *************

function handleFilterParametersCollectorsProduct({
  search,
  saleType,
  mintStatus,
  owner,
}: {
  search?: string;
  saleType?: string;
  mintStatus?: string;
  owner?: string;
}) {
  return wipeEmptyParameters({
    search,
    saleType,
    mintStatus,
    owner,
  });
}

function handleRequestParametersCollectorProducts({
  startId,
  isReverse,
  per_page,
  sortBy,
  ...more
}: CollectorProductRequestParameters) {
  return wipeEmptyParameters({
    ...handleFilterParametersCollectorsProduct(more),
    startId,
    isReverse,
    limit: per_page && Number(per_page).toString(10),
    sortBy,
  });
}

export function collectorProducts(fetch, options?) {
  async function collectorProductsCall(
    id: string,
    collectorProductRequestParameters: CollectorProductRequestParameters
  ): Promise<CollectorProductV2Page> {
    const parameters = handleRequestParametersCollectorProducts(collectorProductRequestParameters);
    const { body } = await send<CollectorProductV2Page>(`/v2/products/collectors/${id}`, {
      ...options,
      method: 'GET',
      fetch,
      params: parameters,
    });
    return body;
  }
  return collectorProductsCall;
}

export function collectorsProductsWithLookAhead(fetch, collectorId, options?) {
  const apiCall = collectorProducts(fetch, options);
  async function wrapApiCall({
    lastId,
    firstId,
    isReverse,
    per_page,
    ...collectorProductFilterParameters
  }: CollectorProductBaseFilterParameters & {
    lastId?: string;
    firstId?: string;
    isReverse?: boolean;
    per_page?: number;
    sortBy?: string;
  }): Promise<{
    results: CollectorProductV2[];
    count: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }> {
    const startId = isReverse ? firstId : lastId;
    const { count, resource } = await apiCall(collectorId, {
      ...collectorProductFilterParameters,
      per_page: per_page + 1,
      startId,
      isReverse,
    });
    const hasF = resource.length > per_page;
    const hasR = Boolean(startId);
    return {
      results: isReverse ? resource.slice(-per_page) : resource.slice(0, per_page),
      count,
      hasNext: isReverse ? hasR : hasF,
      hasPrevious: isReverse ? hasF : hasR,
    };
  }
  return wrapApiCall;
}
