import { createEffect, createEvent, forward } from 'effector';
import { toast } from '$ui/toast';
import { openModal } from '$ui/modals';
import { goto } from '$app/navigation';
import { clearUser } from '$lib/user';
import routes from '$project/routes';
import ResetPasswordModal from './ResetPasswordModal.svelte';

import { passwordReset } from './account.api';

export const passwordResetRequested = createEvent<void>();

const passwordResetConfirmed = createEvent<string>();

export const passwordResetFx = createEffect(async () => {
  await passwordReset();
  clearUser();
  await goto(routes.signout);
});

passwordResetRequested.watch(() => {
  openModal(ResetPasswordModal, {
    onConfirm: passwordResetFx,
  });
});

forward({
  from: passwordResetConfirmed,
  to: passwordResetFx,
});

passwordResetFx.done.watch(() =>
  toast.success('Check your email address for the email with the link we sent you to reset your password.')
);

passwordResetFx.fail.watch(() => toast.danger('Whoops, something went wrong - please try again.'));
