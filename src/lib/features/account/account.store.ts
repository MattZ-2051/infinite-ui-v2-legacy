import { createEffect, createEvent, forward } from 'effector';
import { toast } from '$ui/toast';
import { openModal } from '$ui/modals';
import ConfirmModal from '$lib/components/ConfirmModal.svelte';

import { passwordReset } from './account.api';

export const passwordResetRequested = createEvent<{ email: string }>();

const passwordResetConfirmed = createEvent<{ email: string }>();

export const passwordResetFx = createEffect(async ({ email }: { email: string }) => {
  await passwordReset(email);
});

passwordResetRequested.watch(({ email }) => {
  openModal(ConfirmModal, {
    title: 'Reset password?',
    message: `You are going to receive an email at <span class="underline">${email}</span> with a link to reset your password.`,
    onConfirm: () => passwordResetConfirmed({ email }),
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
