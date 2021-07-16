import type { WalletExtended } from './types';
import { writable, derived } from 'svelte/store';

export const wallet = writable<WalletExtended>(undefined);

export const withdrawableBalance = derived(wallet, ($wallet) =>
  Number.parseFloat($wallet?.balanceInfo?.ccWithdrawablesLock)
);
