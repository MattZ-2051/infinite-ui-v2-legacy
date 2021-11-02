import type { CollectorProduct, Sku } from '$lib/sku-item/types';
import { get, getPage, fetchTracker } from '$lib/api';

export const loading = fetchTracker();

const getSaleType = (saleType: string) => (saleType === 'forSale' ? { forSale: 'true' } : { saleType });

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
  const sortBy: string = query.get('sortBy') || 'serialNumber:asc';
  const search: string = query.get('search') || '';
  const saleType: string = query.get('saleType') || '';

  const [sku, { data: collectors, total }] = await Promise.all([
    get<Sku>(`skus/${id}?includeFunctions=true`, { fetch }),
    getPage<CollectorProduct>(`products/collectors/${id}?includeFunctions=true`, {
      fetch,
      tracker: loading,
      params: {
        page: `${page}`,
        per_page: `${perPage}`,
        sortBy: sortBy,
        ...(saleType && getSaleType(saleType)),
        ...(search && { search }),
      },
    }),
  ]);

  return {
    sku,
    collectors,
    search,
    page,
    total,
    perPage,
  };
}
