import { writable } from 'svelte/store';
import type { User } from './types';
import { isAuthenticated } from '$lib/auth/index';
import { get, post } from '$lib/api';

export const user = writable(<User>undefined);

export async function updateUser(): Promise<User> {
  return await get<User>('users/me');
}

export async function getPersonalToken(): Promise<string> {
  return (await post<{ token: string }>('users/personal-token', {}))?.token;
}

isAuthenticated.subscribe(async (authenticated) => {
  user.set(authenticated ? await updateUser() : undefined);
});
