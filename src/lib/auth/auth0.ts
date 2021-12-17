import type { Auth0Client } from '@auth0/auth0-spa-js';
import createAuth0Client from '@auth0/auth0-spa-js';
import { variables } from '$lib/variables';

let auth0Client: Auth0Client;

export async function getClient(): Promise<Auth0Client> {
  if (!auth0Client) {
    auth0Client = await createAuth0Client({
      domain: variables.auth0.domain,
      client_id: variables.auth0.client_id,
      audience: variables.auth0.audience,
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    });
  }

  return auth0Client;
}
