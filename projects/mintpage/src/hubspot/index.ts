import type { User } from '$lib/user/types';
import { post } from '$lib/api';

export async function hsSubscribeEmail(email: string) {
  return hsSubscribe([{ name: 'email', value: email }]);
}

export async function hsSubscribeUser(user: User, email: string) {
  return hsSubscribe([
    { name: 'email', value: email },
    { name: 'infinite_username', value: user.username },
    { name: 'infinite_userid', value: user._id },
  ]);
}

async function hsSubscribe(fields: { name: string; value }[]) {
  const response = await post<{ inlineMessage: string }>(
    `https://api.hsforms.com/submissions/v3/integration/submit/${
      import.meta.env.VITE_HUBSPOT_PORTAL_ID
    }/6609e43d-ab4b-4334-8249-36bcdbb5353d`,
    {
      fields,
    },
    {
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
  return response.inlineMessage;
}
