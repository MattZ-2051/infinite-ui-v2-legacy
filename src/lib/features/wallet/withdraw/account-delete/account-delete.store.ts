import type { AchAccount } from '../types';
import { createEffect, createEvent, forward } from 'effector';
import { openModal } from '$ui/modals';
import { toast } from '$ui/toast';
import ConfirmModal from '$lib/components/ConfirmModal.svelte';
import DeleteConfirmModalBody from './DeleteConfirmModalBody.svelte';
import { deleteAchAccount } from './account-delete.api';
import { achAccountFetchFx } from '../withdraw.store';

export const achAccountDeleteRequested = createEvent<{ achAccount: AchAccount }>();

const achAccountDeleteFx = createEffect(async ({ achAccount }: { achAccount: AchAccount }) => {
  await deleteAchAccount(achAccount.id);
});

achAccountDeleteRequested.watch(({ achAccount }) => {
  openModal(ConfirmModal, {
    title: 'Delete Account?',
    message: DeleteConfirmModalBody,
    onConfirm: async () => {
      return await achAccountDeleteFx({ achAccount });
    },
    persistent: false,
    closeButton: true,
    messageData: { account: achAccount },
    labels: { cancel: 'No', confirm: 'Yes' },
  });
});

forward({
  from: achAccountDeleteFx.done,
  to: achAccountFetchFx,
});

achAccountDeleteFx.done.watch(() => toast.success('The Account has successfully been removed.'));

achAccountDeleteFx.fail.watch(() => toast.danger('The was an error deleting the ACH account.'));
