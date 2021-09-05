import type { RedeemInfo } from './types';
import { patch } from '$lib/api';

export async function redeemItem(data: RedeemInfo, id: string) {
  return await patch(`products/${id}/redeem`, data);
}
