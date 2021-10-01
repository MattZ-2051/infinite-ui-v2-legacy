import { handleTokenRevocation } from '$lib/auth/aws-cognito';

export async function get(request) {
  return await handleTokenRevocation(request);
}
