import type { AchLinkToken, NewBankAccount } from './types';
import type { PlaidPublicToken, PlaidSuccessMetadata } from './plaid';
import { post } from '$lib/api';

export async function getAchLinkToken(): Promise<string> {
  const response = await post<AchLinkToken>('wallet/ach/link', {});
  return response.linkToken;
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
