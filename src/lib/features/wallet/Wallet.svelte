<script lang="ts">
  import { goto } from '$app/navigation';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { user } from '$lib/user';
  import CryptoCurrency from '$lib/payment/crypto/CryptoCurrency.svelte';
  import DepositHedera from '$lib/payment/hedera/DepositHedera.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import routes from '$project/routes';
  import { variables } from '$lib/variables';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletDepositModal from './deposit/WalletDepositModal.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';
  import WalletButtons from './WalletButtons.svelte';
  import { kycIsPending, wallet, withdrawableBalance } from './wallet.store';
  import { launchKYCPersona } from './kyc/personaClient.service';
  import { getDailyDepositLimitDisclaimer } from './kyc/kyc.service';
  import SelectWithdrawMethodModal from './withdraw/SelectWithdrawMethodModal.svelte';

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
        ? 'please, wait until we validate your identity.'
        : 'please validate your identity by completing the <a data-toast="verificationStepsCb" class="cursor-pointer">Account Verification</a> process (also known as KYC, or Know Your Client).';

      toast.warning(`To deposit cryptocurrency, ${prompt}`, {
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

<div
  class="contents"
  style="--sticky-content-bg: var(--wallet-balance-bg-color); --sticky-scroll-bg: var(--wallet-list-bg-color);"
>
  <StickyColumn reverse>
    <ThemeContext display id="wallet-list" slot="onscreen-content" class="px-4 py-12 md:pl-12">
      <WalletList {tab} />
    </ThemeContext>
    <div
      slot="sticky-content"
      class="h-full px-4 py-6 md:px-8 md:py-12"
      style="background: var(--wallet-balance-content-bg-color);"
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
        <div class="text-sm text-gray-500 mt-4">
          {getDailyDepositLimitDisclaimer($wallet.kycMaxLevel, variables.dailyDepositLimit)}
        </div>
      {/if}
    </div>
    <WalletButtons
      slot="sticky-cta"
      {canWithdraw}
      on:deposit={openDepositSelectModal}
      on:withdraw={() => openModal(SelectWithdrawMethodModal)}
    />
  </StickyColumn>
</div>
