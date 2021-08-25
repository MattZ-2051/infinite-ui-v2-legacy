import { createEffect, createStore, createEvent, forward } from 'effector';
import type { Sku, CollectorProduct } from '$lib/sku-item/types';
import { loadSku } from './sku.api';

export const clearSku = createEvent();

export const loadSkuFx = createEffect(async ({ id, fetch }: { id: string; fetch?: Fetch }) => {
  return await loadSku({ id, fetch });
});

// eslint-disable-next-line unicorn/no-null
export const sku = createStore<Sku>(null)
  .on(loadSkuFx.doneData, (state, payload) => payload.sku)
  .reset(clearSku);

export const collectors = createStore<CollectorProduct[]>([])
  .on(loadSkuFx.doneData, (state, payload) => payload.collectors)
  .reset(clearSku);

export const totalCollectors = createStore<number>(0)
  .on(loadSkuFx.doneData, (state, payload) => payload.totalCollectors)
  .reset(clearSku);

export const related = createStore<Sku[]>([])
  .on(loadSkuFx.doneData, (state, payload) => payload.related)
  .reset(clearSku);

export const skuBought = createEvent();

forward({
  from: skuBought.map(() => ({
    id: sku.getState()._id,
  })),
  to: loadSkuFx,
});
