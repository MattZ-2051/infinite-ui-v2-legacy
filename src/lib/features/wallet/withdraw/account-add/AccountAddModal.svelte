<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { user } from '$lib/user';
  import { Modal, closeModal } from '$ui/modals';
  import AccountAddForm from './AccountAddForm.svelte';
  import { achAccountAdded } from './account-add.store';

  export let isOpen: boolean;

  let handler: () => void;

  function registerOnSubmit(_handler: () => void) {
    handler = _handler;
  }
</script>

{#if isOpen}
  <Modal title="Add new bank account" on:close={closeModal}>
    <div class="flex flex-col text-base px-10">
      {#if $user}
        <AccountAddForm
          onSubmit={registerOnSubmit}
          user={$user}
          on:account-added={() => achAccountAdded()}
          on:close={closeModal}
        />
      {/if}
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button type="button" on:click={handler}>Confirm</Button>
      <Button type="button" on:click={closeModal} theme="secondary">Go Back</Button>
    </div>
  </Modal>
{/if}
