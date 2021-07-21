import type { BalanceInfo, Wallet, HbarDeposits, HbarTransaction } from './types';
import type { Transaction, Bid } from '$lib/sku-item/types';
import { get, getPage, fetchTracker, post } from '$lib/api';
import { wallet } from './index';

export const loadingTransactions = fetchTracker();
export const loadingBids = fetchTracker();
export const loadingHbarTransactions = fetchTracker();

const filter = {
  $or: [
    {
      type: {
        $in: ['purchase', 'deposit'],
      },
      status: { $exists: true },
    },
    {
      type: 'sale',
    },
    {
      type: 'royalty_fee',
    },
    {
      type: 'withdrawal',
    },
  ],
};

export async function loadWallet() {
  const [walletData, balanceInfo] = await Promise.all([get<Wallet>('wallet'), get<BalanceInfo>('wallet/balance')]);
  wallet.set({ ...walletData, balanceInfo });
}

export async function loadTransactions(
  page: number,
  sortBy?: string
): Promise<{ total: number; transactions: Transaction[] }> {
  const { data: transactions, total } = await getPage<Transaction>(`users/me/transactions`, {
    tracker: loadingTransactions,
    params: { filter: JSON.stringify(filter), page: `${page}`, per_page: '10', ...(sortBy && { sortBy }) },
  });

  return { total, transactions };
}

export async function loadBids(page: number, sortBy?: string): Promise<{ total: number; bids: Bid[] }> {
  const { data: bids, total } = await getPage<Bid>(`bids/active?includeFunctions=true&page=${page}&per_page=10`, {
    tracker: loadingBids,
    params: { ...(sortBy && { sortBy }) },
  });

  return { total, bids };
}

export async function loadExplorerLink(): Promise<{ explorerLink: string }> {
  const { explorerLink } = await get<{ explorerLink: string }>('wallet/hbar/address');
  return { explorerLink };
}

export async function checkHbarDeposits(): Promise<HbarTransaction[]> {
  const { newTransactions } = await post<HbarDeposits>('wallet/hbar/check', {}, { tracker: loadingHbarTransactions });
  return newTransactions;
}
