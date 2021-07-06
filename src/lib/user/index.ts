import { writable } from 'svelte/store';
import type { User } from './types';
import { isAuthenticated } from '$lib/auth/index';
import { get, post } from '$lib/api';

export const user = writable(<User>undefined);

export async function updateUser(): Promise<User> {
  const me = await get<User>('users/me');
  user.set(me);
  return me;
}

export async function getPersonalToken(): Promise<string> {
  return (await post<{ token: string }>('users/personal-token', {}))?.token;
}

isAuthenticated.subscribe((authenticated) => {
  authenticated ? updateUser() : user.set(undefined);
});
