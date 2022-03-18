import type { Sku } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadSku({ id, fetch }: { id: string; fetch?: Fetch }) {
  const sku = await getSkuOnly({ id, fetch });

  const related = await getSkuRelated({ sku, fetch });

  return { sku, related };
}

export async function getSkuOnly({ id, fetch }: { id: string; fetch?: Fetch }) {
  return get<Sku>(`skus/${id}?includeFunctions=true`, { fetch });
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

export async function getNumberOfSkus({ id, fetch }: { id: string; fetch?: Fetch }): Promise<number> {
  return await get(`listings/${id}/supply-left`, { fetch });
}
