import type { CreditCard } from '../wallet/types';
import type { NewCreditCard } from './types';
import { createEffect } from 'effector';
import { goto } from '$app/navigation';
import { toast } from '$ui/toast';
import { updateUser } from '$lib/user';
import { addCreditCard, addCreditCardFunds, deleteCreditCard } from './card.api';
import { loadWalletFx } from '../wallet/wallet.store';

export const creditCardFundsAddFx = createEffect(
  async ({ card, email, amount }: { card: CreditCard; email: string; amount: string }) => {
    return await addCreditCardFunds(card.id, { amount, email });
  }
);

creditCardFundsAddFx.done.watch(() => {
  loadWalletFx();
  updateUser();
});

export const creditCardInsertFx = createEffect(async (payload: NewCreditCard) => {
  return await addCreditCard(payload);
});

creditCardInsertFx.done.watch(() => {
  loadWalletFx();
  toast.success('Card added successfully.');
});

creditCardInsertFx.fail.watch(() => toast.danger(`There was a problem adding your card.`));

export const creditCardRemoveFx = createEffect(async ({ card }: { card: CreditCard }) => {
  return await deleteCreditCard(card.id);
});

creditCardRemoveFx.done.watch(() => {
  toast.success('Card was removed successfully.');
  goto(`/u/wallet`);
});

creditCardRemoveFx.fail.watch(({ params: { card } }) =>
  toast.danger(`There was a problem removing your card ending on ${card.last4}.`)
);
