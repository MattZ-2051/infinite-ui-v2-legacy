<script lang="ts">
  import { closeModal, Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';

  export let isOpen;
  export let error: { status: number; data: { message: string } };
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div class="flex flex-col justify-center items-center gap-6 mt-2 text-base max-w-sm text-center py-4 px-10">
      <div class="text-2xl text-black">⚠️ Whoops, something went wrong.</div>
      <div class="text-gray-500 font-extrabold italic text-base py-2">
        {#if error?.data?.message}
          {error.data.message}
        {:else}
          We couln’t process your payment and the transaction was cancelled.
        {/if}
      </div>
      <div class="flex flex-col gap-4">
        <Button type="button" on:click={closeModal}>Try again</Button>
        <a href={routes.wallet} class="text-black text-xl py-2">Select Another Payment Methood</a>
      </div>
    </div>
  </Modal>
{/if}
