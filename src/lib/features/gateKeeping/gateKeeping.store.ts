import { createEffect, createStore, createEvent } from 'effector';
import type { GateKeepingSku, GateKeepingType } from './types';
import { checkRequiredSkus } from './gateKeeping.api';

export const setRequiredSkus = createEvent<GateKeepingSku[]>();
export const setGateKeepType = createEvent<GateKeepingType>();

export const clearRequiredSkus = createEvent();

export const gateKeepSkus = createStore<GateKeepingSku[]>([])
  .on(setRequiredSkus, (state, payload) => payload)
  .reset(clearRequiredSkus);

export const gateKeepType = createStore<GateKeepingType>('empty')
  .on(setGateKeepType, (state, payload) => payload)
  .reset(clearRequiredSkus);

export const fetchRequiredSkus = createEffect(async ({ skuId }: { skuId: string }) => {
  const { skus, type } = await checkRequiredSkus({ skuId });
  setRequiredSkus(skus);
  setGateKeepType(type);
});
