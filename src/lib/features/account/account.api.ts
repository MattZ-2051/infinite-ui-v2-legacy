import type { Product, Profile, Sku } from '$lib/sku-item/types';
import { get, patch } from '$lib/api';

export async function loadReleases({ id }: { id: string }) {
  const [skus, products] = await Promise.all([
    get<Sku[]>(`skus/tiles/?issuerId=${id}&page=1&per_page=50&sortBy=startDate:1`),
    get<Product[]>(`products?owner=${id}&includeFunctions=true&page=1&per_page=8`),
  ]);
  return { skus, products };
}

export async function editUsername({ username }: { username: string }) {
  return await patch<Profile>('users/me', { username: username });
}
