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
  <Modal title={`${coinName} Deposit`} on:close={onClose}>
    <p slot="title" class="font-medium text-3xl text-center px-8 py-6">{`${coinName} Deposit`}</p>
    <div class="p-10 text-gray-400">
      <p class="m-auto w-max max-w-sm text-center">
        Funds sent to the following address will be automatically credited to your account.
      </p>
      {#if address}
        <div class="mt-8 text-center">
          <input type="text" disabled value={address} class="border-b-2 border-dotted bg-transparent w-96" />
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
              <div class="mt-4 text-xs max-w-xs mx-auto">
                Your deposit has been received. It will take a moment for it to show up in your transaction history.
              </div>
            </div>
          {:else}
            <DualRingLoader class="mt-4" />
          {/if}
        </div>
      {:else}
        <div class="flex flex-col items-center my-12 gap-3">
          <Button on:click={onGenerateCryptoAddress}>Generate {coinName} Address</Button>
          <Button on:click={onClose} variant="tertiary" class="font-bold">Back to Wallet</Button>
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
