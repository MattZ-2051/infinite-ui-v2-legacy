import { post } from '$lib/api';

export async function subscribe(values: { [key: string]: string }) {
  return await post(
    `${import.meta.env.VITE_SALESFORCE_FORCE_URL}/arex/services/apexrest/v1/lead/apply`,
    {},
    {
      params: values,
      parseResponseAsText: true,
    }
  );
}
