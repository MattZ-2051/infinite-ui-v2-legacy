import type { Writable } from 'svelte/store';

export interface CryptoAddress {
  address: string;
  addressTag: string;
  currency: string;
  chain: string;
}

export type CryptoKind = 'usdc' | 'eth' | 'btc';

export type CryptoAddressWaiterOptions = {
  address: string;
  txLinkStore: Writable<string>;
  timeoutStore: Writable<ReturnType<typeof setTimeout>>;
  requestFilters?: Record<string, string>;
  responseFilter?: (txResponse: any) => boolean;
};
