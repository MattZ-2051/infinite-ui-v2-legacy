<script lang="ts">
  import type { AchAccount } from './types';
  import { mdiCheck, mdiDeleteOutline, mdiPlus } from '@mdi/js';
  import { Modal, closeModal, openModal } from '$ui/modals';
  import Icon from '$ui/icon/Icon.svelte';
  import AccountOption from './AccountOption.svelte';
  import { achAccounts, achAccountFetchFx } from './withdraw.store';
  import AccountWithdrawModal from './account-withdraw/AccountWithdrawModal.svelte';
  import AccountAddModal from './account-add/AccountAddModal.svelte';
  import { achAccountDeleteRequested } from './account-delete/account-delete.store';
  import { withdrawableBalance } from '../wallet.store';

  export let isOpen: boolean;

  let deleteMode = false;

  const loadingAccounts = achAccountFetchFx.pending;

  $: title = deleteMode ? 'Remove account' : 'Select an account to withdraw to';

  function onSelected(achAccount: AchAccount) {
    if (deleteMode) {
      achAccountDeleteRequested({ achAccount });
    } else {
      openModal(AccountWithdrawModal, {
        achAccount,
        withdrawableAmount: $withdrawableBalance,
      });
    }
  }

  function onAdd() {
    openModal(AccountAddModal);
  }

  (async () => await achAccountFetchFx())();
</script>

{#if isOpen}
  <Modal {title} on:close={closeModal}>
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="w-full mt-4">
        {#if $loadingAccounts}
          Loading ACH accounts...
        {:else if $achAccounts.length > 0}
          <div class="flex flex-col gap-2">
            {#each $achAccounts as achAccount}
              <AccountOption {achAccount} {deleteMode} on:click={() => onSelected(achAccount)} />
            {/each}
          </div>
        {:else}
          No banks registered
        {/if}
      </div>
    </div>
    <div slot="footer" class="grid grid-cols-2 gap-4 text-sm">
      <button type="button" class="flex items-center" on:click={onAdd}>
        <Icon path={mdiPlus} class="inline mr-2" />
        Add new bank account
      </button>
      {#if deleteMode}
        <button type="button" class="flex justify-end items-center" on:click={() => (deleteMode = false)}>
          <Icon path={mdiCheck} class="inline mr-2" />
          Select account
        </button>
      {:else if !$loadingAccounts && $achAccounts.length > 0}
        <button type="button" class="flex justify-end items-center" on:click={() => (deleteMode = true)}>
          <Icon path={mdiDeleteOutline} class="inline mr-2" />
          Remove account
        </button>
      {/if}
    </div>
  </Modal>
{/if}
