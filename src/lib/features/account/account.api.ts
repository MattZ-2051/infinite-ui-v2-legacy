import type { Product, Profile, Sku } from '$lib/sku-item/types';
import { get, patch } from '$lib/api';

export async function loadReleases({ username, fetch }: { username: string; fetch?: Fetch }) {
  const profiles = await get<Profile>(`users?username=${username}&page=1&per_page=1`, { fetch });
  const profile = profiles[0];
  const [skus, products] = await Promise.all([
    get<Sku[]>(`skus/tiles/?issuerId=${profile.id}&page=1&per_page=50&sortBy=startDate:1`, {
      fetch,
    }),
    get<Product[]>(`products?owner=${profile.id}&includeFunctions=true&page=1&per_page=8`, {
      fetch,
    }),
  ]);
  return { profile, skus, products };
}

export async function editUsername({ username, fetch }: { username: string; fetch?: Fetch }) {
  return await patch<Profile>('users/me', { username: username }, { fetch });
}
