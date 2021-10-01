import { getAuthorizationURL } from '$lib/auth/aws-cognito';

export async function get(request) {
  return {
    headers: { location: getAuthorizationURL(request) },
    status: 302,
  };
}
