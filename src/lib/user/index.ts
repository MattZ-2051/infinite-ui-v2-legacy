import type { User } from './types';
import type { Readable } from 'svelte/store';
import type { InfiniteExtension } from '$lib/features/infinite-wallet/types';
import { derived, get as getStoreValue, writable } from 'svelte/store';
import { session } from '$app/stores';
import { patch, post, get } from '$lib/api';
import routes from '$project/routes';
import { openModal } from '$ui/modals';

import AccountInitialSetupModal from '$lib/features/account/AccountInitialSetupModal.svelte';
import { AUTH_PROVIDER_IS_AUTH0 } from '$project/variables';
import { getClient } from '$lib/auth/auth0';
import { localStorageWritable } from '$util/localstorage-store';
import LegalConsentModal from '$lib/features/legalConsent/LegalConsentModal.svelte';

const userIdExternalIdMap = localStorageWritable<Pick<User, '_id' | 'externalId'>>('user:id', undefined);
const externalId = localStorageWritable<string>('user:externalId', undefined);
export const isLoading = writable<boolean>(AUTH_PROVIDER_IS_AUTH0);
export const authToken = writable<string>(<string>undefined);

// `undefined` means not yet decided
export const isAuthenticated = writable<boolean | undefined>(undefined);
export const isBanned = writable<boolean | undefined>(undefined);
export const user = writable<User>(undefined);
declare global {
  interface Window {
    wallet: InfiniteExtension | undefined;
  }
}

export const userId: Readable<string> = derived(
  [isAuthenticated, externalId, userIdExternalIdMap],
  ([$isAuthenticated, $externalId, $userIdExternalIdMap]) => {
    return $isAuthenticated && $externalId && $externalId === $userIdExternalIdMap?.externalId
      ? $userIdExternalIdMap._id
      : undefined;
  }
);

export async function updateUser(): Promise<User> {
  let me: User;
  try {
    me = await get<User>('users/me');
    externalId.set(me.externalId);
    userIdExternalIdMap.set({ _id: me._id, externalId: AUTH_PROVIDER_IS_AUTH0 ? me.externalId : me.cognitoId });
    isBanned.set(false);
    user.set(me);
    return me;
  } catch (error) {
    // Users with 'disabled: true' will receive error from users/me endpoint
    if (error?.status === 403 && error?.data?.message === 'Banned user') {
      isBanned.set(true);
    }
  }
}

export async function patchUser(data: Partial<User>) {
  const me = await patch<User>('users/me', data);
  user.set({ ...getStoreValue(user), ...me });
}

export function clearUser(): void {
  user.set(undefined);
  externalId.set(undefined);
  userIdExternalIdMap.set(undefined);
}

export async function getPersonalToken(): Promise<string> {
  const response = await post<{ token: string }>('users/personal-token', {});
  return response?.token;
}

export async function initUserAuth() {
  if (AUTH_PROVIDER_IS_AUTH0) {
    await initAuth();
    if (getStoreValue(isAuthenticated)) {
      updateUser();
    } else {
      clearUser();
    }
  } else {
    initSessionSubscription();
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

let termsAccepted = false;
export async function mustAcceptTerms(me: User, path: string) {
  if (termsAccepted) {
    return;
  }
  const _mustAcceptTerms =
    me &&
    me?.activeLegalConsentIds.length !== me?.acceptedLegalConsentIds.length &&
    path !== routes.terms &&
    path !== routes.privacy &&
    path !== routes.cookies;

  if (_mustAcceptTerms) {
    openModal(LegalConsentModal, { user: me });
    termsAccepted = true;
  }
}

export function isIssuer(u: User): boolean {
  return u?.roles && u.roles.includes('issuer');
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

async function initAuth(): Promise<void> {
  try {
    isLoading.set(true);

    const client = await getClient();
    const authenticated = await client.isAuthenticated();
    const _authToken = authenticated ? await getAuthToken() : undefined;

    if (authenticated) {
      const userHere = await client.getUser();
      externalId.set(userHere?.sub);
    }
    authToken.set(_authToken);
    isAuthenticated.set(authenticated);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error updating authorization: ${error}`);
  } finally {
    isLoading.set(false);
  }
}

async function login(returnUrl = window.location.pathname + window.location.search, options = {}) {
  isLoading.set(true);
  await logout('', true); // clean up previous session.

  const client = await getClient();
  let redirectUri = `${window.location.origin}/authorize`;
  if (returnUrl !== '/' && returnUrl !== '/authorize') {
    redirectUri += `?returnUrl=${returnUrl}${window.location.search.replace('?', '&')}`;
  }
  await client.loginWithRedirect({
    redirect_uri: redirectUri,
    ...options,
  });
}

async function logout(redirectUri: string, avoidRedirect?: boolean) {
  isLoading.set(true);

  const client = await getClient();

  if (!avoidRedirect) {
    client.logout({
      returnTo: redirectUri,
    });
  } else {
    client.logout();
  }
}

export async function getAuthToken(): Promise<string> {
  const client = await getClient();
  return await client.getTokenSilently();
}

export function onSignOut(avoidRedirect?: boolean) {
  if (window?.wallet?.account) window.wallet.logout();

  if (AUTH_PROVIDER_IS_AUTH0) {
    clearUser();
    isBanned.set(undefined);
    logout(avoidRedirect ? `` : `${window.location.origin}${window.location.search}`, avoidRedirect);
  } else {
    document.location.href = '/auth/signout';
  }
}

export function onSignUp() {
  if (AUTH_PROVIDER_IS_AUTH0) {
    return login(undefined, { screen_hint: 'signup' });
  } else {
    document.location.href = '/auth/signup';
  }
}

export function onSignIn(returnUrl = window.location.pathname + window.location.search) {
  if (AUTH_PROVIDER_IS_AUTH0) {
    return login(returnUrl);
  } else {
    document.location.href = `/auth/signin?returnUrl=${window.location.href}`;
  }
}

export async function handleRedirectCallback(callbackUrl: string) {
  const client = await getClient();
  await client.handleRedirectCallback(callbackUrl);
}
