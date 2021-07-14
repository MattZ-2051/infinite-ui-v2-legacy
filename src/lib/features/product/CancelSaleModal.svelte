<script lang="ts">
  import { mdiCloseThick } from '@mdi/js';
  import { toast } from '$ui/toast';
  import { closeModal, Modal } from '$ui/modals';
  import { goto } from '$app/navigation';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from '$lib/components/Button.svelte';
  import { cancelSale } from './product.api';

  export let isOpen: boolean;
  export let listingId: string;
  export let productId: string;

  let disabled = false;

  async function submit() {
    try {
      disabled = true;
      await cancelSale({ id: listingId });
      toast.success('Listing successfully cancelled.');
      closeModal();
      // TODO: replace with data reload. Does goto work?
      setTimeout(() => window.location.reload(), 1000);
      goto(`/product/${productId}`);
    } catch {
      toast.danger('Whoops, something went wrong - please try again.');
    } finally {
      disabled = false;
    }
  }
</script>

{#if isOpen}
  <Modal title="Cancel Sale?" on:close={closeModal}>
    <Icon path={mdiCloseThick} color="red" slot="icon" />
    <div class="flex flex-col w-80 border-t border-gray-200 justify-evenly gap-5 text-center px-10 py-6">
      <span class="text-sm text-gray-500">
        By confirming this action you will remove this item from the marketplace and will not be available for other
        users to buy.
      </span>
      <div class="flex flex-col gap-4 px-2">
        <Button {disabled} on:click={submit}>Yes</Button>
        <Button on:click={closeModal}>Go Back</Button>
      </div>
    </div>
  </Modal>
{/if}
