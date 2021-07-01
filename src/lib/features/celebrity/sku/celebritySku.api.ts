import type { Sku, Collector } from '$lib/sku-item/types';
import { get, getPage } from '$lib/api';

export async function loadSku({ id, fetch }: { id: string; fetch?: Fetch }) {
  const [sku, { total: totalCollectors, data: collectors }] = await Promise.all([
    get<Sku>(`skus/${id}?includeFunctions=true`, { fetch }),
    getPage<Collector>(`products/collectors/${id}`, { params: { page: '1', per_page: '4' }, fetch }),
  ]);
  const related = await get<Sku[]>(`skus/tiles/?issuerId=${sku?.issuer?._id}&page=1&per_page=4&sortBy=startDate:1`, {
    fetch,
  });
  return { sku, collectors, totalCollectors, related };
}
