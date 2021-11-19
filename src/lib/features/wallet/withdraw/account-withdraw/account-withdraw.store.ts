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

export const cryptoWithdrawFx = createEffect(
  async ({ amount, targetAddress, currency }: { amount: string; targetAddress: string; currency: 'ETH' | 'USDC' }) => {
    await withdrawToCryptoAddress(amount, currency === 'USDC' ? 'USD' : currency, targetAddress);
  }
);

achAccountWithdrawFx.done.watch(() => {
  loadWalletFx();
  updateUser();
  loadMyTransactionsFx({});
  toast.success('Congrats! Your withdrawal is processing. ');
});

cryptoWithdrawFx.done.watch(({ params: { currency } }) => {
  loadWalletFx();
  updateUser();
  loadMyTransactionsFx({});
  toast.success(`The withdrawal to the ${currency} address was successful.`);
});

cryptoWithdrawFx.fail.watch(() => toast.danger('There was an error with your withdrawal. Please, try again.'));
