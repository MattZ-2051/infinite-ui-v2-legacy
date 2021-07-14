<script lang="ts">
  import type { AchAccount } from './types';
  import { createEventDispatcher, onMount } from 'svelte';
  import { withdrawableBalance } from '$lib/features/wallet/index';
  import { loadWallet } from '$lib/features/wallet/wallet.api';
  import { updateUser } from '$lib/user';
  import { closeAllModals, closeModal, openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import { deleteAchAccount, getAchAccounts } from './ach.api';
  import AddAchAccountModal from './AddAchAccountModal.svelte';
  import SelectAchAccountModal from './SelectAchAccountModal.svelte';
  import WithdrawToAchAccountModal from './WithdrawToAchAccountModal.svelte';

  const dispatch = createEventDispatcher();

  function openSelectAchAccountModal() {
    closeAllModals();

    openModal(SelectAchAccountModal, { onAddAchAccount, onWithdrawToAchAccount, onDeleteAchAccount, onClose });
  }

  function onAddAchAccount() {
    closeModal();

    openModal(AddAchAccountModal, { onSelectAchAccount: openSelectAchAccountModal, onClose });
  }

  async function onWithdrawToAchAccount(achAccount: AchAccount) {
    closeModal();

    openModal(WithdrawToAchAccountModal, {
      achAccount,
      withdrawableAmount: $withdrawableBalance,
      onSelectAchAccount: openSelectAchAccountModal,
      onWithdrawComplete,
      onClose,
    });
  }

  async function onWithdrawComplete() {
    closeModal();

    onClose();

    await Promise.all([loadWallet(), updateUser()]);
  }

  async function onDeleteAchAccount(achAccount: AchAccount) {
    closeModal();

    openModal(ConfirmModal, {
      title: 'Remove account?',
      message: `You are going to delete the account ${achAccount.plaidInfo.metadata.account.name}.`,
      onConfirm: async () =>
        await deleteAchAccount(achAccount.id)
          .then(() => {
            closeModal();

            toast.success('The ACH account has been deleted.');

            getAchAccounts();

            return true;
          })
          .catch(() => toast.danger('The was an error deleting the ACH account.')),
      onCancel: openSelectAchAccountModal,
    });
  }

  function onClose() {
    dispatch('close');
  }

  onMount(openSelectAchAccountModal);
</script>
