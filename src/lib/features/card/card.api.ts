import type { CreditCard } from '../wallet/types';
import type { AddFundsRequest, NewCreditCard } from './types';
import { post, del } from '$lib/api';
import { formatDecimal } from '$util/format';

export async function addCreditCard(data: NewCreditCard): Promise<CreditCard> {
  return await post<CreditCard>(`wallet/cards`, data);
}

export async function deleteCreditCard(cardId: string) {
  return await del(`wallet/cards/${cardId}`);
}

export async function addCreditCardFunds(cardId: string, funds: AddFundsRequest) {
  funds.amount = formatDecimal(+funds.amount, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return await post<{ id: string }>(`wallet/cards/${cardId}/payments`, funds);
}
