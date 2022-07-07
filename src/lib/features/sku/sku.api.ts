import type { Sku, CreateSkusDto } from '$lib/sku-item/types';
import type { SkuV2 } from '$lib/infinite-api-sdk/types';
import { get, post } from '$lib/api';
import { skuTiles } from '$lib/infinite-api-sdk';
import { loading } from '$lib/features/marketplace/marketplace.api';
import { ENABLE_RELATED_SKUS } from '$project/variables';

export async function loadSku({ id, fetch }: { id: string; fetch?: Fetch }) {
  const sku = await getSkuOnly({ id, fetch });

  const related = ENABLE_RELATED_SKUS ? await getSkuRelated({ sku, fetch }) : [];

  return { sku, related };
}

export async function getSkuOnly({ id, fetch }: { id: string; fetch?: Fetch }) {
  return get<Sku>(`skus/${id}?includeFunctions=true`, { fetch });
}

async function getSkuRelated({ sku, fetch }: { sku: Sku; fetch?: Fetch }): Promise<SkuV2[]> {
  if (!sku?.issuer?._id) {
    return [];
  }

  const { body: related } = await skuTiles(fetch, { tracker: loading })({
    per_page: 8,
    sortBy: 'startDate:1',
    issuerId: sku.issuer._id,
    condition: 'all',
  });

  return related.filter((item) => item._id !== sku._id).slice(0, 4);
}

export async function getNumberOfSkus({ id, fetch }: { id: string; fetch?: Fetch }): Promise<number> {
  return await get(`listings/${id}/supply-left`, { fetch });
}

export function createSku(sku: CreateSkusDto): Promise<Sku> {
  return post('/skus', sku);
}

export function uploadAsset(asset: {
  fileName: string;
  tenant: string;
  assetType: 'public' | 'private';
}): Promise<{ presignedUrl: string; attachmentUrl: string }> {
  return post('/skus/assets', asset);
}
