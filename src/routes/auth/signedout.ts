import { getOriginHostURL } from '$lib/auth/aws-cognito';

export async function get(request) {
  return {
    headers: { location: getOriginHostURL(request) },
    status: 302,
  };
}
