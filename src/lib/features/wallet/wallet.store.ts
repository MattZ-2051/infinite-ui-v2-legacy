import type { WalletExtended } from './types';
import type { Bid, Transaction } from '$lib/sku-item/types';
import { createEffect, createStore } from 'effector';
import { getQueryParameters } from '$util/queryParameter';
import { loadWallet, loadMyTransactions, loadBids } from './wallet.api';

export const loadWalletFx = createEffect(async () => {
  return await loadWallet();
});

// eslint-disable-next-line unicorn/no-null
export const wallet = createStore<WalletExtended>(null).on(loadWalletFx.doneData, (state, payload) => payload);

export const withdrawableBalance = wallet.map(($wallet) =>
  Number.parseFloat($wallet?.balanceInfo?.ccWithdrawablesLock)
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
