import type { Product, Profile } from '$lib/sku-item/types';
import { createEffect, forward } from 'effector';
import { refetchProductFx } from '../product.store';
import { transferProduct, getUsers } from './product-transfer.api';

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
