import { post } from '$lib/api';
import { formatApiCurrency } from '$util/format';

export async function withdrawToAchAccount(accountId: string, amount: number) {
  await post(`wallet/ach/${accountId}/payouts`, { amount: formatApiCurrency(amount) });
}

export async function withdrawToUsdcAddress(amount: string, usdcAddress: string) {
  await post('wallet/crypto/payouts', {
    amount: Number.parseFloat(amount || '0').toFixed(2),
    usdcAddress,
  });
}
