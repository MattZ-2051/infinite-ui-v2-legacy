<script lang="ts">
  import type { Transaction, Bid } from '$lib/sku-item/types';
  import { goto } from '$app/navigation';
  import { wallet } from '$lib/features/wallet/index';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
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

  let selectedDepositMethod: string;

  $: isKycCleared = $wallet?.kycMaxLevel >= 1;
  $: isKycPending = $wallet?.kycPending;

  function openDepositSelectModal() {
    openModal(WalletDepositModal, { onDepositSelect });
  }

  function onDepositSelect(id: 'circle' | 'usdc' | 'coinbase') {
    if (!isKycCleared && (id === 'circle' || id === 'coinbase')) {
      const prompt = isKycPending
        ? 'wait until we validate your identity.'
        : 'complete the required account validation steps. ' +
          '<a href="https://support.suku.world/infinite/how-does-kyc-work">Learn more.</a>';

      toast.danger(`To deposit cryptocurrency, please, ${prompt}`);

      return;
    }

    if (id === 'circle') {
      goto('/u/wallet/deposit');
      return;
    }

    if (id === 'usdc') {
      openModal(USDC);
    }

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
    <WalletBalance on:deposit={() => openDepositSelectModal()} />
    <hr class="h-px my-5" />
    <div class="mb-2 mx-6">Account Verification Status:</div>
    <AccountVerification class="mx-8" />
  </div>
  <div class="w-full md:w-4/5"><WalletList {transactions} {total} {tab} {bids} /></div>
</div>

{#if selectedDepositMethod === 'coinbase'}
  <DepositCoinbase on:checkout-modal-closed={() => (selectedDepositMethod = undefined)} />
{/if}
