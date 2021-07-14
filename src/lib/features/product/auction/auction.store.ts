import { writable } from 'svelte/store';
import type { Bid } from '$lib/sku-item/types';

export const bids = writable<Bid[]>([]);

export const totalBids = writable<number>(undefined);

export const minAllowedBid = writable<number>(undefined);

export function resetAuctionStores() {
  totalBids.set(undefined);
  bids.set(undefined);
  minAllowedBid.set(undefined);
}
