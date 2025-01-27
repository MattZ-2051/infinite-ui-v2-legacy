import type { Sku } from '$lib/sku-item/types';
import type { SkuV2, CollectorProductV2 } from '$lib/infinite-api-sdk/types';
import type { Awaited } from 'ts-essentials';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { loadSku } from './sku.api';

export const setSku = createEvent<Awaited<ReturnType<typeof loadSkuFx>>>();

export const loadSkuFx = createEffect(async ({ id, fetch }: { id: string; fetch?: Fetch }) => {
  return loadSku({ id, fetch });
});

// eslint-disable-next-line unicorn/no-null
export const sku = createStore<Sku>(null).on(setSku, (state, payload) => payload.sku);

export const collectors = createStore<CollectorProductV2[]>([]).on(setSku, (state, payload) => payload.sku.products);

export const totalCollectors = createStore<number>(0).on(setSku, (state, payload) => payload.sku?.circulatingSupply);

export const related = createStore<SkuV2[]>([]).on(setSku, (state, payload) => payload.related);

export const skuBought = createEvent();

export const refetchSkuFx = createEffect(async () => {
  const id = sku.getState()?._id;
  if (id) {
    const data = await loadSkuFx({ id });
    setSku(data);
  }
});

forward({
  from: skuBought,
  to: refetchSkuFx,
});
