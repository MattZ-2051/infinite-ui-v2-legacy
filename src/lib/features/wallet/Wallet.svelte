<script lang="ts">
  import { goto } from '$app/navigation';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { user } from '$lib/user';
  import DepositCoinbase from '$lib/payment/coinbase/DepositCoinbase.svelte';
  import USDC from '$lib/payment/usdc/USDC.svelte';
  import DepositHedera from '$lib/payment/hedera/DepositHedera.svelte';
  import routes from '$lib/routes';
  import { variables } from '$lib/variables';
  import Button from '$lib/components/Button.svelte';
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
</script>

<div
  class="flex flex-col gap-x-24 gap-y-14 items-center md:flex-row md:justify-between mt-4 md:mt-16 md:items-baseline container"
>
  <div class="w-full md:w-1/5">
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

    <Button class="flex justify-between" on:click={openDepositSelectModal}>
      <span>Deposit</span>
      <!-- <Icon path={mdiArrowRight} size="1.2" /> -->
    </Button>
    <Button
      class="flex justify-between"
      disabled={!$withdrawableBalance || $withdrawableBalance === 0}
      on:click={() => openModal(WithdrawModal)}
    >
      <span>Withdraw</span>
      <!-- <Icon path={mdiArrowLeft} size="1.2" /> -->
    </Button>
  </div>
  <div class="w-full md:w-4/5"><WalletList {tab} /></div>
</div>

{#if selectedDepositMethod === 'coinbase'}
  <DepositCoinbase on:checkout-modal-closed={() => (selectedDepositMethod = undefined)} />
{/if}

<style>
</style>
