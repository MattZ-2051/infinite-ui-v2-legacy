import type { Profile, Product, Sku } from '$lib/sku-item/types';
import { get } from '$lib/api';

export async function loadReleases({ username, fetch }: { username: string; fetch?: Fetch }) {
  const profiles = await get<Profile[]>(`users?username=${username}`, { fetch });
  const profile = profiles[0];
  const [skus, products] = await Promise.all([
    profile.role === 'issuer'
      ? get<Sku[]>(`skus/tiles/?issuerId=${profile._id}&page=1&per_page=50&sortBy=startDate:1`, {
          fetch,
        })
      : [],
    get<Product[]>(`products?owner=${profile._id}&includeFunctions=true&page=1&per_page=8`, {
      fetch,
    }),
  ]);
  return { profile, skus, products };
}
