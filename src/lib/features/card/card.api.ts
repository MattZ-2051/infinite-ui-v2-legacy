import type { Card } from './types';
import { post } from '$lib/api';

export async function addCreditCard(data, metadata: { email: string }) {
  return await post<Card>(`wallet/cards`, { ...data, metadata });
}
