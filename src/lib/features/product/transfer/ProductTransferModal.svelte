<script lang="ts">
  import type { Product, Profile } from '$lib/sku-item/types';
  import { goto } from '$app/navigation';
  import { user } from '$lib/user';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import routes from '$project/routes';
  import SelectUser from './SelectUser.svelte';
  import { transferProductFx } from './product-transfer.store';

  export let isOpen: boolean;
  export let product: Product;

  let status: 'select-user' | 'confirm-user' | 'transfer-success' | 'transfer-pending' | 'transfer-error' =
    'select-user';
  let selectedUser: Profile = undefined;
  const waitingForAPI = transferProductFx.pending;
  const titleMap = {
    'select-user': 'Transfer to a user',
    'confirm-user': 'Are you sure?',
    'transfer-success': 'NFT transfered!',
    'transfer-pending': 'Transferring...',
    'transfer-error': 'Whoops, something went wrong!',
  };

  $: sku = product.sku;

  async function onConfirmTransfer(toUser: Profile) {
    try {
      status = 'transfer-pending';
      await transferProductFx({ product, user: toUser });
      status = 'transfer-success';
    } catch {
      status = 'transfer-error';
    }
  }
</script>

{#if isOpen}
  <Modal title={titleMap[status]} on:close={closeModal} class="max-w-md">
    <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
      {#if status !== 'transfer-error'}
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={sku.nftPublicAssets?.[0]} preview />
        </div>
        {#if status !== 'transfer-pending'}
          <ProductModalInfo {sku} {product} />
        {/if}
      {/if}
      {#if status === 'select-user'}
        <SelectUser bind:selectedUser />
      {:else if status === 'confirm-user' || status === 'transfer-success'}
        <div class="flex gap-2">
          <span class="text-black-opacity-40">to</span>
          <span>
            {`@${selectedUser.username}`}
          </span>
        </div>
        <div class="text-black-opacity-40 text-sm">
          {#if status === 'confirm-user'}
            Transferring a product will change ownership from you to the selected user.
          {:else if status === 'transfer-success'}
            The transfer will remain as pending while is validated & we will let you know once is complete.
          {/if}
        </div>
      {/if}
      <div class="w-full pt-4">
        {#if status === 'select-user'}
          <Button
            class="w-full mt-6"
            type="button"
            disabled={selectedUser === undefined}
            on:click={() => (status = 'confirm-user')}>Transfer NFT</Button
          >
        {:else if status === 'confirm-user'}
          <div class="grid grid-cols-1 gap-4">
            <Button type="button" disabled={$waitingForAPI} on:click={async () => await onConfirmTransfer(selectedUser)}
              >Confirm Transfer</Button
            >
            <Button
              type="button"
              variant="secondary"
              disabled={$waitingForAPI}
              on:click={() => (status = 'select-user')}>Go Back</Button
            >
          </div>
        {:else if status === 'transfer-success'}
          <div class="grid grid-cols-1 gap-4">
            <Button
              type="button"
              variant="secondary"
              disabled={$waitingForAPI}
              on:click={() => goto(routes.collection($user.username))}>Back to Collection</Button
            >
            <Button
              type="button"
              variant="secondary"
              disabled={$waitingForAPI}
              on:click={() => goto(routes.marketplace)}>Back to Marketplace</Button
            >
          </div>
        {:else if status === 'transfer-pending'}
          <div class="flex flex-col items-center gap-4">
            <DualRingLoader />
            <div class="text-black-opacity-40 flex flex-col text-center">
              <span>Processing your request.</span><span>Do not close this window.</span>
            </div>
          </div>
        {:else}
          <div class="grid grid-cols-1 gap-4">
            <Button type="button" on:click={() => (status = 'select-user')}>Try Again</Button>
            <Button type="button" variant="secondary" on:click={() => goto(routes.help)}>Help/Contact Support</Button>
          </div>
        {/if}
      </div>
    </div>
  </Modal>
{/if}
