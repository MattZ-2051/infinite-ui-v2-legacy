import type { Sku, Collector } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadSku({ id, fetch }: { id: string; fetch?: Fetch }) {
  const [sku, collectors] = await Promise.all([
    get<Sku>(`skus/${id}?includeFunctions=true`, { fetch }),
    get<Collector[]>(`products/collectors/${id}`, { fetch }),
  ]);
  const related = await get<Sku[]>(
    `skus/tiles/?issuerId=${sku?.issuer?._id}&page=1&per_page=5&sortBy=startDate:1`,
    { fetch }
  );
  return { sku, collectors, related };
}
