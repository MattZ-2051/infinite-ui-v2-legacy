import type { AchAccount } from './types';
import { get } from '$lib/api';

export async function getAchAccounts() {
  return (await get<{ resource: AchAccount[]; totalDocs: number }>('wallet/ach')).resource;
}
