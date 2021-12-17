import type { Profile } from '$lib/sku-item/types';
import { AUTH_PROVIDER_IS_AUTH0 } from '$project/variables';
import { post, patch } from '$lib/api';
import { variables } from '$lib/variables';

export async function passwordReset(email: string) {
  if (AUTH_PROVIDER_IS_AUTH0) {
    return await post<Profile>(
      `https://${variables.auth0.domain}/dbconnections/change_password`,
      {
        client_id: variables.auth0.client_id,
        email,
        connection: 'Username-Password-Authentication',
      },
      { authorization: true }
    );
  }
  return await patch<void>('auth/forgot-password', {});
}
