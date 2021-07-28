<script lang="ts">
  import { goto } from '$app/navigation';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import TooltipIcon from '$lib/components/TooltipIcon.svelte';
  import DepositCoinbase from '$lib/payment/coinbase/DepositCoinbase.svelte';
  import USDC from '$lib/payment/usdc/USDC.svelte';
  import DepositHedera from '$lib/payment/hedera/DepositHedera.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletDepositModal from './deposit/WalletDepositModal.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';
  import WithdrawModal from './withdraw/WithdrawModal.svelte';
  import { wallet } from './wallet.store';

  export let tab: 'transactions' | 'bids';

  let selectedDepositMethod: string;

  $: isKycCleared = $wallet?.kycMaxLevel >= 1;
  $: isKycPending = $wallet?.kycPending;

  function openDepositSelectModal() {
    openModal(WalletDepositModal, { onDepositSelect });
  }

  function onDepositSelect(id: 'circle' | 'usdc' | 'coinbase' | 'hbar') {
    // Credit cards do not need KYC
    if (id === 'circle') {
      goto('/u/wallet/deposit');
      return;
    }

    // Cryptocurrencies...
    if (!isKycCleared) {
      const prompt = isKycPending
        ? 'wait until we validate your identity.'
        : 'complete the required account validation steps. ' +
          '<a href="https://support.suku.world/infinite/how-does-kyc-work">Learn more.</a>';

      toast.warning(`To deposit cryptocurrency, please, ${prompt}`);
      return;
    }

    if (id === 'usdc') {
      openModal(USDC);
    }
    if (id === 'hbar') {
      openModal(DepositHedera);
    }

    selectedDepositMethod = id;
  }
</script>

<div class="header">
  <div class="container">
    <div class="py-5 md:py-10 text-white text-3xl">My Wallet</div>
  </div>
</div>
<div
  class="flex flex-col gap-x-24 gap-y-14 items-center md:flex-row md:justify-between mt-4 md:mt-16 md:items-baseline container"
>
  <div class="w-full md:w-1/5">
    <WalletBalance on:deposit={openDepositSelectModal} on:withdraw={() => openModal(WithdrawModal)} />
    <hr class="h-px my-5" />
    <div class="flex flex-col gap-2 mx-4">
      <div>
        Account Verification Status <TooltipIcon
          tooltip={'Account verification is required for users to deposit cryptocurrency'}
        />
      </div>
      <AccountVerification class="mx-2" />
    </div>
  </div>
  <div class="w-full md:w-4/5"><WalletList {tab} /></div>
</div>

{#if selectedDepositMethod === 'coinbase'}
  <DepositCoinbase on:checkout-modal-closed={() => (selectedDepositMethod = undefined)} />
{/if}

<style>
  .header {
    background: #101010;
  }
</style>
