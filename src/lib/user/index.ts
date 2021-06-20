import { writable } from 'svelte/store';
import type { User } from './types';
import { isAuthenticated } from '$lib/auth/index';
import { get } from '$lib/api';

export const user = writable(<User>undefined);

export async function updateUser(): Promise<User> {
  return await get<User>('users/me');
}

isAuthenticated.subscribe(async (authenticated) => {
  user.set(authenticated ? await updateUser() : undefined);
});
