import type { Wallet } from './types';
import type { Transaction, Bid } from '$lib/sku-item/types';
import { get, send } from '$lib/api';

export async function loadWallet(): Promise<Wallet> {
  return await get<Wallet>('wallet');
}

export async function loadTransactions(page: number) {
  const response = await send(
    `users/me/transactions?filter=%7B%22$or%22:[%7B%22type%22:%7B%22$in%22:[%22purchase%22,%22deposit%22]%7D,%22status%22:%7B%22$exists%22:true%7D%7D,%7B%22type%22:%22sale%22%7D,%7B%22type%22:%22royalty_fee%22%7D]%7D&page=${page}&per_page=10`,
    {}
  );

  const { headers } = response;
  const total = +headers.get('content-range').split('/')[1];
  const transactions: Transaction[] = await response.json();

  return { total, transactions };
}

export async function loadBids(page: number) {
  const response = await send(`bids/active?includeFunctions=true&page=${page}&per_page=10`, {});
  const { headers } = response;
  const total = +headers.get('content-range').split('/')[1];
  const bids: Bid[] = await response.json();

  return { total, bids };
}
