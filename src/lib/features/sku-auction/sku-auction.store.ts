import type { Awaited } from 'ts-essentials';
import type { Bid, Sku } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { browser } from '$app/env';
import { getQueryParameters } from '$util/queryParameter';
import { getSkuOnly } from '$lib/features/sku/sku.api';
import { loadProductBids } from './auction/auction.api';

export const setSkuAuction = createEvent<Awaited<ReturnType<typeof loadSkuAuctionFx>> & { oldId: string | null }>();

export const loadSkuAuctionFx = createEffect(
  async ({ id, page, force, fetch }: { id: string; page: number; force?: boolean; fetch?: Fetch }) => {
    const current = skuAuction.getState() as Sku;
    const sku_ = !browser || id !== current?._id || force ? await getSkuOnly({ id, fetch }) : current;

    const response: {
      sku: Sku;
      productBids?: Bid[];
      totalProductBids?: number;
      maxProductBid?: number;
    } = { sku: sku_ };

    let data;
    let total;
    let max;
    if (sku_.activeSkuListings[0]) {
      const rr = await fetchSkuBidsFx({ id: sku_.activeSkuListings[0]._id, page, fetch });
      data = rr.data;
      total = rr.total;
      max = rr.max;
    } else {
      data = [];
      total = 0;
      max = 0;
    }
    return { ...response, productBids: data, totalProductBids: total, maxProductBid: max };
  }
);

// eslint-disable-next-line unicorn/no-null
export const skuAuction = createStore<Sku>(null).on(setSkuAuction, (state, payload) => payload.sku);

export const setSkuBids = createEvent<{ data: Bid[]; total: number; max: number }>();

export const refetchSkuFx = createEffect(async () => {
  const current = skuAuction.getState();

  const queryParameters = getQueryParameters();
  const page = +queryParameters.get('page') || 1;

  const id = current._id;
  const data = await loadSkuAuctionFx({ id, page, force: true });
  // eslint-disable-next-line unicorn/no-null
  setSkuAuction({ ...data, oldId: id || null });
});

export const fetchSkuBidsFx = createEffect(
  async ({
    id,
    page,
    fetch,
  }: {
    id: string;
    page: number;
    fetch?: Fetch;
  }): Promise<{
    data: Bid[];
    total: number;
    max: number;
  }> => {
    return await loadProductBids({ id, page, fetch });
  }
);

export const bids = createStore<Bid[]>([])
  .on(setSkuAuction, (state, payload) => ('productBids' in payload ? payload.productBids : state))
  .on(setSkuBids, (state, payload) => payload.data);

export const totalBids = createStore<number>(0)
  .on(setSkuAuction, (state, payload) => ('totalProductBids' in payload ? payload.totalProductBids : state))
  .on(setSkuBids, (state, payload) => payload.total);

// eslint-disable-next-line unicorn/no-null
export const maxPlacedBid = createStore<number | null>(null)
  .on(setSkuAuction, (state, payload) => {
    if (state === null) return payload.maxProductBid || 0;
    if (payload.oldId === null || payload.oldId !== payload.sku._id) return payload.maxProductBid || 0;
    if (payload.maxProductBid) return 0;
    return payload.maxProductBid > state ? payload.maxProductBid : state;
  })
  .on(setSkuBids, (state, payload) => payload.max);

export const auctionStarted = createEvent<{ sku: Sku }>();
export const auctionCancelled = createEvent<{ listingId: string }>();
export const auctionEnded = createEvent();

forward({
  from: [auctionStarted, auctionCancelled, auctionEnded],
  to: refetchSkuFx,
});
