<script lang="ts">
  import type { AchAccount } from './types';
  import { onMount } from 'svelte';
  import { mdiCheck, mdiDeleteOutline, mdiPlus } from '@mdi/js';
  import { Modal, closeModal } from '$ui/modals';
  import Icon from '$ui/icon/Icon.svelte';
  import { achAccounts, getAchAccounts } from './ach.api';
  import AchAccountOption from './AchAccountOption.svelte';

  export let isOpen: boolean;
  export let onAddAchAccount: () => void;
  export let onWithdrawToAchAccount: (achAccount: AchAccount) => Promise<void>;
  export let onDeleteAchAccount: (achAccount: AchAccount) => Promise<void>;
  export let onClose: () => void;

  let deleteMode = false;

  $: title = deleteMode ? 'Remove account' : 'Select a payment to withdraw to';

  async function onSelectedAchAccount(achAccount: AchAccount) {
    deleteMode ? await onDeleteAchAccount(achAccount) : await onWithdrawToAchAccount(achAccount);
  }

  function _onClose() {
    closeModal();

    onClose();
  }

  onMount(() => getAchAccounts());
</script>

{#if isOpen}
  <Modal {title} on:close={_onClose}>
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="w-full text-gray-500 text-center">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. -->
      </div>
      <div class="w-full mt-4">
        {#if !$achAccounts}
          Loading ACH accounts...
        {:else if $achAccounts.length > 0}
          {#each $achAccounts as achAccount}
            <AchAccountOption {achAccount} {deleteMode} on:click={async () => await onSelectedAchAccount(achAccount)} />
          {/each}
        {:else}
          No banks registered
        {/if}
      </div>
    </div>
    <div slot="footer" class="grid grid-cols-2 gap-4 text-sm">
      <!-- svelte-ignore component-name-lowercase -->
      <button class="flex items-center" on:click={onAddAchAccount}>
        <Icon path={mdiPlus} class="inline mr-2" />
        Add new bank account
      </button>
      {#if deleteMode}
        <!-- svelte-ignore component-name-lowercase -->
        <button class="flex justify-end items-center" on:click={() => (deleteMode = false)}>
          <Icon path={mdiCheck} class="inline mr-2" />
          Select account
        </button>
      {:else}
        <!-- svelte-ignore component-name-lowercase -->
        <button class="flex justify-end items-center" on:click={() => (deleteMode = true)}>
          <Icon path={mdiDeleteOutline} class="inline mr-2" />
          Remove account
        </button>
      {/if}
    </div>
  </Modal>
{/if}
