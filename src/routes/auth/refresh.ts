import { handleTokenRefresh } from '$lib/auth/aws-cognito';

export async function get(request) {
  return await handleTokenRefresh(request);
}
