import type { Awaited } from 'ts-essentials';
import type { Transaction, Product, Bid, TransactionData, Sku } from '$lib/sku-item/types';
import { createEffect, createStore, createEvent, forward, Event, Store, merge } from 'effector';
import type { TxStatus } from '$lib/payment/crypto/etherscan/types';
import { browser } from '$app/env';
import { getQueryParameters } from '$util/queryParameter';
import { loadMyTransactions } from '$lib/features/wallet/wallet.api';
import { createPolling } from '$util/effector';
import routes from '$project/routes';
import { toast } from '$ui/toast';
import { getTxStatus } from '$lib/payment/crypto/etherscan';
import { loadProduct, loadProductTransactions } from './product.api';
import { hasActiveAuction, hasAuction } from './product.service';
import { loadProductBids } from './auction/auction.api';
import { skuBought, sku, refetchSkuFx } from '../sku/sku.store';
import { productBoughtCheckout } from '../checkout/checkout.store';
import { handleCheckoutStateChange } from '../checkout/checkout.service';

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

    if (tab === 'owner' && hasActiveAuction(product_)) {
      const { max } = await fetchProductBidsFx({ id: product_.activeProductListings[0]._id, page, fetch });
      response = { ...response, maxProductBid: max };
    }
    if (tab === 'history') {
      const { data, total } = await fetchProductTransactionsFx({ id, page, fetch });
      response = { ...response, productTransactions: data, totalProductTransactions: total };
      if (hasActiveAuction(product_)) {
        const { max } = await fetchProductBidsFx({ id: product_.activeProductListings[0]._id, page, fetch });
        response = { ...response, maxProductBid: max };
      }
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

export const refetchProductTransactionsFx = createEffect(async (): Promise<{ total: number; data: Transaction[] }> => {
  const current = product.getState();
  const query = getQueryParameters();
  return await loadProductTransactions({ id: current._id, page: +query.get('page') || 1 });
});

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

export const transactions = createStore<Transaction[]>([])
  .on(setProduct, (state, payload) => ('productTransactions' in payload ? payload.productTransactions : state))
  .on(refetchProductTransactionsFx.doneData, (state, payload) => {
    return payload.data;
  });

export const totalTransactions = createStore<number>(0)
  .on(setProduct, (state, payload) =>
    'totalProductTransactions' in payload ? payload.totalProductTransactions : state
  )
  .on(refetchProductTransactionsFx.doneData, (state, payload) => payload.total);

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

export const saleStarted = createEvent<{ product?: Product; sku?: Sku }>();
export const saleCancelled = createEvent<{ product?: Product; sku?: Sku; listingId: string }>();
export const productBought = createEvent<{ product: Product }>();
export const productTransferred = createEvent<{ product: Product }>();

merge([saleStarted, saleCancelled]).watch(async (sale) => {
  sale.product ? await refetchProductFx() : await refetchSkuFx();
});

const productBoughtFx = createEffect(async () => {
  return await Promise.all([refetchProductFx(), refetchProductTransactionsFx()]);
});

forward({
  from: productBought,
  to: refetchProductFx,
});

const productTransferredFx = createEffect(async () => {
  return await Promise.all([refetchProductFx(), refetchProductTransactionsFx()]);
});

forward({
  from: productTransferred,
  to: productTransferredFx,
});

export const productRedeemed = createEvent();

forward({
  from: productRedeemed,
  to: refetchProductFx,
});

export const auctionStarted = createEvent<{ product?: Product; sku?: Sku }>();
export const auctionCancelled = createEvent<{ product?: Product; sku?: Sku; listingId: string }>();
export const auctionEnded = createEvent<{ product?: Product; sku?: Sku }>();

merge([auctionStarted, auctionCancelled, auctionEnded]).watch(async (sale) => {
  sale.product ? await refetchProductFx() : await refetchSkuFx();
});

const pollTransactionFx = createEffect(async () => {
  return await loadMyTransactions({ page: 1 });
});

export const pendingBuyCreated = createEvent<string>();
const failedTransaction = createEvent<void>(); //Event to add failed attempt
const resetFails = createEvent<void>(); //event to reset failed attempts.
const failAttempts = createStore(0).on(failedTransaction, (numberOfAttempts) => {
  //store created to count the number of failed attempts to stop
  return numberOfAttempts + 1;
});
failAttempts.on(resetFails, () => 0);

export const polls = createStore({}).on(pendingBuyCreated, (state, payload) => {
  const poll = createPolling(pollTransactionFx, 1500);
  poll.start();
  resetFails();
  return { ...state, [payload]: poll };
});

pollTransactionFx.fail.watch(() => {
  //in case the call gets an error re try at least 5 times.
  if (failAttempts.getState() < 5) {
    const $polls = polls.getState();
    $polls[product.getState()._id || sku.getState()._id].start();
  }
  failedTransaction();
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
          productBoughtCheckout({ id: pendingTx.transactionData.product._id });
          handleCheckoutStateChange('success');
          transactionSuccessMessage(pendingTx.transactionData);
          await productBoughtFx();
        }
      }
      if (pendingTx?.status === 'error') {
        const $polls = polls.getState();
        handleCheckoutStateChange('error');
        if ($polls[$product._id].$isActive) {
          $polls[$product._id].stop();
          toast.danger(
            `Unfortunately, there was an issue completing the purchase.  Please try again later or <a href=${routes.help} class="font-bold">contact support</a> if the issue persists.`
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
        if ($polls[$sku._id].$isActive) {
          $polls[$sku._id].stop();
          skuBought();
          productBoughtCheckout({ id: pendingTx.transactionData.product._id });
          const transactionData = pendingTx.transactionData;
          handleCheckoutStateChange('success');
          transactionSuccessMessage(transactionData);
        }
      }
      if (pendingTx?.status === 'error') {
        const $polls = polls.getState();
        handleCheckoutStateChange('error');
        if ($polls[$sku._id].$isActive) {
          $polls[$sku._id].stop();
          toast.danger(
            `Unfortunately, there was an issue completing the purchase.  Please try again later or <a href=${routes.help} class="font-bold">contact support</a> if the issue persists.`,
            { toastId: 'sku-purchase-error' }
          );
        }
      }
    }
  }
});

const transactionSuccessMessage = (transactionData?: TransactionData) => {
  const serialNumber = transactionData.product?.serialNumber;
  const skuName = transactionData.sku?.name;
  toast.success(
    `Congrats! Your NFT purchase was processed successfully!` +
      (!serialNumber
        ? ` Click <a href=${routes.product(
            transactionData.product._id
          )} class="font-bold">here</a> to view your new collectible: ${skuName}`
        : ` Click <a href=${routes.product(
            transactionData.product._id
          )} class="font-bold">here</a> to view your new collectible: ${skuName} #${serialNumber}.`),
    { toastId: 'sku-purchase-success' }
  );
};

const productBoughtSuccessFx = createEffect(() => {
  toast.success('Your order has been completed.');
});

forward({
  from: [productBought],
  to: productBoughtSuccessFx,
});

export const pendingTxStatus = createEvent<string>();

const pollTransactionStatusFx = createEffect(async () => {
  const txHash = txState.getState().hash;
  return await getTxStatus(txHash);
});

interface TxState {
  status: TxStatus | '';
  hash: string;
  poll?: Poll;
}

interface Poll {
  start: Event<void>;
  stop: Event<void>;
  $isActive: Store<boolean>;
}

export const updateTxState = createEvent<TxStatus>();
export const updateTxHash = createEvent<string>();
export const txState = createStore<TxState>({ status: '', hash: '' }, { name: 'tx-state' }).on(
  updateTxState,
  (state, newStatus) => ({ ...state, status: newStatus })
);

txState.on(updateTxHash, (state, payload) => ({ ...state, hash: payload }));

txState.on(pendingTxStatus, (_, payload) => {
  updateTxHash(payload);
  const poll = createPolling(pollTransactionStatusFx, 5000);
  resetFails();
  poll.start();
  return { status: 'pending', hash: payload, poll };
});

pollTransactionStatusFx.fail.watch(() => {
  //in case the call gets an error re try at least 5 times.
  if (failAttempts.getState() < 5) {
    const poll = txState.getState().poll;
    poll.start();
  }
  failedTransaction();
});

pollTransactionStatusFx.doneData.watch(async (response) => {
  if (response === 'confirmed' || response === 'error') {
    const poll = txState.getState().poll;
    await productBoughtFx();
    poll.stop();
  }
  updateTxState(response);
});
