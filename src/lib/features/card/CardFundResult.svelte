<script lang="ts">
  import { closeModal, Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';

  export let isOpen;
  export let status: 'success' | 'error';
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div class="flex flex-col justify-center items-center gap-4 mt-2 text-base max-w-sm text-center py-4 px-10">
      {#if status === 'success'}
        <div class="text-2xl text-black">🤘 Yeah! Funds added.</div>
        <div class="text-gray-500 font-extrabold italic text-base">
          Check your open tabs to refresh your previous screen to see your added funds<br />
          or
        </div>
        <Button href="/marketplace">Go to Marketplace</Button>
        <a href="/u/wallet" class="text-black text-xl">View Wallet</a>
      {:else if status === 'error'}
        <div class="text-2xl text-black">⚠️ Whoops, something went wrong.</div>
        <div class="text-gray-500 font-extrabold italic text-base">
          We couln’t process your payment and the transaction was cancelled.
        </div>
        <Button type="button" on:click={closeModal}>Try again</Button>
        <a href="/u/wallet" class="text-black text-xl">Select Another Payment Methood</a>
      {/if}
    </div>
  </Modal>
{/if}
