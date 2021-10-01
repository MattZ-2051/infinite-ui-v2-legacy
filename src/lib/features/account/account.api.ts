import { patch } from '$lib/api';

export async function passwordReset() {
  return await patch<void>('auth/forgot-password', {});
}
