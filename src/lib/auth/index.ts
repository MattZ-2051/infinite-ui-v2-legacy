import { writable } from 'svelte/store';
import { getClient } from './auth0';

export const isAuthenticated = writable<boolean>(false);
export const isLoading = writable<boolean>(true);
export const authToken = writable<string>(<string>undefined);

export async function updateAuth() {
  isLoading.set(true);

  const client = await getClient();
  const authenticated = await client.isAuthenticated();
  const _authToken = authenticated ? await getAuthToken() : undefined;

  isLoading.set(false);
  authToken.set(_authToken);
  isAuthenticated.set(authenticated);
}

export async function login(redirectURI = window.location.origin) {
  isLoading.set(true);

  const client = await getClient();
  await client.loginWithRedirect({
    redirect_uri: redirectURI,
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

export async function getAuthToken() {
  const client = await getClient();
  return await client.getTokenSilently();
}
