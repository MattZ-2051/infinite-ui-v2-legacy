import { get } from '$lib/api';

export async function subscribe(email: string) {
  return await get(`https://webto.salesforce.com/servlet/servlet.WebToLead`, {
    params: {
      encoding: 'UTF-8',
      oid: '00D5e000003VgsD',
      email,
    },
  });
}
