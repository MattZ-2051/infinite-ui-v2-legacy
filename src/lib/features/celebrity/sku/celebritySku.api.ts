import type { Sku, Collector } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadSku({ id = '60a4ed28ddc7af020455d573', fetch }) {
  const [sku, collectors] = await Promise.all([
    get(`skus/${id}?includeFunctions=true`, fetch) as Promise<Sku>,
    get(`products/collectors/${id}`, fetch) as Promise<Collector[]>,
  ]);
  const related = (await get(
    `skus/tiles/?issuerId=${sku?.issuer?._id}&page=1&per_page=5&sortBy=startDate:1`,
    fetch
  )) as Sku[];
  return { sku, collectors, related };
}
