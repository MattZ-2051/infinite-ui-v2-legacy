import type { Sku, Profile, Series } from '$lib/sku-item/types';
import { getPage, fetchTracker } from '$lib/api';

export const loading = fetchTracker();

const getModeParameters = (status: string) => {
  if (!status) {
    return { forSale: 'true' };
  }
  if (status === 'soldout') {
    return { forSale: 'false' };
  }
  if (status === 'upcoming') {
    return { status: 'upcoming' };
  }
};

export async function loadMarketplaceFilters({
  fetch,
  query,
}: {
  fetch: Fetch;
  query: URLSearchParams;
}): Promise<{ maxPrice: number; creators: Profile[]; series: Series[]; categories: Sku[] }> {
  const mode = getModeParameters(query.get('mode'));
  const { headers } = await getPage<Sku>(`skus/tiles/`, {
    fetch,
    params: {
      page: '1',
      per_page: '1',
      ...mode,
    },
  });
  return {
    creators: JSON.parse(headers.get('skus-creators')),
    series: JSON.parse(headers.get('skus-editions')),
    categories: JSON.parse(headers.get('skus-categories')),
    maxPrice: +headers.get('max-skus-min-price'),
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
  const mode = getModeParameters(query.get('mode'));
  const category: string = query.get('category');
  const typeEdition: string = query.get('typeEdition');
  const series: string = query.get('series');
  const issuerId: string = query.get('issuerId');
  const minPrice: string = query.get('minPrice');
  const maxPrice: string = query.get('maxPrice');
  const startDate: string = query.get('startDate');
  const endDate: string = query.get('endDate');
  const search: string = query.get('search');
  const sortBy: string = query.get('sortBy') || 'startDate:1';
  const saleType: string = query.get('saleType');
  const { data, total } = await getPage<Sku>(`skus/tiles/`, {
    fetch,
    tracker: loading,
    params: {
      page: `${page}`,
      per_page: `${perPage}`,
      sortBy,
      ...mode,
      ...(category && { category }),
      ...(typeEdition && { typeEdition }),
      ...(series && { series }),
      ...(issuerId && { issuerId }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(search && { search }),
      ...(saleType && { saleType }),
    },
  });

  return {
    data,
    total,
  };
}
