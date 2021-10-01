import { getSignupURL } from '$lib/auth/aws-cognito';

export async function get(request) {
  return {
    headers: { location: getSignupURL(request) },
    status: 302,
  };
}
