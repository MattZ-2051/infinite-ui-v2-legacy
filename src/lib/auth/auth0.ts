import type { Auth0Client, User } from '@auth0/auth0-spa-js';
import createAuth0Client from '@auth0/auth0-spa-js';

export type Auth0User = User;

let auth0Client: Auth0Client;

export async function getClient(): Promise<Auth0Client> {
  if (!auth0Client) {
    auth0Client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    });
  }

  return auth0Client;
}
