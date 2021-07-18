<script lang="ts">
  import { closeModal, Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { cancelAuction } from './auction.api';
  import { auctionCancelled } from '../product.store';

  export let isOpen = false;
  export let listingId: string;

  let waitingForAPI = false;

  async function onCancelAuction() {
    waitingForAPI = true;

    await cancelAuction(listingId)
      .then(() => {
        closeModal();
        toast.success('Your auction has been canceled.');
        auctionCancelled({ listingId });
        return true;
      })
      .catch(() => toast.danger('Whoops, something went wrong - please try again.'))
      .finally(() => (waitingForAPI = false));
  }
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div class="text-2xl font-medium flex items-center" slot="title">
      <span class="mr-2 text-base">❌</span>
      Cancel auction?
    </div>
    <div class="flex flex-col px-10 py-2">
      <div class="flex gap-8 justify-between border-solid border-t border-gray-200 py-8 mb-6">
        This action will cancel your for sale listing for this NFT.
      </div>
      <div class="w-full mb-6">
        <Button type="button" disabled={waitingForAPI} on:click={onCancelAuction} class="mb-4">Yes</Button>
        <Button type="button" on:click={closeModal}>Go Back</Button>
      </div>
    </div>
  </Modal>
{/if}
