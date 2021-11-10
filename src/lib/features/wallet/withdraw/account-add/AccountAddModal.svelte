<script lang="ts">
  import { mdiBank } from '@mdi/js';
  import Button from '$lib/components/Button.svelte';
  import { user } from '$lib/user';
  import { Modal, closeModal } from '$ui/modals';
  import Icon from '$ui/icon/Icon.svelte';
  import AccountAddForm from './AccountAddForm.svelte';
  import { achAccountAdded } from './account-add.store';

  export let isOpen: boolean;

  let handler: () => void;

  function registerOnSubmit(_handler: () => void) {
    handler = _handler;
  }
</script>

{#if isOpen}
  <Modal title="Add bank account">
    <div class="rounded-full bg-black p-2" slot="icon"><Icon color="white" path={mdiBank} /></div>
    <div class="flex flex-col text-base px-10">
      <div class="text-black-opacity-40 pt-4">Complete this form to add a new bank account</div>
      <div class="pt-6">Details</div>
      {#if $user}
        <AccountAddForm
          onSubmit={registerOnSubmit}
          user={$user}
          on:account-added={() => achAccountAdded()}
          on:close={() => closeModal()}
        />
      {/if}
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button variant="brand" on:click={handler}>Add Account</Button>
    </div>
  </Modal>
{/if}
