import type { WalletExtended } from './types';
import type { Bid, Transaction } from '$lib/sku-item/types';
import { createEffect, createEvent, createStore, merge } from 'effector';
import { createPolling } from '$util/effector';
import { getQueryParameters } from '$util/queryParameter';
import { loadWallet, loadMyTransactions, loadBids, loadKycInfo } from './wallet.api';

export const loadWalletFx = createEffect(async () => {
  return await loadWallet();
});
export const loadKycInfoFx = createEffect(loadKycInfo);

// eslint-disable-next-line unicorn/no-null
export const wallet = createStore<WalletExtended>(null)
  .on(loadWalletFx.doneData, (state, payload) => payload)
  .on(loadKycInfoFx.doneData, (state, payload) => ({ ...state, ...payload }));

export const withdrawableBalance = wallet.map(($wallet) =>
  Number.parseFloat($wallet?.balanceInfo?.withdrawableBalance)
);

export const loadMyTransactionsFx = createEffect(
  async ({
    page = +getQueryParameters().get('page'),
    sortBy = getQueryParameters().get('sortBy'),
    type = getQueryParameters().get('type'),
  } = {}): Promise<{
    total: number;
    transactions: Transaction[];
  }> => {
    return await loadMyTransactions({ page, sortBy, type });
  }
);

export const myTransactions = createStore<Transaction[]>([]).on(
  loadMyTransactionsFx.doneData,
  (state, payload) => payload.transactions
);

export const myTransactionsTotal = createStore<number>(0).on(
  loadMyTransactionsFx.doneData,
  (state, payload) => payload.total
);

export const loadMyBidsFx = createEffect(
  async ({ page = +getQueryParameters().get('page'), sortBy = getQueryParameters().get('sortBy') } = {}): Promise<{
    total: number;
    bids: Bid[];
  }> => {
    return await loadBids({ page, sortBy });
  }
);

export const myBids = createStore<Bid[]>([]).on(loadMyBidsFx.doneData, (state, payload) => payload.bids);

export const myBidsTotal = createStore<number>(0).on(loadMyBidsFx.doneData, (state, payload) => payload.total);

const walletPoller = createPolling(loadKycInfoFx, 3000);
export const kycIsPending = createEvent<string>();
kycIsPending.watch(() => {
  walletPoller.start();
});
merge([loadKycInfoFx.doneData, loadWalletFx.doneData]).watch((response) => {
  if (response.kycPending && !walletPoller.$isActive.getState()) {
    walletPoller.start();
    return;
  }
  if (!response.kycPending && walletPoller.$isActive.getState()) {
    walletPoller.stop();
    return;
  }
});
