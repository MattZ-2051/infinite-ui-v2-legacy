import type { Awaited } from 'ts-essentials';
import type { Transaction, Product, Bid, TransactionData } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward } from 'effector';
import { browser } from '$app/env';
import { getQueryParameters } from '$util/queryParameter';
import { loadMyTransactions } from '$lib/features/wallet/wallet.api';
import { createPolling } from '$util/effector';
import routes from '$project/routes';
import { toast } from '$ui/toast';
import { loadProduct, loadProductTransactions } from './product.api';
import { hasActiveAuction, hasAuction } from './product.service';
import { loadProductBids } from './auction/auction.api';
import { skuBought, sku } from '../sku/sku.store';

export const setProduct = createEvent<Awaited<ReturnType<typeof fetchProductFx>> & { oldProductId: string | null }>();
export const setProductBids = createEvent<{ data: Bid[]; total: number; max: number }>();

export const fetchProductFx = createEffect(
  async ({
    id,
    tab,
    page,
    force,
    fetch,
  }: {
    id: string;
    tab: 'auction' | 'history' | 'owner';
    page: number;
    force?: boolean;
    fetch?: Fetch;
  }) => {
    const current = product.getState() as Product;
    const product_ = !browser || id !== current?._id || force ? await loadProduct({ id, fetch }) : current;

    if (!tab) {
      tab = hasAuction(product_) ? 'auction' : 'history';
    }

    let response: {
      product: Product;
      totalProductTransactions?: number;
      productTransactions?: Transaction[];
      productBids?: Bid[];
      totalProductBids?: number;
      maxProductBid?: number;
      tab: 'auction' | 'history' | 'owner';
    } = { product: product_, tab };

    if (tab === 'history') {
      const { data, total } = await fetchProductTransactionsFx({ id, page, fetch });
      response = { ...response, productTransactions: data, totalProductTransactions: total };
    }
    if (tab === 'auction' && hasActiveAuction(product_)) {
      const { data, total, max } = await fetchProductBidsFx({ id: product_.activeProductListings[0]._id, page, fetch });
      response = { ...response, productBids: data, totalProductBids: total, maxProductBid: max };
    }

    return response;
  }
);

export const refetchProductFx = createEffect(async () => {
  const current = product.getState();

  const queryParameters = getQueryParameters();
  const page = +queryParameters.get('page') || 1;
  const tab = queryParameters.get('tab') as 'auction' | 'history' | 'owner';

  const id = current._id;
  const data = await fetchProductFx({ id, tab, page, force: true });
  // eslint-disable-next-line unicorn/no-null
  setProduct({ ...data, oldProductId: id || null });
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
export const product = createStore<Product>(null).on(setProduct, (state, payload) => payload.product);

export const transactions = createStore<Transaction[]>([]).on(setProduct, (state, payload) =>
  'productTransactions' in payload ? payload.productTransactions : state
);

export const totalTransactions = createStore<number>(0).on(setProduct, (state, payload) =>
  'totalProductTransactions' in payload ? payload.totalProductTransactions : state
);

export const bids = createStore<Bid[]>([])
  .on(setProduct, (state, payload) => ('productBids' in payload ? payload.productBids : state))
  .on(setProductBids, (state, payload) => payload.data);

export const totalBids = createStore<number>(0)
  .on(setProduct, (state, payload) => ('totalProductBids' in payload ? payload.totalProductBids : state))
  .on(setProductBids, (state, payload) => payload.total);

// eslint-disable-next-line unicorn/no-null
export const maxPlacedBid = createStore<number | null>(null)
  .on(setProduct, (state, payload) => {
    if (state === null) return payload.maxProductBid || 0;
    if (payload.oldProductId === null || payload.oldProductId !== payload.product._id)
      return payload.maxProductBid || 0;
    if (payload.maxProductBid) return 0;
    return payload.maxProductBid > state ? payload.maxProductBid : state;
  })
  .on(setProductBids, (state, payload) => payload.max);

export const saleStarted = createEvent<{ product: Product }>();
export const saleCancelled = createEvent<{ listingId: string }>();
export const productBought = createEvent<{ product: Product }>();

forward({
  from: [saleStarted, saleCancelled],
  to: refetchProductFx,
});

forward({
  from: productBought,
  to: refetchProductFx,
});

export const productRedeemed = createEvent();

forward({
  from: productRedeemed,
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

pollTransactionFx.doneData.watch(async (response) => {
  if (response.transactions.length > 0) {
    if (product.getState() !== null) {
      //buying a product
      const $product = product.getState();
      const pendingTx = response.transactions.find((tx) => {
        return tx.transactionData.product._id === $product._id;
      });

      if (pendingTx?.status === 'success') {
        const $polls = polls.getState();
        if ($polls[$product._id].$isActive) {
          //added check to avoid having more than one message due to race conditions (not best solution but will do for now.)
          $polls[$product._id].stop();
          transactionSuccessMessage();
          await refetchProductFx();
        }
      }
      if (pendingTx?.status === 'error') {
        const $polls = polls.getState();
        if ($polls[$product._id].$isActive) {
          $polls[$product._id].stop();
          toast.danger(
            `Unfortunately, there was an issue completing the purchase.  Please try again later or <a href=${routes.help}>contact support</a> if the issue persists.`
          );
        }
      }
    } else {
      //buying a sku
      const $sku = sku.getState();
      const pendingTx = response.transactions.find((tx) => {
        return tx.transactionData.listing === $sku.activeSkuListings[0]._id;
      });

      if (pendingTx?.status === 'success') {
        const $polls = polls.getState();
        $polls[$sku._id].stop();
        skuBought();
        const transactionData = pendingTx.transactionData;
        transactionSuccessMessage(transactionData);
      }
      if (pendingTx?.status === 'error') {
        const $polls = polls.getState();
        $polls[$sku._id].stop();
        toast.danger(
          '"Unfortunately, there was an issue completing the purchase.  Please try again later or <a href=${routes.help}>contact support</a> if the issue persists."'
        );
      }
    }
  }
});

const transactionSuccessMessage = (transactionData?: TransactionData) => {
  toast.success(
    `Congrats! Your NFT purchase was processed successfully!` +
      (!transactionData
        ? ''
        : ` Click <a href=${routes.product(transactionData.product._id)}>here</a> to view your new collectible: ${
            transactionData.sku.name
          } #${transactionData.product.serialNumber}.`)
  );
};

const productBoughtSuccessFx = createEffect(() => {
  toast.success('Your order has been completed.');
});

forward({
  from: [productBought],
  to: productBoughtSuccessFx,
});
