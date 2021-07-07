import type { User } from '$lib/user/types';
import type { Product, Profile } from '$lib/sku-item/types';
import { get as getStoreValue } from 'svelte/store';
import { get, patch } from '$lib/api';
import { user } from '$lib/user';

export async function loadMyProducts() {
  const currentUser = getStoreValue<User>(user);
  return get<Product[]>(`products?owner=${currentUser._id}&includeFunctions=true`);
}

export async function editUsername({ username }: { username: string }) {
  return await patch<Profile>('users/me', { username: username });
}
