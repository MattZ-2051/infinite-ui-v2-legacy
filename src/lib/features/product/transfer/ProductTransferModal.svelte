<script lang="ts">
  /* eslint-disable unicorn/prefer-ternary */
  import type { Product, Profile } from '$lib/sku-item/types';
  import type { TransferOutResponse } from '$lib/features/infinite-wallet/types';
  import { mdiAccountOutline, mdiLinkVariant, mdiWalletOutline } from '@mdi/js';
  import { goto } from '$app/navigation';
  import { user } from '$lib/user';
  import { Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import { InfiniteExtensionStore } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import { INFINITE_EXTENSION_ENABLED } from '$project/variables';
  import routes from '$project/routes';
  import SelectUser from './SelectUser.svelte';
  import SelectExternalWallet from './SelectExternalWallet.svelte';
  import { transferProductFx, transferProductOutFx } from './product-transfer.store';

  export let isOpen: boolean;
  export let product: Product;

  let showTryAgain = true;
  let transferType: 'user' | 'external-wallet';
  let status:
    | 'select-transfer-type'
    | 'select-recipient'
    | 'confirm-recipient'
    | 'transfer-success'
    | 'transfer-pending'
    | 'transfer-error' = 'select-transfer-type';
  let selectedUser: Profile = undefined;
  let selectedWallet: string = undefined;

  const waitingForAPI = transferProductFx.pending || transferProductOutFx.pending;
  let transferOutResult: TransferOutResponse;
  transferProductOutFx.doneData.watch(({ response }) => (transferOutResult = response));

  $: titleMap = {
    'select-transfer-type': 'Transfer NFT',
    'select-recipient': transferType === 'user' ? 'Transfer to a user' : 'Transfer NFT',
    'confirm-recipient': 'You are about to transfer:',
    'transfer-success': 'NFT transfered!',
    'transfer-pending': 'Transferring...',
    'transfer-error': 'Whoops, something went wrong!',
  };

  $: sku = product.sku;

  async function onConfirmTransfer(type: typeof transferType, recipient: Profile | string) {
    try {
      status = 'transfer-pending';
      if (type === 'user') {
        await transferProductFx({ product, user: recipient as Profile });
      } else {
        if ($InfiniteExtensionStore.loggedIn && selectedWallet === $InfiniteExtensionStore.current?.id) {
          await transferProductOutFx({ product, account: $InfiniteExtensionStore.current });
        } else {
          await transferProductOutFx({ product, walletAddress: selectedWallet });
        }
      }
      status = 'transfer-success';
    } catch (error) {
      showTryAgain = true;
      if (error.data?.appCode === 'TRANSFER_WITH_PENDING_TRANSACTIONS') {
        titleMap['transfer-error'] = 'This product has pending transactions';
      }
      if (error.data?.appCode === 'TRANSFER_WITH_GATE_KEEPING_RULES') {
        titleMap['transfer-error'] = 'This NFT is non-transferable due to preset rules';
        showTryAgain = false;
      }
      status = 'transfer-error';
    }
  }
</script>

{#if isOpen}
  <Modal title={titleMap[status]} class="max-w-md" persistent={status === 'transfer-pending'}>
    <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
      {#if status === 'transfer-success'}
        <span class="inline-flex gap-2"
          >You sucessfully sent
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
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={sku.nftPublicAssets?.[0]} preview />
        </div>
        {#if status !== 'transfer-pending'}
          <ProductModalInfo {sku} {product} />
        {/if}
      {/if}
      {#if status === 'select-recipient'}
        {#if transferType === 'user'}
          <SelectUser bind:selectedUser />
        {:else}
          <SelectExternalWallet bind:selectedWallet />
        {/if}
      {:else if status === 'confirm-recipient' || status === 'transfer-success'}
        <div class="flex justify-center gap-2">
          <span class="text-gray-500"
            >to {#if transferType === 'external-wallet'}the external wallet{/if}</span
          >
          <span>
            {#if transferType === 'user'}
              {`@${selectedUser.username}`}
            {:else}
              {selectedWallet}
            {/if}
          </span>
        </div>
        <div class="text-gray-500 text-sm text-center space-y-4">
          {#if status === 'confirm-recipient'}
            {#if transferType === 'user'}
              Transferring a product will change ownership from you to the selected user.
            {:else}
              {#if selectedWallet !== $InfiniteExtensionStore?.current?.id}
                <p class="text-sm text-red-500 text-center">
                  Caution: You've entered an external address manually, please make sure that token <strong
                    >{product.tokenId.split('-')[0]}</strong
                  >
                  is associated with wallet <strong>{selectedWallet}</strong> before initiating the transfer. Are you sure
                  you want to proceed?
                </p>
              {/if}
              <p>Transferring a product will change ownership from your account to the selected wallet address.</p>
            {/if}
          {:else if status === 'transfer-success'}
            The transfer will remain as pending while is validated & we will let you know once is complete.
          {/if}
        </div>
      {/if}
      <div class="w-full pt-4">
        {#if status === 'select-transfer-type'}
          <div class="grid grid-cols-1 gap-4">
            <Button
              type="button"
              variant="brand"
              class="inline-flex items-center gap-2 md:gap-4"
              on:click={() => ((transferType = 'user'), (status = 'select-recipient'))}
              >To a User <Icon path={mdiAccountOutline} /></Button
            >
            {#if INFINITE_EXTENSION_ENABLED}
              <Button
                type="button"
                variant="brand"
                class="inline-flex items-center gap-2 text-xl md:gap-4 md:text-2xl"
                on:click={() => ((transferType = 'external-wallet'), (status = 'select-recipient'))}
              >
                To an external wallet <Icon path={mdiWalletOutline} />
              </Button>
            {/if}
          </div>
        {:else if status === 'select-recipient'}
          <Button
            variant="brand"
            class="w-full mt-6"
            disabled={(transferType === 'user' && selectedUser === undefined) ||
              (transferType === 'external-wallet' && selectedWallet === undefined)}
            on:click={() => (status = 'confirm-recipient')}>Transfer NFT</Button
          >
          <Button
            class="w-full mt-6"
            type="button"
            variant="outline-brand"
            disabled={$waitingForAPI}
            on:click={() => ((transferType = undefined), (status = 'select-transfer-type'))}>Go Back</Button
          >
        {:else if status === 'confirm-recipient'}
          <div class="grid grid-cols-1 gap-4">
            <Button
              variant="brand"
              disabled={$waitingForAPI}
              on:click={async () => await onConfirmTransfer(transferType, selectedUser ?? selectedWallet)}
              >Confirm Transfer</Button
            >
            <Button variant="outline-brand" disabled={$waitingForAPI} on:click={() => (status = 'select-recipient')}
              >Go Back</Button
            >
          </div>
        {:else if status === 'transfer-success'}
          <div class="grid grid-cols-1 gap-4">
            <Button
              variant="outline-brand"
              disabled={$waitingForAPI}
              on:click={() => goto(routes.collection($user.username))}>Back to Collection</Button
            >
            <Button variant="outline-brand" disabled={$waitingForAPI} on:click={() => goto(routes.marketplace)}
              >Back to Marketplace</Button
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
            {#if showTryAgain}
              <Button variant="brand" type="button" on:click={() => (status = 'select-recipient')}>Try Again</Button>
            {/if}
            <Button variant="outline-brand" on:click={() => goto(routes.help)}>Help/Contact Support</Button>
          </div>
        {/if}
      </div>
    </div>
  </Modal>
{/if}
