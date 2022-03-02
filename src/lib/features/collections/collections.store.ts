import type { Sku } from '$lib/sku-item/types';
import type { SkuCollection } from './types';
import type { Awaited } from 'ts-essentials';
import { createEffect, createStore, createEvent } from 'effector';
import { getSkuOnly } from '$lib/features/sku/sku.api';
import { loadAllSkuCollections, loadSkuCollection } from './collections.api';

export const loadAllSkuCollectionsFx = createEffect(
  async ({
    fetch,
  }: {
    fetch: Fetch;
  }): Promise<{
    collections: SkuCollection[];
  }> => {
    return await loadAllSkuCollections({ fetch });
  }
);

export const setAllSkuCollections = createEvent<Awaited<ReturnType<typeof loadAllSkuCollectionsFx>>>();

// eslint-disable-next-line unicorn/no-null
export const allSkuCollections = createStore<SkuCollection[]>(null).on(
  setAllSkuCollections,
  (state, payload) => payload.collections
);

export const loadSkuCollectionFx = createEffect(
  async ({
    collectionId,
    fetch,
  }: {
    collectionId: string;
    fetch: Fetch;
  }): Promise<{
    collection: SkuCollection;
  }> => {
    return await loadSkuCollection({ collectionId, fetch });
  }
);

export const setSkuCollection = createEvent<Awaited<ReturnType<typeof loadSkuCollectionFx>>>();

// eslint-disable-next-line unicorn/no-null
export const skuCollection = createStore<SkuCollection>(null).on(
  setSkuCollection,
  (state, payload) => payload.collection
);

export const loadSkuCollectionFeaturedFx = createEffect(async ({ id }: { id: string }) => {
  const response = await getSkuOnly({ id });
  return response;
});

// eslint-disable-next-line unicorn/no-null
export const skuCollectionFeatured = createStore<Sku>(null).on(
  loadSkuCollectionFeaturedFx.doneData,
  (state, payload) => payload
);
