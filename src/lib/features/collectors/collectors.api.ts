import type { Sku } from '$lib/sku-item/types';
import { get, fetchTracker } from '$lib/api';
import { collectorsProductsWithLookAhead } from '$lib/infinite-api-sdk';

export const loading = fetchTracker();

const getSaleType = (saleType, mintStatus) => {
  if (mintStatus) return '';
  if (saleType === '') return { forSale: 'true' };
  if (saleType === 'all') return '';
  return { saleType };
};

const getMintStatus = (mintStatus) => {
  if (mintStatus === 'all') return '';
  if (mintStatus === 'minted') return { mintStatus: 'minted' };
};
export async function loadCollectorProducts({
  id,
  fetch,
  query,
}: {
  id: string;
  fetch?: Fetch;
  query: URLSearchParams;
}) {
  const perPage: number = +query.get('perPage') || 6;
  const sortBy: string = query.get('sortBy') || 'serialNumber:asc';
  const search: string = query.get('search') || '';
  const saleType: string = query.get('saleType') || '';
  const mintStatus: string = query.get('mintStatus') || '';
  const lastId = query.get('lastId') || undefined;
  const firstId = query.get('firstId') || undefined;
  const isReverseIn = query.get('isReverse');
  const isReverse: boolean = isReverseIn === 'true';

  id = '6128014df885a1741f1903a9';
  const productsCollectorsCaller = collectorsProductsWithLookAhead(fetch, id, { tracker: loading });
  const [sku, { results: collectors, hasNext, hasPrevious }] = await Promise.all([
    get<Sku>(`skus/${id}?includeFunctions=true`, { fetch }),
    productsCollectorsCaller({
      lastId,
      firstId,
      isReverse,
      per_page: perPage,
      sortBy,
      ...getMintStatus(mintStatus),
      ...getSaleType(saleType, mintStatus),
      ...(search && { search }),
    }),
  ]);

  return {
    sku,
    collectors,
    search,
    hasNext,
    hasPrevious,
  };
}
