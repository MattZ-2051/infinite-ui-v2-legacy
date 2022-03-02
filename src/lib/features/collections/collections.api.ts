import type { SkuCollection } from './types';
import { get } from '$lib/api';

export const loadAllSkuCollections = async ({
  fetch,
}: {
  fetch?: Fetch;
}): Promise<{ collections: SkuCollection[] }> => {
  const collections = await get<SkuCollection[]>(`skuCollections`, { fetch });

  return { collections };
};

export const loadSkuCollection = async ({
  collectionId,
  fetch,
}: {
  collectionId: string;
  fetch?: Fetch;
}): Promise<{ collection: SkuCollection }> => {
  const collection = await get<SkuCollection>(`skuCollections/${collectionId}`, { fetch });

  return { collection };
};
