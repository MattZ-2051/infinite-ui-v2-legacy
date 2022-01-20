import type { AccountData, MirrorNodeBalanceResponse } from '$lib/features/infinite-wallet/types';
import type { Product, Profile } from '$lib/sku-item/types';
import type { User } from '$lib/user/types';
import { createEffect, forward } from 'effector';
import { refetchProductFx, productTransferred } from '../product.store';
import { transferProduct, getUsers, transferProductOut, transferProductIn } from './product-transfer.api';

export const transferProductFx = createEffect(async ({ product, user }: { product: Product; user: Profile }) => {
  return await transferProduct(product, user._id);
});

forward({
  from: transferProductFx.done,
  to: refetchProductFx,
});

export const searchUsersFx = createEffect(
  async ({
    username,
    page,
    perPage,
    skipTenant,
  }: {
    username: string;
    page: number;
    perPage: number;
    skipTenant?: boolean;
  }): Promise<{ data: Profile[]; total: number }> => {
    return await getUsers({ username, page, perPage, skipTenant });
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
