import type { ApiError } from '$lib/api';
import type { CreditCard } from '../wallet/types';
import type { NewCreditCard } from './types';
import { createEffect } from 'effector';
import { goto } from '$app/navigation';
import { toast } from '$ui/toast';
import { updateUser } from '$lib/user';
import routes from '$project/routes';
import { addCreditCard, addCreditCardFunds, deleteCreditCard } from './card.api';
import { loadWalletFx } from '../wallet/wallet.store';

export const creditCardFundsAddFx = createEffect(
  async ({ card, email, amount, cvv }: { card: CreditCard; email: string; amount: string; cvv: string }) => {
    return await addCreditCardFunds(card.id, { amount, email, cvv });
  }
);

creditCardFundsAddFx.done.watch(() => {
  loadWalletFx();
  updateUser();
});

export const creditCardInsertFx = createEffect<NewCreditCard, CreditCard, ApiError>(async (payload: NewCreditCard) => {
  return await addCreditCard(payload);
});

creditCardInsertFx.done.watch(() => {
  loadWalletFx();
  toast.success('Congrats! Your Credit Card was successfully added.');
});

creditCardInsertFx.failData.watch((error) => {
  let message;
  if (error?.data?.appCode === 'APP_VALIDATION_ERROR') {
    message = error?.data?.args?.[0].children?.[0]?.constraints?.IsFullName
      ? 'Cardholder name is not valid'
      : 'Validation Error';
  } else if (typeof error?.data?.message === 'string') {
    message = error.data.message;
  } else {
    message = 'There was a problem adding your card.';
  }
  toast.danger(message, { toastId: 'CARD_ADD_ERROR' });
});

export const creditCardRemoveFx = createEffect(async ({ card }: { card: CreditCard }) => {
  return await deleteCreditCard(card.id);
});

creditCardRemoveFx.done.watch(() => {
  loadWalletFx();
  toast.success('Credit Card successfully removed.');
  goto(routes.wallet);
});

creditCardRemoveFx.fail.watch(({ params: { card } }) =>
  toast.danger(`There was a problem removing your card ending on ${card.last4}.`)
);
