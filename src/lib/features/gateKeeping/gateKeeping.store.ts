import { createEffect, createStore, createEvent } from 'effector';
import type { Sku } from '$lib/sku-item/types';
import { checkRequiredSkus } from './gateKeeping.api';

export const setRequiredSkus = createEvent<Sku[]>();

export const clearRequiredSkus = createEvent();

export const gateKeepSkus = createStore<Sku[]>([])
  .on(setRequiredSkus, (state, payload) => payload)
  .reset(clearRequiredSkus);

export const fetchRequiredSkus = createEffect(async ({ skuId, ownerId }: { skuId: string; ownerId: string }) => {
  const { skus } = await checkRequiredSkus({ skuId, ownerId });
  setRequiredSkus(skus);
});
