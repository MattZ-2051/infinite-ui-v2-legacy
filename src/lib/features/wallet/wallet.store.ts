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

export const withdrawableBalanceUsd = wallet.map(($wallet) =>
  Number.parseFloat($wallet?.balanceInfo.find((x) => x.currency === 'USD').withdrawableBalance)
);
export const withdrawableBalanceEth = wallet.map(($wallet) =>
  Number.parseFloat($wallet?.balanceInfo.find((x) => x.currency === 'ETH').withdrawableBalance)
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

const walletUpdate = merge([loadKycInfoFx.doneData, loadWalletFx.doneData]);

walletUpdate.watch((response) => {
  if (response.kycPending && !walletPoller.$isActive.getState()) {
    walletPoller.start();
    return;
  }
  if (!response.kycPending && walletPoller.$isActive.getState()) {
    walletPoller.stop();
    return;
  }
});

export const setKycFailure = createEvent<boolean>();

export const kycFailure = createStore<{ inquiryPending: boolean; inquiryFailed: boolean }>({
  inquiryPending: false,
  inquiryFailed: false,
})
  // On the event where kyc is pending set the status in state
  .on(kycIsPending, () => ({ inquiryFailed: false, inquiryPending: true }))
  // On the event where the inqury status is explicitly declared set it in state
  .on(setKycFailure, (state, failed) => {
    return { inquiryPending: false, inquiryFailed: failed };
  })
  // On the event where kycInfo or loadWallet request new data evaluate state
  .on(walletUpdate, (state, response) => {
    // While resolution is pending don't update failure state
    if (response.kycPending) return state;

    // When resolution is detected verify the last record status
    if (state.inquiryPending === true && response.kycPending === false) {
      // Check if there are failed records
      const isFailure = Boolean(response?.kycRecords.find((record) => record.status === 'failed'));
      // Set state with response
      return {
        inquiryPending: response.kycPending,
        inquiryFailed: isFailure,
      };
    }
  });
