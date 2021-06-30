<script lang="ts">
  import { mdiCloseThick } from '@mdi/js';
  import { toast } from '$ui/toast';
  import Modal from '$ui/modal/Modal.svelte';
  import { goto } from '$app/navigation';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from '$lib/components/Button.svelte';
  import { cancelSale } from './product.api';

  export let show: boolean;
  export let listingId: string;
  export let productId: string;
  let disabled = false;

  async function submit() {
    try {
      disabled = true;
      await cancelSale({ id: listingId });
      goto(`/product/${productId}`);
      show = false;
      toast.success('Listing successfully cancelled.');
    } catch {
      toast.danger('Whoops, something went wrong - please try again.');
    } finally {
      disabled = false;
    }
  }
</script>

<Modal title="List your NFTs for sale" bind:open={show}>
  <div class="flex items-center gap-2 justify-center" slot="title">
    <Icon path={mdiCloseThick} color="red" />
    <span>Cancel Sale?</span>
  </div>
  <div class="flex flex-col w-80 border-t border-gray-200 justify-evenly gap-5 text-center">
    <span class="text-sm text-gray-500 py-5">
      By confirming this action you will remove this item from the marketplace and will not be available for other users
      to buy.
    </span>
    <Button {disabled} on:click={submit}>Yes</Button>
    <Button on:click={() => (show = false)}>Go Back</Button>
  </div>
</Modal>
