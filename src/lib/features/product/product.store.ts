import type { Transaction, Bid, Product } from '$lib/sku-item/types';
import { writable } from 'svelte/store';

export const product = writable<Product>(undefined);

export const transactions = writable<Transaction[]>([]);
export const totalTransactions = writable<number>(undefined);

export const auctions = writable<Bid[]>([]);
export const totalAuctions = writable<number>(undefined);

export const maxBidAuction = writable<number>(undefined);

export function reset(product_?: Product) {
  product.set(product_);
  totalAuctions.set(undefined);
  auctions.set([]);
  totalTransactions.set(undefined);
  transactions.set([]);
}
