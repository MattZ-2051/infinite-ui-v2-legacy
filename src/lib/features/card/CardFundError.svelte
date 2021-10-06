<script lang="ts">
  import type { ApiError } from '$lib/api';
  import { closeModal, Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';
  import { handleWalletDepositError } from '../wallet/wallet.service';

  export let isOpen;
  export let error: ApiError;
</script>

{#if isOpen}
  <Modal title="Whoops, something went wrong." on:close={closeModal}>
    <div class="flex flex-col justify-center items-center gap-6 mt-2 text-base max-w-sm text-center py-4 px-10 m-auto">
      <div class="text-gray-500 text-base py-2">
        {handleWalletDepositError(error)}
      </div>
      <div class="flex flex-col gap-4">
        <Button variant="brand" on:click={closeModal}>Try again</Button>
        <Button href={routes.wallet}>Select Another Payment Methood</Button>
      </div>
    </div>
  </Modal>
{/if}
