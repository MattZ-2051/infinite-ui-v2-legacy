import { writable } from 'svelte/store';
import { getClient } from './auth0';

export const isAuthenticated = writable<boolean>(false);
export const isLoading = writable<boolean>(true);
export const authToken = writable<string>(<string>undefined);

export async function updateAuth() {
  try {
    isLoading.set(true);
    const client = await getClient();
    const authenticated = await client.isAuthenticated();
    const _authToken = authenticated ? await getAuthToken() : undefined;

    authToken.set(_authToken);
    isAuthenticated.set(authenticated);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error updating authorization: ${error}`);
  } finally {
    isLoading.set(false);
  }
}

export async function login(returnUrl = window.location.pathname) {
  isLoading.set(true);

  const client = await getClient();
  let redirectUri = `${window.location.origin}/authorize`;
  if (returnUrl !== '/') {
    redirectUri += `?returnUrl=${returnUrl}`;
  }
  await client.loginWithRedirect({
    redirect_uri: redirectUri,
  });
}

export async function handleRedirectCallback(callbackUrl: string) {
  const client = await getClient();
  await client.handleRedirectCallback(callbackUrl);
}

export async function logout(redirectUri: string) {
  isLoading.set(true);

  const client = await getClient();

  client.logout({
    returnTo: redirectUri,
  });
}

export async function getAuthToken(): Promise<string> {
  const client = await getClient();
  return await client.getTokenSilently();
}
