<script lang="ts">
  import { goto } from '$app/navigation';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { user } from '$lib/user';
  import CryptoCurrency from '$lib/payment/crypto/CryptoCurrency.svelte';
  import DepositHedera from '$lib/payment/hedera/DepositHedera.svelte';
  import routes from '$project/routes';
  import { variables } from '$lib/variables';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletDepositModal from './deposit/WalletDepositModal.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';
  import WithdrawModal from './withdraw/WithdrawModal.svelte';
  import WalletButtons from './WalletButtons.svelte';
  import { kycIsPending, wallet, withdrawableBalance } from './wallet.store';
  import { launchKYCPersona } from './kyc/personaClient.service';
  import { getDailyDepositLimitDisclaimer } from './kyc/kyc.service';

  export let tab: 'transactions' | 'bids';

  $: isKycCleared = $wallet?.kycMaxLevel >= 1;
  $: isKycPending = $wallet?.kycPending;

  function openDepositSelectModal() {
    openModal(WalletDepositModal, { onDepositSelect });
  }

  function openUpgradeKYCLevel() {
    launchKYCPersona(
      $wallet.kycMaxLevel === 1 ? variables.persona.templateIdLevel2 : variables.persona.templateIdLevel1,
      (inquiryId) => {
        kycIsPending(inquiryId);
      }
    );
  }

  function onDepositSelect(id: 'circle' | 'usdc' | 'btc' | 'eth' | 'hbar') {
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
        onClick: { verificationStepsCb: openUpgradeKYCLevel },
      });
      return;
    }

    switch (id) {
      case 'usdc':
      case 'btc':
      case 'eth':
        openModal(CryptoCurrency, { kind: id });
        break;
      case 'hbar':
        openModal(DepositHedera);
        break;
    }
  }

  $: canWithdraw = $withdrawableBalance > 0;
</script>

<StickyColumn reverse>
  <div slot="onscreen-content" class="py-12 md:pl-12">
    <WalletList {tab} />
  </div>
  <div
    slot="sticky-content"
    class="h-full px-4 py-6 md:px-8 md:py-12 -container-x md:-container-none"
    style="background-color: #1D1A54;"
  >
    <WalletBalance
      balance={$user?.balance}
      availableBalance={$user?.availableBalance}
      withdrawableBalance={$withdrawableBalance}
    >
      <svelte:fragment slot="kyc">
        {#if $wallet}
          <AccountVerification
            on:upgrade={openUpgradeKYCLevel}
            level={$wallet.kycMaxLevel}
            pending={$wallet.kycPending}
          />
        {/if}
      </svelte:fragment>
    </WalletBalance>

    {#if $wallet}
      <div class="text-sm text-gray-700 mt-4">
        {getDailyDepositLimitDisclaimer($wallet.kycMaxLevel, variables.dailyDepositLimit)}
      </div>
    {/if}
  </div>
  <WalletButtons
    slot="sticky-cta"
    {canWithdraw}
    on:deposit={openDepositSelectModal}
    on:withdraw={() => openModal(WithdrawModal)}
  />
</StickyColumn>
