<script lang="ts">
  import { mdiArrowRight } from '@mdi/js';
  import { goto } from '$app/navigation';
  import Icon from '$ui/icon/Icon.svelte';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { user } from '$lib/user';
  import DepositCoinbase from '$lib/payment/coinbase/DepositCoinbase.svelte';
  import USDC from '$lib/payment/usdc/USDC.svelte';
  import DepositHedera from '$lib/payment/hedera/DepositHedera.svelte';
  import routes from '$lib/routes';
  import { variables } from '$lib/variables';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletDepositModal from './deposit/WalletDepositModal.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';
  import WithdrawModal from './withdraw/WithdrawModal.svelte';
  import { wallet, withdrawableBalance } from './wallet.store';
  import { launchKYCPersona } from './kyc/personaClient.service';
  import { getDailyDepositLimitDisclaimer } from './kyc/kyc.service';

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
      goto(routes.deposit);
      return;
    }

    // Cryptocurrencies...
    if (!isKycCleared) {
      const prompt = isKycPending
        ? 'wait until we validate your identity.'
        : `<a data-toast="verificationStepsCb" class="cursor-pointer">click here</a> to complete the required account validation steps. <a href="https://support.suku.world/infinite/how-does-kyc-work">Learn more.</a>`;

      toast.warning(`To deposit cryptocurrency, please, ${prompt}`, {
        onClick: { verificationStepsCb: launchKYCPersona },
      });
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

  $: canWithdraw = $withdrawableBalance > 0;
</script>

<StickyColumn reverse>
  <div slot="onscreen-content" class="p-12">
    <WalletList {tab} />
  </div>
  <div slot="sticky-content" class="h-full p-12" style="background-color: #1D1A54;">
    <WalletBalance
      balance={$user?.balance}
      availableBalance={$user?.availableBalance}
      withdrawableBalance={$withdrawableBalance}
    >
      <svelte:fragment slot="kyc">
        {#if $wallet}
          <AccountVerification on:upgrade={launchKYCPersona} level={$wallet.kycMaxLevel} pending={$wallet.kycPending} />
        {/if}
      </svelte:fragment>
    </WalletBalance>

    {#if $wallet}
      <div class="text-xs font-medium text-white-opacity-50 mt-4">
        {getDailyDepositLimitDisclaimer($wallet.kycMaxLevel, variables.dailyDepositLimit)}
      </div>
    {/if}
  </div>
  <div slot="sticky-cta" class="text-black">
    <button
      type="button"
      class="flex items-center justify-between py-6 px-12 w-full font-medium text-2xl hover:bg-primary"
      on:click={openDepositSelectModal}
    >
      <span>Deposit</span>
      <Icon path={mdiArrowRight} size="2" rotate={-45} />
    </button>
    <div class="h-px w-full bg-black" />
    <button
      type="button"
      class="flex items-center justify-between py-6 px-12 w-full font-medium text-2xl"
      class:hover:bg-primary={canWithdraw}
      on:click={() => openModal(WithdrawModal)}
      disabled={!canWithdraw}
    >
      <span>Withdraw</span>
      <Icon path={mdiArrowRight} size="2" rotate={45} />
    </button>
  </div>
</StickyColumn>

{#if selectedDepositMethod === 'coinbase'}
  <DepositCoinbase on:checkout-modal-closed={() => (selectedDepositMethod = undefined)} />
{/if}

<style>
  button {
    background-color: #c4c4c4;
  }
</style>
