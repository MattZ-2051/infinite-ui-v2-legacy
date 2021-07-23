import { del } from '$lib/api';

export async function deleteAchAccount(accountId: string) {
  await del(`wallet/ach/${accountId}`);
}
