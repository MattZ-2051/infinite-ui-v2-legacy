import type { Profile } from '$lib/sku-item/types';
import { post } from '$lib/api';
import { variables } from '$lib/variables';

export async function passwordReset(email: string) {
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
