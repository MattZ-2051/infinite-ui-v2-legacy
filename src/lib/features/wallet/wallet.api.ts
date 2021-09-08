import type { BalanceInfo, Wallet, HbarDeposits, HbarTransaction, KycInfo } from './types';
import type { Transaction, Bid } from '$lib/sku-item/types';
import { get, getPage, fetchTracker, post } from '$lib/api';

export const loadingHbarTransactions = fetchTracker();

const filterWithStatus = {
  $or: [
    { type: { $in: ['purchase', 'deposit'] }, status: { $exists: true } },
    { type: 'sale' },
    { type: 'royalty_fee' },
    { type: 'withdrawal' },
    { type: 'nft_redeem' },
    { type: 'claim' },
  ],
};

const filterWithPendingStatus = {
  $or: [
    { type: { $in: ['purchase', 'deposit'] }, status: { $in: ['pending'] } },
    { type: 'sale', status: { $in: ['pending'] } },
    { type: 'withdrawal', status: { $in: ['pending'] } },
  ],
};

export async function loadWallet() {
  const [walletData, balanceInfo] = await Promise.all([get<Wallet>('wallet'), get<BalanceInfo>('wallet/balance')]);
  return { ...walletData, balanceInfo };
}

export async function loadKycInfo() {
  return get<KycInfo>('wallet/kyc');
}

export async function loadMyTransactions({
  page,
  sortBy,
  type,
}: {
  page: number;
  sortBy?: string;
  type?: string;
}): Promise<{ total: number; transactions: Transaction[] }> {
  return await loadTransactionsWithFilter(filterWithStatus, page, sortBy, type);
}

export async function loadPendingTransactions(): Promise<{ total: number; transactions: Transaction[] }> {
  return await loadTransactionsWithFilter(filterWithPendingStatus);
}

export async function loadBids({
  page,
  sortBy,
}: {
  page: number;
  sortBy?: string;
}): Promise<{ total: number; bids: Bid[] }> {
  const { data: bids, total } = await getPage<Bid>(`bids/active?includeFunctions=true&page=${page}&per_page=10`, {
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

async function loadTransactionsWithFilter(
  filter: unknown,
  page?: number,
  sortBy?: string,
  type?: string
): Promise<{ total: number; transactions: Transaction[] }> {
  const { data: transactions, total } = await getPage<Transaction>(`users/me/transactions`, {
    params: {
      filter: JSON.stringify(filter),
      ...(page && { page: `${page}`, per_page: '10' }),
      ...(sortBy && { sortBy }),
      ...(type && { type }),
    },
  });

  return { total, transactions };
}
