<script lang="ts">
  import { closeModal, Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';

  export let isOpen;
  export let error: { status: number; data: { message: string } };
</script>

{#if isOpen}
  <Modal title="Whoops, something went wrong." on:close={closeModal}>
    <div class="flex flex-col justify-center items-center gap-6 mt-2 text-base max-w-sm text-center py-4 px-10 m-auto">
      <div class="text-gray-500 text-base py-2">
        {#if error?.data?.message}
          {error.data.message}
        {:else}
          We couln’t process your payment and the transaction was cancelled.
        {/if}
      </div>
      <div class="flex flex-col gap-4">
        <Button variant="brand" on:click={closeModal}>Try again</Button>
        <Button href={routes.wallet}>Select Another Payment Methood</Button>
      </div>
    </div>
  </Modal>
{/if}
