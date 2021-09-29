import type { Product, Profile } from '$lib/sku-item/types';
import { getPage, patch } from '$lib/api';

export async function transferProduct(product: Product, to: string) {
  await patch(`products/${product._id}/transfer`, { to });
}

export async function getUsers({
  username,
  page = 1,
  perPage = 10,
}: {
  username: string;
  page: number;
  perPage?: number;
}): Promise<{ total: number; data: Profile[] }> {
  return getPage<Profile>('users', {
    params: { username, includeFunctions: 'true', page: `${page}`, per_page: `${perPage}` },
  });
}
