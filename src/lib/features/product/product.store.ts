import type { Transaction, Product, Bid } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { browser } from '$app/env';
import { loadProduct, loadProductTransactions } from './product.api';
import { hasActiveAuction } from './product.service';
import { loadProductBids } from './auction/auction.api';

export const clearProduct = createEvent();

export const fetchProductFx = createEffect(
  async ({ id, tab, page, fetch }: { id: string; tab: 'auction' | 'history'; page: number; fetch?: Fetch }) => {
    const current = product.getState() as Product;
    const product_ = !browser || id !== current?._id ? await loadProduct({ id, fetch }) : current;

    if (tab === 'history' || !tab) {
      await fetchProductTransactionsFx({ id, page, fetch });
    }

    if ((tab === 'auction' || !tab) && hasActiveAuction(product_)) {
      await fetchProductBidsFx({ id: product_.activeProductListings[0]._id, page, fetch });
    }

    return product_;
  }
);

export const refetchProductFx = createEffect(async (): Promise<Product> => {
  const current = product.getState();
  return await loadProduct({ id: current._id });
});

export const fetchProductTransactionsFx = createEffect(
  async ({
    id,
    page,
    fetch,
  }: {
    id: string;
    page: number;
    fetch?: Fetch;
  }): Promise<{ total: number; data: Transaction[] }> => {
    return await loadProductTransactions({ id, page, fetch });
  }
);

export const fetchProductBidsFx = createEffect(
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

// eslint-disable-next-line unicorn/no-null
export const product = createStore<Product>(null)
  .on(fetchProductFx.doneData, (state, payload) => payload)
  .on(refetchProductFx.doneData, (state, payload) => payload)
  .reset(clearProduct);

export const transactions = createStore<Transaction[]>([])
  .on(fetchProductTransactionsFx.doneData, (state, payload) => payload.data)
  .reset(clearProduct);

export const totalTransactions = createStore<number>(0)
  .on(fetchProductTransactionsFx.doneData, (state, payload) => payload.total)
  .reset(clearProduct);

export const bids = createStore<Bid[]>([])
  .on(fetchProductBidsFx.doneData, (state, payload) => payload.data)
  .reset(clearProduct);

export const totalBids = createStore<number>(0)
  .on(fetchProductBidsFx.doneData, (state, payload) => payload.total)
  .reset(clearProduct);

export const maxPlacedBid = createStore<number>(0)
  .on(fetchProductBidsFx.doneData, (state, payload) => (payload.max && payload.max > state ? payload.max : state))
  .reset(clearProduct);

export const saleStarted = createEvent<{ product: Product }>();
export const saleCancelled = createEvent<{ listingId: string }>();

forward({
  from: [saleStarted, saleCancelled],
  to: refetchProductFx,
});

export const auctionStarted = createEvent<{ product: Product }>();
export const auctionCancelled = createEvent<{ listingId: string }>();

forward({
  from: [auctionStarted, auctionCancelled],
  to: refetchProductFx,
});
