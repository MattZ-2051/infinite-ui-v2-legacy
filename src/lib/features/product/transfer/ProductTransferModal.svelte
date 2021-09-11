<script lang="ts">
  import type { Product, Profile } from '$lib/sku-item/types';
  import { goto } from '$app/navigation';
  import { user } from '$lib/user';
  import { closeModal, Modal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import routes from '$project/routes';
  import SelectUser from './SelectUser.svelte';
  import { transferProductFx } from './product-transfer.store';

  export let isOpen: boolean;
  export let product: Product;

  let status: 'select-user' | 'confirm-user' | 'transfer-success' | 'transfer-error' = 'select-user';
  let selectedUser: Profile = undefined;
  const waitingForAPI = transferProductFx.pending;

  $: sku = product.sku;
  $: serial = product.serialNumber;

  async function onConfirmTransfer(toUser: Profile) {
    try {
      await transferProductFx({ product, user: toUser });
      status = 'transfer-success';
    } catch {
      status = 'transfer-error';
    }
  }
</script>

{#if isOpen}
  <Modal on:close={closeModal} class="max-w-md">
    <div class="px-8 py-6 flex flex-col items-center gap-4">
      <div class="flex flex-col gap-4 items-center font-medium">
        <div class="text-2xl">
          {#if status === 'select-user'}
            👋 Transfer NFT to user
          {:else if status === 'confirm-user'}
            ✋ Are you sure?
          {:else if status === 'transfer-success'}
            👏 NFT transfered!
          {:else}
            😬 Whoops, something went wrong!
          {/if}
        </div>
        <div class="text-gray-400">
          {#if status === 'select-user'}
            Search for a user and send the following item.
          {:else if status === 'confirm-user'}
            You are about to transfer...
          {:else if status === 'transfer-success'}
            You sucessfully sent the following item!
          {:else}
            There was an error processing your transaction, please try again or contact support if the issue persists.
          {/if}
        </div>
      </div>
      {#if status !== 'transfer-error'}
        <div class="border-t border-b border-gray-200 py-4">
          <ProductModalInfo {sku} />
        </div>
      {/if}
      <div class="w-full">
        {#if status === 'select-user'}
          <SelectUser bind:selectedUser />
        {:else if status === 'confirm-user' || status === 'transfer-success'}
          <div class="grid grid-cols-1 gap-4 text-center">
            <div class="text-gray-400">to</div>
            <div class="text-2xl font-medium">
              {`@${selectedUser.username}`}
            </div>
            <div class="text-gray-400 text-center">
              {#if status === 'confirm-user'}
                Transferring a product will change ownership from you to the selected user.
              {:else if status === 'transfer-success'}
                The transfer will remain as pending while is validated & we will let you know once is complete.
              {/if}
            </div>
          </div>
        {/if}
      </div>
      <div class="w-full pt-4">
        {#if status === 'select-user'}
          <Button type="button" disabled={selectedUser === undefined} on:click={() => (status = 'confirm-user')}
            >Transfer NFT</Button
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
