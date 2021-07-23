import type { AchAccount } from '../types';
import { createEffect } from 'effector';
import { toast } from '$ui/toast';
import { updateUser } from '$lib/user';
import { withdrawToAchAccount } from './account-withdraw.api';
import { loadMyTransactionsFx, loadWalletFx } from '../../wallet.store';

export const achAccountWithdrawFx = createEffect(
  async ({ achAccount, amount }: { achAccount: AchAccount; amount: number }) => {
    await withdrawToAchAccount(achAccount.id, amount);
  }
);

achAccountWithdrawFx.done.watch(() => {
  loadWalletFx();
  updateUser();
  loadMyTransactionsFx({});
  toast.success('The withdrawal to the ACH account was successful.');
});

achAccountWithdrawFx.fail.watch(() => toast.danger('There was an error with your withdrawal. Please, try again.'));
