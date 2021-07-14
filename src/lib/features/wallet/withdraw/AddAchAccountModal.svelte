<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { user } from '$lib/user';
  import { Modal, closeModal } from '$ui/modals';
  import AddAchAccountForm from './AddAchAccountForm.svelte';

  export let isOpen: boolean;
  export let onSelectAchAccount: () => void;
  export let onClose: () => void;

  let handler: () => void;

  function registerOnSubmit(_handler: () => void) {
    handler = _handler;
  }

  function _onClose() {
    closeModal();

    onClose();
  }
</script>

{#if isOpen}
  <Modal title="Add new bank account" on:close={_onClose}>
    <div class="flex flex-col gap-2 mt-4 mb-8 text-base px-10">
      <div class="w-full text-gray-500 text-center">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. -->
      </div>
      {#if $user}
        <AddAchAccountForm
          onSubmit={registerOnSubmit}
          user={$user}
          on:account-added={onSelectAchAccount}
          on:close={_onClose}
        />
      {/if}
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button type="button" on:click={handler}>Confirm</Button>
      <Button type="button" on:click={onSelectAchAccount} theme="secondary">Go Back</Button>
    </div>
  </Modal>
{/if}
