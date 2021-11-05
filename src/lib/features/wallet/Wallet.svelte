<script lang="ts">
  import { goto } from '$app/navigation';
  import { openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency } from '$util/format';
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
  import { kycIsPending, wallet, withdrawableBalance, loadMyTransactionsFx, loadWalletFx } from './wallet.store';
  import { launchKYCPersona } from './kyc/personaClient.service';
  import { getDailyDepositLimitDisclaimer } from './kyc/kyc.service';
  import SelectWithdrawMethodModal from './withdraw/SelectWithdrawMethodModal.svelte';

  export let tab: 'transactions' | 'bids';
  const kycLevelNeeded = `Your wallet balance is currently >= ${formatCurrency(
    10_000
  )} USD, therefore, you will not be able to make deposits, withdrawals, purchases, and sales until you complete KYC level 2.`;
  $: isKycCleared = $wallet?.kycMaxLevel >= 1;
  $: isKycPending = $wallet?.kycPending;

  function handleDepositSelectModal() {
    if ($wallet.kycRequired) toast.danger(kycLevelNeeded);
    else openModal(WalletDepositModal, { onDepositSelect });
  }

  function handleWithdrawSelectModal() {
    if ($withdrawableBalance < 0) toast.danger('Whoops! You cannot withdraw funds since your balance is 0!');
    else if ($wallet.kycRequired) toast.danger(kycLevelNeeded);
    else openModal(SelectWithdrawMethodModal);
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
        openModal(DepositHedera, {
          onCloseWithResults: () => {
            loadMyTransactionsFx({});
            loadWalletFx();
          },
        });
        break;
    }
  }
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
        balance={Number.parseFloat($wallet?.balanceInfo[0]?.circleBalance)}
        availableBalance={Number.parseFloat($wallet?.balanceInfo[0]?.totalBalance)}
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

      <div class="text-sm text-gray-500 mt-4">
        {$wallet && getDailyDepositLimitDisclaimer($wallet.kycMaxLevel, variables.dailyDepositLimit)}
      </div>
    </div>
    <WalletButtons slot="sticky-cta" on:deposit={handleDepositSelectModal} on:withdraw={handleWithdrawSelectModal} />
  </StickyColumn>
</div>
