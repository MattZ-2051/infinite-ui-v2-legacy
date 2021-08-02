import type { User } from './types';
import type { Readable } from 'svelte/store';
import { derived, writable, get as getStoreValue } from 'svelte/store';
import { isAuthenticated, initAuth, userExternalId } from '$lib/auth';
import { localStorageWritable } from '$util/localstorage-store';
import { post, send } from '$lib/api';

// Keep a reference between the external (Auth0) id
const externalIdMap = localStorageWritable<Pick<User, '_id' | 'externalId'>>('user:id', undefined);

export const user = writable<User>(undefined);

export const userId: Readable<string> = derived(
  [isAuthenticated, userExternalId, externalIdMap],
  ([$isAuthenticated, $userExternalId, $user]) => {
    return $isAuthenticated && $userExternalId && $userExternalId === $user?.externalId ? $user._id : undefined;
  }
);

export async function updateUser(): Promise<User> {
  const { body: me, headers } = await send<User>('users/me');
  const initialBuyersFeePercentage = Number.parseInt(headers.get('initial-buyers-fee-percentage')) / 100 || 0;

  me.initialBuyersFeePercentage = initialBuyersFeePercentage;

  userExternalId.set(me.externalId);
  externalIdMap.set({ _id: me._id, externalId: me.externalId });
  user.set(me);

  return me;
}

export function clearUser(): void {
  user.set(undefined);
  externalIdMap.set(undefined);
}

export async function getPersonalToken(): Promise<string> {
  return (await post<{ token: string }>('users/personal-token', {}))?.token;
}

export async function initUserAuth() {
  await initAuth();
  if (getStoreValue(isAuthenticated)) {
    updateUser();
  } else {
    clearUser();
  }
}
