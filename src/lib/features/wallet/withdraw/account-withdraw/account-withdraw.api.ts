import { post } from '$lib/api';
import { formatApiCurrency } from '$util/format';

export async function withdrawToAchAccount(accountId: string, amount: number) {
  await post(`wallet/ach/${accountId}/payouts`, { amount: formatApiCurrency(amount) });
}
