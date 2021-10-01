import { patch } from '$lib/api';

export async function passwordChange(code: string, password: string, cognitoId: string) {
  return await patch<void>('auth/change-password', {
    code,
    password,
    cognitoId,
  });
}
