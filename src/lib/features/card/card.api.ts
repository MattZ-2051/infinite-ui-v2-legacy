import type { CreditCard } from '../wallet/types';
import type { AddFundsRequest, NewCreditCard } from './types';
import { post, del } from '$lib/api';
import { formatApiCurrency } from '$util/format';

export async function addCreditCard(data: NewCreditCard): Promise<CreditCard> {
  return await post<CreditCard>(`wallet/cards`, data);
}

export async function deleteCreditCard(cardId: string) {
  return await del(`wallet/cards/${cardId}`);
}

export async function addCreditCardFunds(cardId: string, funds: AddFundsRequest) {
  return await post<{ id: string }>(`wallet/cards/${cardId}/payments`, {
    ...funds,
    amount: formatApiCurrency(funds.amount),
  });
}
