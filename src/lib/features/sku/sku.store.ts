import type { Sku, CollectorProduct } from '$lib/sku-item/types';
import type { Awaited } from 'ts-essentials';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { loadSku } from './sku.api';

export const setSku = createEvent<Awaited<ReturnType<typeof loadSkuFx>>>();

export const loadSkuFx = createEffect(async ({ id, fetch }: { id: string; fetch?: Fetch }) => {
  return await loadSku({ id, fetch });
});

// eslint-disable-next-line unicorn/no-null
export const sku = createStore<Sku>(null).on(setSku, (state, payload) => payload.sku);

export const collectors = createStore<CollectorProduct[]>([]).on(setSku, (state, payload) => payload.collectors);

export const totalCollectors = createStore<number>(0).on(setSku, (state, payload) => payload.totalCollectors);

export const related = createStore<Sku[]>([]).on(setSku, (state, payload) => payload.related);

export const skuBought = createEvent();

// TODO: recheck
forward({
  from: skuBought.map(() => ({
    id: sku.getState()._id,
  })),
  to: loadSkuFx,
});
