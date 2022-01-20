<script lang="ts">
  /* eslint-disable unicorn/prefer-ternary */
  import type { Product } from '$lib/sku-item/types';
  import type { TransferOutResponse } from '$lib/features/infinite-wallet/types';
  import { mdiLinkVariant } from '@mdi/js';
  import { goto } from '$app/navigation';
  import { user } from '$lib/user';
  import { closeModal, Modal } from '$ui/modals';
  import routes from '$project/routes';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import Button from '$lib/components/Button.svelte';
  import {
    InfiniteExtensionStore,
    MirrorNodeBalanceDataStore,
  } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import Icon from '$ui/icon/Icon.svelte';
  import { transferProductInFx } from './product-transfer.store';

  export let isOpen: boolean;
  export let product: Product;

  let status: 'confirm-transfer' | 'transfer-success' | 'transfer-pending' | 'transfer-error' = 'confirm-transfer';

  const waitingForAPI = transferProductInFx.pending;
  let transferOutResult: TransferOutResponse;
  transferProductInFx.doneData.watch(({ response }) => (transferOutResult = response));

  $: titleMap = {
    'confirm-transfer': 'Are you sure?',
    'transfer-success': 'NFT transfered!',
    'transfer-pending': 'Transferring...',
    'transfer-error': 'Whoops, something went wrong!',
  };

  $: sku = product.sku;

  $: externalWallet = { account: $InfiniteExtensionStore?.current, balanceData: $MirrorNodeBalanceDataStore };

  async function onConfirmTransfer() {
    try {
      status = 'transfer-pending';
      await transferProductInFx({
        product,
        account: externalWallet.account,
        balanceData: externalWallet.balanceData,
        user: $user,
      });
      status = 'transfer-success';
    } catch {
      status = 'transfer-error';
    }
  }
</script>

{#if isOpen}
  <Modal title={titleMap[status]} on:close={closeModal} class="max-w-md">
    <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
      {#if status === 'transfer-success'}
        <span class="inline-flex gap-2"
          >You sucessfully transfered
          {#if transferOutResult?.transactionData?.explorerLink}<a
              href={transferOutResult?.transactionData?.explorerLink}
              target="_blank"
              rel="noreferrer"
              ><Icon
                tooltip={{ content: 'View transaction' }}
                path={mdiLinkVariant}
                size="0.8"
                class="w-6 justify-self-center text-gray-500 hover:text-current"
              /></a
            >{/if}
        </span>
      {/if}
      {#if status !== 'transfer-error'}
        <!--<div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={sku.nftPublicAssets?.[0]} preview />
        </div>-->
        {#if status !== 'transfer-pending'}
          <ProductModalInfo {sku} {product} />
        {/if}
      {/if}
      {#if status === 'confirm-transfer' || status === 'transfer-success'}
        <div class="flex gap-2 justify-center">
          <span class="text-gray-500">From hedera external wallet</span>
          <span>
            {$InfiniteExtensionStore.current.id}
          </span>
        </div>
        <div class="text-gray-500 text-sm text-center">
          {#if status === 'confirm-transfer'}
            Would you like to transfer token to your INFINITE in app wallet?
          {:else if status === 'transfer-success'}
            The transfer will remain as pending while is validated & we will let you know once is complete.
          {/if}
        </div>
      {/if}
      <div class="w-full pt-4">
        {#if status === 'confirm-transfer'}
          <div class="grid grid-cols-1 gap-4">
            <Button
              class="text-xl md:gap-4 md:text-2xl"
              type="button"
              variant="brand"
              disabled={$waitingForAPI}
              on:click={async () => await onConfirmTransfer()}>Confirm Transfer</Button
            >
          </div>
        {:else if status === 'transfer-success'}
          <div class="grid grid-cols-1 gap-4">
            <Button
              class="text-xl md:gap-4 md:text-2xl"
              type="button"
              variant="brand"
              disabled={$waitingForAPI}
              on:click={() => goto(routes.collection($user.username))}>Back to Collection</Button
            >
            <Button
              class="text-xl md:gap-4 md:text-2xl"
              type="button"
              variant="outline-brand"
              disabled={$waitingForAPI}
              on:click={() => goto(routes.marketplace)}>Back to Marketplace</Button
            >
          </div>
        {:else if status === 'transfer-pending'}
          <div class="flex flex-col items-center gap-4">
            <DualRingLoader />
            <div class="text-gray-500 flex flex-col text-center">
              <span>Processing your request.</span><span>Do not close this window.</span>
            </div>
          </div>
        {:else}
          <div class="grid grid-cols-1 gap-4">
            <Button
              class="text-xl md:gap-4 md:text-2xl"
              type="button"
              variant="brand"
              on:click={() => (status = 'confirm-transfer')}>Try Again</Button
            >
            <Button
              class="text-xl md:gap-4 md:text-2xl"
              type="button"
              variant="outline-brand"
              on:click={() => goto(routes.help)}>Help/Contact Support</Button
            >
          </div>
        {/if}
      </div>
    </div>
  </Modal>
{/if}
