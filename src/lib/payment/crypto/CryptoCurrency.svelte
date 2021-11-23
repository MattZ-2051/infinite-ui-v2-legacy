<script lang="ts">
  import type { Unsubscriber, Writable } from 'svelte/store';
  import type { CryptoKind } from './types';

  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { get as getStoreValue, writable } from 'svelte/store';
  import { Modal, closeModal } from '$ui/modals';
  import tooltip from '$ui/tooltip';
  import Button from '$lib/components/Button.svelte';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import * as crypto from '.';

  export let kind: CryptoKind;

  const dispatch = createEventDispatcher();
  const explorerBaseUrl = crypto.getExplorerBaseUrl(kind);
  const chainName = crypto.getChainName(kind);
  const coinName = crypto.getCoinName(kind);

  let txLink: string;
  let txLinkUnsubscriber: Unsubscriber;
  let pollingTimeoutStore: Writable<ReturnType<typeof setTimeout>>;

  $: address = <string>undefined;

  onMount(() => {
    pollingTimeoutStore = writable(<ReturnType<typeof setTimeout>>undefined);
  });

  async function onGenerateCryptoAddress() {
    address = (await crypto.generateCryptoAddress(kind)).address;

    const txLinkReceivedStore = writable(<string>undefined);
    txLinkUnsubscriber = txLinkReceivedStore.subscribe((_txLink) => {
      if (_txLink) {
        txLink = _txLink;
      }
    });

    const watcher = crypto.getCryptoAddressWaiter(kind);

    await watcher(address, txLinkReceivedStore, pollingTimeoutStore);
  }

  function resetState() {
    if (txLinkUnsubscriber) {
      txLinkUnsubscriber();
      txLinkUnsubscriber = undefined;
    }

    const timeout: ReturnType<typeof setTimeout> = getStoreValue(pollingTimeoutStore);

    if (timeout) {
      clearTimeout(timeout);
    }

    address = undefined;
  }

  function onClose() {
    closeModal();
    resetState();
    dispatch('close');
  }

  onDestroy(() => {
    resetState();
  });

  export let isOpen: boolean;
</script>

{#if isOpen}
  <Modal title={`${coinName} Deposit`} {onClose}>
    <div class="p-10 text-gray-500">
      {#if address}
        {#if kind === 'eth-native'}
          <p class="m-auto w-max max-w-xs">
            Wallet address successfully created! ETH sent to the following address will be credited to your account.
            These funds will be stored in ETH and can be withdrawn as ETH.
          </p>
        {:else}
          <p class="m-auto w-max max-w-xs">
            Wallet address succesfully created! Send the funds to the following address and they will be automatically
            credited to your account.
          </p>
        {/if}
      {:else}
        <p class="m-auto w-max max-w-xs">
          Generate the {coinName} Address and then deposit your funds to that address. Funds sent to the following address
          will be automatically credited to your account.
        </p>
      {/if}
      {#if address}
        <div class="mt-8 text-center">
          <input type="text" disabled value={address} class="border-b-2 border-dotted bg-transparent w-full" />
          <div class="mt-4 text-xs max-w-xs mx-auto">
            This is a {coinName} ({chainName}) address. Please do not send any other currencies to this address, it
            accepts {coinName} only. Funds sent to this address will be automatically credited to your account.
          </div>
          {#if txLink}
            <div class="mx-auto mt-8 max-w-xs">
              <p class="font-medium text-lg mb-1">Success!</p>
              <div class="w-full overflow-hidden break-all">
                <a
                  href={`${explorerBaseUrl}${txLink}`}
                  class="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  use:tooltip={'Open transaction'}>{txLink}</a
                >
              </div>
              <div class="mt-4 text-xs max-w-xs mx-auto text-red-500">
                Your deposit has been received. It may take up to 10 minutes to show up in your wallet.
              </div>
            </div>
          {:else}
            <DualRingLoader class="mt-4" />
          {/if}
        </div>
      {:else}
        <div class="flex flex-col mt-12 gap-3">
          <Button variant="brand" on:click={onGenerateCryptoAddress}>Generate {coinName} Address</Button>
          <Button variant="outline-brand" on:click={onClose}>Go Back</Button>
        </div>
      {/if}
    </div>
  </Modal>
{/if}

<style>
  input {
    color: rgba(0, 0, 0, 0.38);
  }
</style>
