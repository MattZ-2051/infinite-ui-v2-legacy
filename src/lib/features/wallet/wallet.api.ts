import type { Wallet } from './types';
import { del, get, post } from '$lib/api';

export async function loadWallet(): Promise<Wallet> {
  return await get<Wallet>('wallet');
}
