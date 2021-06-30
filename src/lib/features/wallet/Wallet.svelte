<script lang="ts">
  import type { Transaction, Bid } from '$lib/sku-item/types';
  import { goto } from '$app/navigation';
  import DepositCoinbase from '$lib/payment/coinbase/DepositCoinbase.svelte';
  import USDC from '$lib/payment/usdc/USDC.svelte';
  import WalletHead from './WalletHead.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletDepositModal from './deposit/WalletDepositModal.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';

  export let transactions: Transaction[];
  export let total: number;
  export let tab: 'transactions' | 'bids';
  export let bids: Bid[] = [];

  let showDepositModal = false;

  let selectedDepositMethod: string;
  function onDepositSelect({ detail: { id } }: CustomEvent) {
    if (id === 'circle') {
      goto('/u/wallet/deposit');
      return;
    }

    showDepositModal = false;
    selectedDepositMethod = id;
  }
</script>

<div>
  <WalletHead />
</div>
<div
  class="flex flex-col gap-x-24 gap-y-14 items-center md:flex-row md:justify-between mt-4 md:mt-16 md:items-baseline container"
>
  <div class="w-full md:w-1/5">
    <WalletBalance on:deposit={() => (showDepositModal = true)} />
    <hr class="section-divider h-px m-5" />
    <div class="mb-2 mx-6">Account Verification Status:</div>
    <AccountVerification status={'unverified'} class="mx-8" />
  </div>
  <div class="w-full md:w-4/5"><WalletList {transactions} {total} {tab} {bids} /></div>
</div>

<WalletDepositModal on:select={onDepositSelect} bind:show={showDepositModal} />

{#if selectedDepositMethod === 'coinbase'}
  <DepositCoinbase on:checkout-modal-closed={() => (selectedDepositMethod = undefined)} />
{/if}

<USDC open={selectedDepositMethod === 'usdc'} on:close={() => (selectedDepositMethod = undefined)} />

<style>
  .section-divider {
    background: rgba(0, 0, 0, 0.12);
  }
</style>
