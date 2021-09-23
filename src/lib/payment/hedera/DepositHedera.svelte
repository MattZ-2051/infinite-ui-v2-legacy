<script lang="ts">
  import type { HbarTransaction } from '$lib/features/wallet/types';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Modal, closeModal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import Image from '$ui/image/Image.svelte';
  import Hbar from '$lib/features/wallet/deposit/hbar-avatar.png?w=32&format=avif;webp;png&metadata';
  import { loadExplorerLink, checkHbarDeposits, loadingHbarTransactions } from '$lib/features/wallet/wallet.api';
  import WalletAddress from './WalletAddress.svelte';
  import ExplorerLink from './ExplorerLink.svelte';
  import HederaTransactionList from './HederaTransactionList.svelte';

  export let isOpen: boolean;
  let explorerLink: string;
  let transactionsView = false;
  let transactions: HbarTransaction[];

  onMount(async () => {
    ({ explorerLink } = await loadExplorerLink());
  });

  const checkPayments = async () => {
    transactions = await checkHbarDeposits();
    transactionsView = true;
  };

  const dispatch = createEventDispatcher();

  const onClose = () => {
    closeModal();
    dispatch('close');
  };
</script>

{#if isOpen}
  <Modal title="Deposit HBAR" on:close={onClose}>
    <div
      slot="title"
      class="flex flex-grow gap-3 border-b-2 border-black font-medium text-2xl text-center py-3"
      class:opacity-40={$loadingHbarTransactions}
    >
      <Image src={Hbar} />
      <span>Deposit HBAR</span>
    </div>
    <div class="flex gap-6 flex-col p-10" class:opacity-40={$loadingHbarTransactions}>
      {#if transactionsView}
        <div class="flex flex-grow items-center justify-between text-sm text-gray-500">
          <span>Deposits will be made to...</span>
          <ExplorerLink {explorerLink} />
        </div>
        <WalletAddress />
        <HederaTransactionList {transactions} />
        <Button variant="brand" on:click={checkPayments}>Check for new HBAR deposits</Button>
        <Button variant="outline-brand" on:click={onClose}>Back to wallet</Button>
      {:else}
        <div class="flex flex-col gap-1">
          <span>Step 1:</span>
          <span class="text-gray-500">Send an hbar deposit to your wallet address</span>
          <span class="text-gray-500 text-sm">(provided below)</span>
        </div>
        <ExplorerLink {explorerLink} />
        <WalletAddress />
        <div class="flex flex-col gap-1">
          <span>Step 2:</span>
          <span class="text-gray-500">Check for new transactions to credit them to your account</span>
        </div>
        <Button variant="brand" on:click={checkPayments}>Check for new HBAR deposits</Button>
      {/if}
    </div>
  </Modal>
{/if}
