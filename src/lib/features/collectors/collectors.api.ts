import type { Collector, Sku } from '$lib/sku-item/types';
import { get, send } from '$lib/api';

export async function loadCollectors({ id, fetch, query }: { id: string; fetch?: Fetch; query: URLSearchParams }) {
  const page: number = +query.get('page') || 1;
  const perPage: number = +query.get('perPage') || 6;
  const forSale = query.has('forSale') && query.get('forSale') === 'true';
  const sort: string = query.get('sort') || 'asc';
  const search: string = query.get('search') || '';

  const [sku, response] = await Promise.all([
    get<Sku>(`skus/${id}?includeFunctions=true`, { fetch }),
    send(`products/collectors/${id}?includeFunctions=true`, {
      fetch,
      params: {
        page: `${page}`,
        per_page: `${perPage}`,
        sortBy: `serialNumber:${sort}`,
        forSale: `${forSale}`,
        search: search,
      },
    }),
  ]);
  const { headers } = response;
  const total = +headers.get('content-range').split('/')[1];

  const collectors: Collector[] = await response.json();

  return {
    sku,
    collectors,
    forSale,
    search,
    page,
    sort,
    total,
    perPage,
  };
}
