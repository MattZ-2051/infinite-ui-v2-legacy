import type { User } from './types';
import type { Readable } from 'svelte/store';

import { derived, writable, get as getStoreValue } from 'svelte/store';
import { isAuthenticated, initAuth, userExternalId } from '$lib/auth';
import { localStorageWritable } from '$util/localstorage-store';
import { patch, post, get } from '$lib/api';
import routes from '$lib/routes';
import { openModal } from '$ui/modals';

import AccountInitialSetupModal from '$lib/features/account/AccountInitialSetupModal.svelte';

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
  const me = await get<User>('users/me');
  userExternalId.set(me.externalId);
  externalIdMap.set({ _id: me._id, externalId: me.externalId });
  user.set(me);
  return me;
}

export async function patchUser(data: Partial<User>) {
  const me = await patch<User>('users/me', data);
  user.set({ ...getStoreValue(user), ...me });
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

let accountSetupTriggered = false;
export function mustSetupAccount(me: User, path: string) {
  if (accountSetupTriggered) {
    return;
  }

  const _mustSetupAccount = me && (!me.firstName || !me.lastName) && path !== routes.terms && path !== routes.privacy;

  if (_mustSetupAccount) {
    openModal(AccountInitialSetupModal, { user: me });

    accountSetupTriggered = true;
  }
}
