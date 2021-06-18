import type { Auth0User } from './auth0';
import { writable } from 'svelte/store';
import { getClient } from './auth0';

export const user = writable<Auth0User>({});
export const isAuthenticated = writable<boolean>(false);
export const isLoading = writable<boolean>(true);

export async function updateAuth() {
  isLoading.set(true);

  const client = await getClient();
  const authenticated = await client.isAuthenticated();
  const data = authenticated ? await getUserData() : undefined;

  isLoading.set(false);
  isAuthenticated.set(authenticated);
  user.set(data);
}

export async function login(redirectURI = window.location.origin) {
  isLoading.set(true);

  const client = await getClient();
  await client.loginWithRedirect({
    redirect_uri: redirectURI,
  });
}

export async function handleRedirectCallback(callbackURL: string) {
  const client = await getClient();
  await client.handleRedirectCallback(callbackURL);
}

export async function logout(redirectURI: string) {
  isLoading.set(true);

  const client = await getClient();

  client.logout({
    returnTo: redirectURI,
  });
}

export async function getAuthToken() {
  const client = await getClient();
  return await client.getTokenSilently();
}

async function getUserData() {
  const client = await getClient();
  return await client.getUser();
}
