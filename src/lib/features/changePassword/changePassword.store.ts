import { createEffect, createEvent, forward } from 'effector';
import { toast } from '$ui/toast';
import { openModal } from '$ui/modals';
import { clearUser, onSignOut } from '$lib/user';
import ChangePasswordModal from './ChangePasswordModal.svelte';

import { passwordChange } from './changePassword.api';

interface PasswordProperties {
  code: string;
  password: string;
  cognitoId: string;
}

export const passwordChangeRequested = createEvent<void>();

const passwordChangeConfirmed = createEvent<PasswordProperties>();

export const passwordResetFx = createEffect(async ({ code, password, cognitoId }: PasswordProperties) => {
  await passwordChange(code, password, cognitoId);
  clearUser();
  onSignOut();
});

passwordChangeRequested.watch(() => {
  openModal(ChangePasswordModal, {
    onConfirm: (newPassword, code, cognitoId) => passwordChangeConfirmed({ code, password: newPassword, cognitoId }),
  });
});

forward({
  from: passwordChangeConfirmed,
  to: passwordResetFx,
});

passwordResetFx.done.watch(() => toast.success('Your password was reset.'));

passwordResetFx.fail.watch(() => toast.danger('Whoops, something went wrong - please try again.'));
