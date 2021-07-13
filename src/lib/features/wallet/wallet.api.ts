import type { Wallet } from './types';
import type { Transaction, Bid } from '$lib/sku-item/types';
import { get, getPage, fetchTracker } from '$lib/api';
import { wallet } from './index';

export const loadingTransactions = fetchTracker();
export const loadingBids = fetchTracker();

export async function loadWallet() {
  wallet.set(await get<Wallet>('wallet'));
}

export async function loadTransactions(
  page: number,
  sortBy?: string
): Promise<{ total: number; transactions: Transaction[] }> {
  const { data: transactions, total } = await getPage<Transaction>(
    `users/me/transactions?filter=%7B%22$or%22:[%7B%22type%22:%7B%22$in%22:[%22purchase%22,%22deposit%22]%7D,%22status%22:%7B%22$exists%22:true%7D%7D,%7B%22type%22:%22sale%22%7D,%7B%22type%22:%22royalty_fee%22%7D]%7D&page=${page}&per_page=10`,
    {
      tracker: loadingTransactions,
      params: { ...(sortBy && { sortBy }) },
    }
  );

  return { total, transactions };
}

export async function loadBids(page: number, sortBy?: string): Promise<{ total: number; bids: Bid[] }> {
  const { data: bids, total } = await getPage<Bid>(`bids/active?includeFunctions=true&page=${page}&per_page=10`, {
    tracker: loadingBids,
    params: { ...(sortBy && { sortBy }) },
  });

  return { total, bids };
}
