import type { Transaction, Product, Bid } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { browser } from '$app/env';
import { loadMyTransactions } from '$lib/features/wallet/wallet.api';
import { createPolling } from '$util/effector';
import { loadProduct, loadProductTransactions } from './product.api';
import { hasActiveAuction } from './product.service';
import { loadProductBids } from './auction/auction.api';
import { skuBought, sku } from '../sku/sku.store';

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
export const productBought = createEvent<{ product: Product }>();

forward({
  from: [saleStarted, saleCancelled, productBought],
  to: refetchProductFx,
});

export const auctionStarted = createEvent<{ product: Product }>();
export const auctionCancelled = createEvent<{ listingId: string }>();
export const auctionEnded = createEvent();

forward({
  from: [auctionStarted, auctionCancelled, auctionEnded],
  to: refetchProductFx,
});

const pollTransactionFx = createEffect(async () => {
  return await loadMyTransactions({ page: 1 });
});

export const pendingBuyCreated = createEvent<string>();
export const polls = createStore({}).on(pendingBuyCreated, (state, payload) => {
  const fx = createEffect(() => {
    pollTransactionFx();
  });
  const poll = createPolling(fx);
  poll.start();
  return { ...state, [payload]: poll };
});

pollTransactionFx.doneData.watch((response) => {
  if (response.transactions.length > 0) {
    if (product.getState() !== null) {
      const $product = product.getState();
      const pendingTx = response.transactions.find((tx) => {
        return tx.transactionData.listing === $product.listing._id;
      });

      if (pendingTx.status === 'success') {
        const $polls = polls.getState();
        $polls[$product._id].stop();
        productBought({ product: $product });
      }
    } else {
      const $sku = sku.getState();
      const pendingTx = response.transactions.find((tx) => {
        return tx.transactionData.listing === $sku.activeSkuListings[0]._id;
      });
      if (pendingTx.status === 'success') {
        const $polls = polls.getState();
        $polls[$sku._id].stop();
        skuBought();
      }
    }
  }
});
