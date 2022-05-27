import type { AccountData, MirrorNodeBalanceResponse } from '$lib/features/infinite-wallet/types';
import type { Product, Profile } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import { createEffect, forward } from 'effector';
import { refetchProductFx, productTransferred } from '../product.store';
import { transferProduct, getUserByUsername, transferProductOut, transferProductIn } from './product-transfer.api';

export const transferProductFx = createEffect(async ({ product, user }: { product: Product; user: Profile }) => {
  return await transferProduct(product, user._id);
});

forward({
  from: transferProductFx.done,
  to: refetchProductFx,
});

export const getUserByUsernameFx = createEffect(
  async ({ username, skipTenant }: { username: string; skipTenant?: boolean }): Promise<Profile | null> => {
    return getUserByUsername({ username, skipTenant }).catch((error) => {
      if (error?.data?.appCode === 'USER_INVALID') {
        // eslint-disable-next-line unicorn/no-null
        return null;
      }
      throw error;
    });
  }
);

export const transferProductOutFx = createEffect(
  async ({ product, account, walletAddress }: { product: Product; account?: AccountData; walletAddress?: string }) => {
    const response = await transferProductOut(product, account, walletAddress);
    return { product, response };
  }
);

forward({
  from: transferProductOutFx.doneData,
  to: productTransferred,
});

export const transferProductInFx = createEffect(
  async ({
    product,
    account,
    balanceData,
    user,
  }: {
    product: Product;
    account: AccountData;
    balanceData: MirrorNodeBalanceResponse;
    user: User;
  }) => {
    const response = await transferProductIn(product, account, balanceData, user);
    return { product, response };
  }
);

forward({
  from: transferProductInFx.doneData,
  to: productTransferred,
});
