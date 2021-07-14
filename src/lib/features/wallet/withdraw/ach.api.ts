import type { AchAccount, AchLinkToken, NewBankAccount } from './types';
import type { PlaidPublicToken, PlaidSuccessMetadata } from './plaid';
import { writable } from 'svelte/store';
import { del, get, post } from '$lib/api';
import { formatApiCurrency } from '$util/format';

export const achAccounts = writable<AchAccount[]>(undefined);

export async function getAchAccounts() {
  const _achAccounts = (await get<{ resource: AchAccount[]; totalDocs: number }>('wallet/ach')).resource;

  achAccounts.set(_achAccounts);
}

export async function getAchLinkToken(): Promise<string> {
  return (await post<AchLinkToken>('wallet/ach/link', {})).linkToken;
}

export async function getAchAccessToken(
  token: PlaidPublicToken,
  metadata: PlaidSuccessMetadata,
  bankAccount: NewBankAccount
): Promise<unknown> {
  return await post('wallet/ach/token', {
    public_token: token,
    metadata,
    details: {
      metadata: {
        email: bankAccount.email,
        phone: bankAccount.phoneNumber,
      },
      billingDetails: {
        name: bankAccount.holderName,
        city: bankAccount.city,
        country: bankAccount.country,
        district: bankAccount.district,
        line1: bankAccount.addressLine1,
        line2: bankAccount.addressLine2,
        postalCode: bankAccount.postalCode,
      },
    },
  });
}

export async function withdrawToAchAccount(accountId: string, amount: number) {
  await post(`wallet/ach/${accountId}/payouts`, { amount: formatApiCurrency(amount) });
}

export async function deleteAchAccount(accountId: string) {
  await del(`wallet/ach/${accountId}`);
}
