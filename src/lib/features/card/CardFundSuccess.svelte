<script lang="ts">
  import { closeModal, Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';

  export let isOpen;
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div class="flex flex-col justify-center items-center gap-4 mt-2 text-base max-w-sm text-center py-4 px-10">
      <div class="text-2xl text-black">🤘 Yeah! Funds added.</div>
      <div class="text-gray-500 font-extrabold italic text-base">
        Check your open tabs to refresh your previous screen to see your added funds<br />
        or
      </div>
      <div class="flex flex-col gap-4">
        <Button href="/marketplace">Go to Marketplace</Button>
        <a href="/u/wallet" class="text-black text-xl py-2">View Wallet</a>
      </div>
    </div>
  </Modal>
{/if}
