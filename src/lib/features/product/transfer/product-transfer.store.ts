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
    search,
    page,
    perPage,
  }: {
    search: string;
    page: number;
    perPage: number;
  }): Promise<{ data: Profile[]; total: number }> => {
    return await getUsers({ search, page, perPage });
  }
);
