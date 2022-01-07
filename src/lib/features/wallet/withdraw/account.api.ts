import type { AchAccount } from './types';
import { get } from '$lib/api';

export async function getAchAccounts() {
  const response = await get<{ resource: AchAccount[]; totalDocs: number }>('wallet/ach');
  return response.resource;
}
