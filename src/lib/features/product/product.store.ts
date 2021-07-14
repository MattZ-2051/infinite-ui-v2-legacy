import type { Transaction, Product } from '$lib/sku-item/types';
import { writable } from 'svelte/store';

export const product = writable<Product>(undefined);

export const transactions = writable<Transaction[]>([]);
export const totalTransactions = writable<number>(undefined);

export function resetProductStores(product_?: Product) {
  product.set(product_);
  totalTransactions.set(undefined);
  transactions.set([]);
}
