import type { Sku, CollectorProduct } from '$lib/sku-item/types';
import { get, getPage } from '$lib/api';

export async function loadSku({ id, fetch }: { id: string; fetch?: Fetch }) {
  const [sku, { total: totalCollectors, data: collectors }] = await Promise.all([
    get<Sku>(`skus/${id}?includeFunctions=true`, { fetch }),
    getPage<CollectorProduct>(`products/collectors/${id}?includeFunctions=true&page=1&per_page=100`, { fetch }),
  ]);

  const related = await getSkuRelated({ sku, fetch });

  return { sku, collectors, totalCollectors, related };
}

async function getSkuRelated({ sku, fetch }: { sku: Sku; fetch?: Fetch }): Promise<Sku[]> {
  if (!sku?.issuer?._id) {
    return [];
  }

  const related = await get<Sku[]>(`skus/tiles/?issuerId=${sku.issuer._id}&page=1&per_page=8&sortBy=startDate:1`, {
    fetch,
  });

  return related.filter((item) => item._id !== sku._id).slice(0, 4);
}
