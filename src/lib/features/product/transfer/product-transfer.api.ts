import type { Product, Profile } from '$lib/sku-item/types';
import { getPage, patch } from '$lib/api';

export async function transferProduct(product: Product, to: string) {
  await patch(`products/${product._id}/transfer`, { to });
}

export async function getUsers({
  search,
  page = 1,
  perPage = 10,
}: {
  search?: string;
  page: number;
  perPage?: number;
}): Promise<{ total: number; data: Profile[] }> {
  let parameters: Record<string, string> = { includeFunctions: 'true', page: `${page}`, per_page: `${perPage}` };

  if (search !== undefined) {
    parameters = { search, ...parameters };
  }

  return await getPage<Profile>('users', {
    params: parameters,
  });
}
