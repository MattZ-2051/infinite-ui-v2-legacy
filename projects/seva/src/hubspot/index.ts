import { post } from '$lib/api';

export async function hsSubscribeEmail(email: string) {
  return hsSubscribe([
    { name: 'email', value: email },
    { name: 'TICKET.content', value: 'dummy' },
    { name: 'TICKET.subject', value: 'dummy' },
    { name: 'TICKET.category_infinite', value: 'dummy' },
  ]);
}

async function hsSubscribe(fields: { name: string; value }[]) {
  const response = await post<{ inlineMessage: string }>(
    `https://api.hsforms.com/submissions/v3/integration/submit/${import.meta.env.VITE_HUBSPOT_PORTAL_ID}/${
      import.meta.env.VITE_HUBSPOT_FORM_ID
    }`,
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
