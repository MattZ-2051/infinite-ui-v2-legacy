import type { Wallet } from './types';
import { get } from '$lib/api';

export async function loadWallet(): Promise<Wallet> {
  return await get<Wallet>('wallet');
}
