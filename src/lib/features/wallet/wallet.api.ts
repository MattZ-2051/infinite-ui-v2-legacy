import type { BalanceInfo, Wallet } from './types';
import type { Transaction, Bid } from '$lib/sku-item/types';
import { get, getPage, fetchTracker } from '$lib/api';
import { withdrawableBalance, wallet } from './index';

export const loadingTransactions = fetchTracker();
export const loadingBids = fetchTracker();

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
  const [walletData, balaceInfoData] = await Promise.all([get<Wallet>('wallet'), get<BalanceInfo>('wallet/balance')]);

  wallet.set(walletData);

  withdrawableBalance.set(Number.parseFloat(balaceInfoData.ccWithdrawablesLock));
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
