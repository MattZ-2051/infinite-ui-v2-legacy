import type { Sku, Profile, Series } from './sku-item/types';
import { send } from './api';

export function skuTiles(fetch, options?) {
  async function skuTilesCall(
    page?: number,
    per_page?: number,
    sortBy?: string, // ToDO: possible values are startDate:1 startDate:-1 startDate:-1
    forSale?: boolean,
    status?: string, // ToDo: possible values are upcoming
    category?: string,
    typeEdition?: string,
    series?: string,
    issuerId?: string,
    minPrice?: number,
    maxPrice?: number,
    startDate?: string,
    endDate?: string,
    search?: string,
    saleType?: string,
    currency?: string,
    featured?: boolean,
    includeFunctions?: boolean
  ): Promise<{
    docs: Sku[];
    count: number;
    creators: Profile[];
    series: Series[];
    categories: Sku[];
    maxPrice: number;
  }> {
    const parameters = Object.fromEntries(
      Object.entries({
        page: page && Number(page).toString(10),
        per_page: per_page && Number(per_page).toString(10),
        sortBy,
        featured: featured && Boolean(featured).toString(),
        includeFunctions: includeFunctions && Boolean(includeFunctions).toString(),
        forSale: forSale && Boolean(forSale).toString(),
        status,
        category,
        typeEdition,
        series,
        issuerId,
        minPrice: minPrice && Number(minPrice).toString(10),
        maxPrice: maxPrice && Number(maxPrice).toString(10),
        startDate,
        endDate,
        search,
        saleType,
        currency,
      }).filter(([, value]) => value !== undefined)
    );
    const {
      body: { docs, count, aggregations },
    } = await send<{
      docs: Sku[];
      count: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      aggregations: Record<string, any>;
    }>('skus/tiles-no-headers', {
      ...options,
      method: 'GET',
      fetch,
      params: parameters,
    });
    const { maxSkusMinPrice, creators, editions, categories } = aggregations || {};
    return {
      docs,
      count,
      creators: creators as Profile[],
      series: editions as Series[],
      categories: categories as Sku[],
      maxPrice: maxSkusMinPrice,
      // creators: JSON.parse(creators),
      // series: JSON.parse(editions),
      // categories: JSON.parse(categories),
      // maxPrice: JSON.parse(maxSkusMinPrice),
    };
  }
  return skuTilesCall;
}
