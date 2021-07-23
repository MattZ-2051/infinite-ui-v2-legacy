import type { AchAccount } from '../types';
import { createEffect, createEvent, forward } from 'effector';
import { openModal } from '$ui/modals';
import { toast } from '$ui/toast';
import ConfirmModal from '$lib/components/ConfirmModal.svelte';

import { deleteAchAccount } from './account-delete.api';
import { achAccountFetchFx } from '../withdraw.store';

export const achAccountDeleteRequested = createEvent<{ achAccount: AchAccount }>();

const achAccountDeleteFx = createEffect(async ({ achAccount }: { achAccount: AchAccount }) => {
  await deleteAchAccount(achAccount.id);
});

achAccountDeleteRequested.watch(({ achAccount }) => {
  const { metadata } = achAccount.plaidInfo;
  openModal(ConfirmModal, {
    title: 'Remove account?',
    message: `You are going to delete the ${metadata.institution.name} account xxxx${metadata.account.mask}.`,
    onConfirm: async () => {
      return await achAccountDeleteFx({ achAccount });
    },
  });
});

forward({
  from: achAccountDeleteFx.done,
  to: achAccountFetchFx,
});

achAccountDeleteFx.done.watch(() => toast.success('The ACH account has been deleted.'));

achAccountDeleteFx.fail.watch(() => toast.danger('The was an error deleting the ACH account.'));
