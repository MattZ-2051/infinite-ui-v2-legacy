import type { User } from './types';
import type { Readable } from 'svelte/store';

import { derived, get as getStoreValue, writable } from 'svelte/store';
import { session } from '$app/stores';
import { localStorageWritable } from '$util/localstorage-store';
import { patch, post, get } from '$lib/api';
import routes from '$project/routes';
import { openModal } from '$ui/modals';

import AccountInitialSetupModal from '$lib/features/account/AccountInitialSetupModal.svelte';

// Keep a mapping between the external oauth2 provider id and the backend user id
const userIdExternalIdMap = localStorageWritable<Pick<User, '_id' | 'externalId'>>('user:id', undefined);
const externalId = localStorageWritable<string>('user:externalId', undefined);

export const user = writable<User>(undefined);

export const userId: Readable<string> = derived(
  [externalId, userIdExternalIdMap],
  ([$externalId, $userIdExternalIdMap]) => {
    return $externalId && $externalId === $userIdExternalIdMap?.externalId ? $userIdExternalIdMap._id : undefined;
  }
);

export async function updateUser(): Promise<User> {
  const me = await get<User>('users/me');
  userIdExternalIdMap.set({ _id: me._id, externalId: me.cognitoId });
  user.set(me);
  return me;
}

export async function patchUser(data: Partial<User>) {
  const me = await patch<User>('users/me', data);
  user.set({ ...getStoreValue(user), ...me });
}

export function clearUser(): void {
  user.set(undefined);
  userIdExternalIdMap.set(undefined);
}

export async function getPersonalToken(): Promise<string> {
  return (await post<{ token: string }>('users/personal-token', {}))?.token;
}

export async function initUserAuth() {
  initSessionSubscription();
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

let sessionUnsubscriber;

async function fetchNewSession() {
  try {
    const newSession = await fetch('/auth/refresh').then(async (response) => await response.json());

    if (getStoreValue(externalId) !== newSession?.user?.externalId) {
      externalId.set(newSession?.user?.externalId);
    }

    return newSession;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return {};
  }
}

function initSessionSubscription() {
  if (sessionUnsubscriber) {
    sessionUnsubscriber();

    sessionUnsubscriber = undefined;
  }

  let sessionRefreshTimeout;

  sessionUnsubscriber = session.subscribe(async (_session) => {
    clearTimeout(sessionRefreshTimeout);

    if (!_session || _session.invalid) {
      externalId.set(undefined);
      clearUser();

      return;
    }

    if (_session.expired) {
      session.set(await fetchNewSession());

      return;
    }

    if (_session.expiration) {
      // Set the timeout to occur one minute before the JWT expiration.
      // The JWT expiration is set in seconds by AWS Cognito.
      const expiresAfterMilliseconds = _session.expiration * 1000 - Date.now() - 60_000;

      if (expiresAfterMilliseconds <= 0) {
        session.set(await fetchNewSession());

        return;
      }

      sessionRefreshTimeout = setTimeout(async () => {
        session.set(await fetchNewSession());
      }, expiresAfterMilliseconds);

      if (getStoreValue(externalId) !== _session?.user?.externalId) {
        externalId.set(_session?.user?.externalId);
      }

      updateUser();

      return;
    }
  });
}
