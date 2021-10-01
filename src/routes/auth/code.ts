import { handleAuthorizationCode } from '$lib/auth/aws-cognito';

export async function get(request) {
  return await handleAuthorizationCode(request);
}
