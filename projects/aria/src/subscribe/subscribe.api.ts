import { post } from '$lib/api';

export async function subscribe(values: { [key: string]: string }) {
  return await post(
    `https://uat-thearianetwork.cs219.force.com/arex/services/apexrest/v1/lead/follow`,
    {},
    {
      params: values,
      parseResponseAsText: true,
    }
  );
}
