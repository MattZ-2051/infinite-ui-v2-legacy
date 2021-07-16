import type { CollectorProduct, Sku } from '$lib/sku-item/types';
import { get, getPage, fetchTracker } from '$lib/api';

export const loading = fetchTracker();

export async function loadCollectorProducts({
  id,
  fetch,
  query,
}: {
  id: string;
  fetch?: Fetch;
  query: URLSearchParams;
}) {
  const page: number = +query.get('page') || 1;
  const perPage: number = +query.get('perPage') || 6;
  const forSale = query.has('forSale') && query.get('forSale') === 'true';
  const sortBy: string = query.get('sortBy') || 'serialNumber:asc';
  const search: string = query.get('search') || '';

  const [sku, { data: collectors, total }] = await Promise.all([
    get<Sku>(`skus/${id}?includeFunctions=true`, { fetch }),
    getPage<CollectorProduct>(`products/collectors/${id}?includeFunctions=true`, {
      fetch,
      tracker: loading,
      params: {
        page: `${page}`,
        per_page: `${perPage}`,
        sortBy: sortBy,
        forSale: `${forSale}`,
        search: search,
      },
    }),
  ]);

  return {
    sku,
    collectors,
    forSale,
    search,
    page,
    total,
    perPage,
  };
}
