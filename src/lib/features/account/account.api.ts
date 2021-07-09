import type { Product, Profile } from '$lib/sku-item/types';
import { get as getStoreValue } from 'svelte/store';
import { get, patch } from '$lib/api';
import { userId } from '$lib/user';

export async function loadMyProducts() {
  const id = getStoreValue(userId);
  return get<Product[]>(`products?owner=${id}&includeFunctions=true`);
}

export async function editUsername({ username }: { username: string }) {
  return await patch<Profile>('users/me', { username: username });
}
