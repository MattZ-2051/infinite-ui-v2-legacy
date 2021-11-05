import type { AchAccount } from '../types';
import { createEffect } from 'effector';
import { toast } from '$ui/toast';
import { updateUser } from '$lib/user';
import { withdrawToAchAccount, withdrawToCryptoAddress } from './account-withdraw.api';
import { loadMyTransactionsFx, loadWalletFx } from '../../wallet.store';

export const achAccountWithdrawFx = createEffect(
  async ({ achAccount, amount }: { achAccount: AchAccount; amount: number }) => {
    await withdrawToAchAccount(achAccount.id, amount);
  }
);

export const usdcWithdrawFx = createEffect(async ({ amount, usdcAddress }: { amount: string; usdcAddress: string }) => {
  await withdrawToCryptoAddress(amount, 'USD', usdcAddress);
});

achAccountWithdrawFx.done.watch(() => {
  loadWalletFx();
  updateUser();
  loadMyTransactionsFx({});
  toast.success('Congrats! Your Withdrawal is processing. ');
});

usdcWithdrawFx.done.watch(() => {
  loadWalletFx();
  updateUser();
  loadMyTransactionsFx({});
  toast.success('The withdrawal to the USDC address was successful.');
});

usdcWithdrawFx.fail.watch(() => toast.danger('There was an error with your withdrawal. Please, try again.'));
