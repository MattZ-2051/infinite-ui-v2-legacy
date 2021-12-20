import { post } from '$lib/api';
import { formatApiCurrency } from '$util/format';

export async function withdrawToAchAccount(accountId: string, amount: number) {
  await post(`wallet/ach/${accountId}/payouts`, { amount: formatApiCurrency(amount) });
}

export async function withdrawToCryptoAddress(amount: string, currency: 'ETH' | 'USD', usdcAddress: string) {
  await post('wallet/payout-request', {
    amount: {
      quantity: amount || '0',
      currency,
    },
    address: usdcAddress,
  });
}
