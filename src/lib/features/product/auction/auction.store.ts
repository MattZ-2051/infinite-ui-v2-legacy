import { writable } from 'svelte/store';
import type { Bid } from '$lib/sku-item/types';

export const bids = writable<Bid[]>([]);
export const totalBids = writable<number>(undefined);

export const maxBid = writable<number>(undefined);

export function resetAuctionStores() {
  totalBids.set(undefined);
  bids.set(undefined);
  maxBid.set(undefined);
}
