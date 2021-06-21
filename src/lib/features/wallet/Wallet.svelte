<script lang="ts">
  import DepositCoinbase from '$lib/payment/coinbase/DepositCoinbase.svelte';
  import WalletHead from './WalletHead.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletDepositModal from './deposit/WalletDepositModal.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';

  let showDepositModal = false;

  let selectedDepositMethod: string;
  function onDepositSelect(event: CustomEvent) {
    showDepositModal = false;
    selectedDepositMethod = event.detail.id;
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
  <div class="w-full md:w-4/5"><WalletList /></div>
</div>

{#if showDepositModal}
  <WalletDepositModal on:select={onDepositSelect} />
{/if}

{#if selectedDepositMethod === 'coinbase'}
  <DepositCoinbase on:checkout-modal-closed={() => (selectedDepositMethod = undefined)} />
{/if}

<style>
  .section-divider {
    background: rgba(0, 0, 0, 0.12);
  }
</style>
