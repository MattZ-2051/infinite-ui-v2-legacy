import type { Product, Profile, Sku } from '$lib/sku-item/types';
import { get, patch } from '$lib/api';

export async function getProfile({ username }: { username: string }) {
  const profiles = await get<Profile>(`users?username=${username}&page=1&per_page=1`);
  return profiles[0];
}

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
