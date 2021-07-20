import type { Product, Profile } from '$lib/sku-item/types';
import { get as getStoreValue } from 'svelte/store';
import { get, patch, post } from '$lib/api';
import { userId } from '$lib/user';
import { variables } from '$lib/variables';

export async function loadMyProducts() {
  const id = getStoreValue(userId);
  return get<Product[]>(`products?owner=${id}&includeFunctions=true`);
}

export async function editUsername({ username }: { username: string }) {
  return await patch<Profile>('users/me', { username: username });
}

export async function passwordReset(email: string) {
  return await post<Profile>(
    `https://${variables.auth0.domain}/dbconnections/change_password`,
    {
      client_id: variables.auth0.client_id,
      email,
      connection: 'Username-Password-Authentication',
    },
    { authorization: true }
  );
}
