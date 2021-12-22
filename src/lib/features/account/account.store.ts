import { createEffect, createEvent, forward } from 'effector';
import { toast } from '$ui/toast';
import { AUTH_PROVIDER_IS_AUTH0 } from '$project/variables';
import { openModal } from '$ui/modals';
import { clearUser, onSignOut } from '$lib/user';
import ConfirmModal from '$lib/components/ConfirmModal.svelte';
import ResetPasswordModal from './ResetPasswordModal.svelte';
import { passwordReset } from './account.api';

export const passwordResetRequested = createEvent<{ email?: string }>();

const passwordResetConfirmed = createEvent<{ email?: string }>();

export const passwordResetFx = createEffect(async ({ email }: { email?: string }) => {
  await passwordReset(email);
  if (!AUTH_PROVIDER_IS_AUTH0) {
    clearUser();
    onSignOut();
  }
});

passwordResetRequested.watch(({ email }) => {
  if (AUTH_PROVIDER_IS_AUTH0) {
    openModal(ConfirmModal, {
      title: 'Reset password?',
      message: `You are going to receive an email at <span class="underline">${email}</span> with a link to reset your password.`,
      onConfirm: () => passwordResetFx({ email }),
    });
  } else {
    openModal(ResetPasswordModal, {
      onConfirm: passwordResetFx,
    });
  }
});

forward({
  from: passwordResetConfirmed,
  to: passwordResetFx,
});

passwordResetFx.done.watch(() =>
  toast.success('Check your email address for the email with the link we sent you to reset your password.', {
    toastId: 'reset-password-email',
  })
);

passwordResetFx.fail.watch(() => toast.danger('Whoops, something went wrong - please try again.'));
