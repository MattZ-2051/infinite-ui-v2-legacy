<script lang="ts">
  import { goto } from '$app/navigation';
  import { closeAllModals, openModal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import CryptoCurrency from '$lib/payment/crypto/CryptoCurrency.svelte';
  import DepositHedera from '$lib/payment/hedera/DepositHedera.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import routes from '$project/routes';
  import { variables } from '$lib/variables';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { ENABLE_ETH_CURRENCY, KYC_INFO, ENABLE_SINGLE_CURRENCY_WALLET } from '$project/variables';
  import WalletBalance from './WalletBalance.svelte';
  import WalletDepositModal from './deposit/WalletDepositModal.svelte';
  import CurrencySelectModal from './deposit/CurrencySelectModal.svelte';
  import WithdrawCurrencySelectModal from './withdraw/CurrencySelectModal.svelte';
  import EthWithdrawModal from './withdraw/EthWithdrawModal.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';
  import WalletButtons from './WalletButtons.svelte';
  import {
    kycIsPending,
    wallet,
    withdrawableBalanceUsd,
    withdrawableBalanceEth,
    loadMyTransactionsFx,
    loadWalletFx,
    kycFailure,
    setKycFailure,
  } from './wallet.store';
  import { launchKYCPersona } from './kyc/personaClient.service';
  import { getKYCLevelDepositDisclaimer } from './kyc/kyc.service';
  import SelectWithdrawMethodModal from './withdraw/SelectWithdrawMethodModal.svelte';
  import EthUsdWalletBalance from './EthUsdWalletBalance.svelte';

  const LOW_KYC_LEVEL = import.meta.env.VITE_LOW_KYC_LVL_DEPOSIT_LIMIT_USD;
  const formattedLowKYC = `${formatCurrencyWithOptionalFractionDigits(LOW_KYC_LEVEL)} USD`;

  export let tab: 'transactions' | 'bids';
  const kycLevelNeeded =
    (ENABLE_ETH_CURRENCY
      ? `If your ETH or USDC wallet balance exceed ${formattedLowKYC} (or the ETH equivalent),`
      : `If your USDC wallet balance exceed ${formattedLowKYC},`) +
    ` you will need to complete KYC level 2; you will not be able to make deposits, withdrawals, or purchases until you do so.`;
  $: isKycCleared = $wallet?.kycMaxLevel >= 1;
  $: isKycPending = $wallet?.kycPending;

  function handleDepositSelectModal() {
    if ($wallet.kycRequired) {
      toast.danger(kycLevelNeeded, { toastId: 'KYC-LVL-NEEDED' });
    } else {
      if (ENABLE_ETH_CURRENCY) {
        openModal(CurrencySelectModal, { onCurrencySelect });
      } else {
        openModal(WalletDepositModal, { onDepositSelect });
      }
    }
  }

  function handleWithdrawSelectModal() {
    if ($withdrawableBalanceUsd <= 0 && $withdrawableBalanceEth <= 0)
      toast.danger('Whoops! You cannot withdraw funds since your balance is 0!', { toastId: 'NO-FUNDS' });
    else if ($wallet.kycRequired) toast.danger(kycLevelNeeded, { toastId: 'KYC-LVL-NEEDED' });
    else {
      if (ENABLE_ETH_CURRENCY) {
        openModal(WithdrawCurrencySelectModal, { onCurrencySelect: onWithdrawCurrencySelect });
      } else {
        openModal(SelectWithdrawMethodModal);
      }
    }
  }

  function openUpgradeKYCLevel() {
    launchKYCPersona(
      $wallet.kycMaxLevel === 1 ? variables.persona.templateIdLevel2 : variables.persona.templateIdLevel1,
      ({ inquiryId }) => {
        kycIsPending(inquiryId);
      },
      $kycFailure.inquiryFailed,
      () => setKycFailure(true)
    );
  }

  function onCurrencySelect(id: 'eth-native' | 'usd') {
    if (id === 'usd') {
      openModal(WalletDepositModal, { onDepositSelect });
    } else {
      onDepositSelect(id);
    }
  }

  async function onDepositSelect(id: 'circle' | 'usdc' | 'btc' | 'eth' | 'eth-native' | 'hbar' | 'moonpay') {
    // Credit cards do not need KYC
    if (id === 'circle') {
      goto(routes.deposit);
      return;
    }
    if (id === 'moonpay') {
      closeAllModals();
      goto(routes.depositMoonPay);
      return;
    }

    // Cryptocurrencies...
    if (!isKycCleared) {
      const prompt = isKycPending
        ? 'Please, wait until we validate your identity.'
        : `In order to make a cryptocurrency deposit, you need to complete the <a data-toast="verificationStepsCb" class="cursor-pointer font-bold">account verification</a> process (KYC level 1).<br>
          ${kycLevelNeeded}`;

      toast.warning(`${prompt}`, {
        onClick: { verificationStepsCb: openUpgradeKYCLevel },
        classes: 'text-center text-xs lg:text-base',
      });
      return;
    }

    switch (id) {
      case 'usdc':
      case 'btc':
      case 'eth':
      case 'eth-native':
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

  function onWithdrawCurrencySelect(id: 'eth-native' | 'usd') {
    if (id === 'usd') {
      openModal(SelectWithdrawMethodModal);
    } else {
      openModal(EthWithdrawModal);
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
      class="px-4 py-6 md:px-8 md:py-12"
      style="background: var(--wallet-balance-content-bg-color);
            border-radius: var(--wallet-balance-content-border-radius);
            margin: var(--wallet-balance-content-margin);
            max-width: var(--wallet-balance-content-max-width);"
    >
      {#if ENABLE_ETH_CURRENCY && !ENABLE_SINGLE_CURRENCY_WALLET}
        <div class="font-medium">
          <div class="text-xl md:text-2xl">My Balance</div>
        </div>
        <EthUsdWalletBalance
          ethBalance={$wallet?.balance.find((balanceInfo) => balanceInfo.currency === 'ETH').amount}
          availableEthBalance={$wallet?.balanceInfo.find((balanceInfo) => balanceInfo.currency === 'ETH').totalBalance}
          currencyType={$wallet?.balance.find((balanceInfo) => balanceInfo.currency === 'ETH').currency}
          helpText={'Your ETH balance can only be used for purchasing NFTs priced in ETH.'}
          withdrawableBalance={$wallet?.balanceInfo.find((withdrawalInfo) => withdrawalInfo.currency === 'ETH')
            .withdrawableBalance}
          showWithdrawableBalance={true}
        />
        <EthUsdWalletBalance
          usdBalance={$wallet?.balance.find((balanceInfo) => balanceInfo.currency === 'USD').amount}
          availableUsdBalance={$wallet?.balanceInfo.find((balanceInfo) => balanceInfo.currency === 'USD').totalBalance}
          currencyType={$wallet?.balance.find((balanceInfo) => balanceInfo.currency === 'USD').currency}
          helpText={'Your USD balance can only be used for purchasing NFTs priced in USD.'}
          withdrawableBalance={$wallet?.balanceInfo.find((withdrawalInfo) => withdrawalInfo.currency === 'USD')
            .withdrawableBalance}
          showWithdrawableBalance={true}
        />
        <div class="h-px bg-gray-100 w-full mt-6 md:mt-12" />

        <div class="flex flex-col mt-6 md:mt-12 rounded-lg border">
          <div class="p-6 flex flex-col gap-6 font-medium">
            <div class="text-gray-700 text-md mb-4">Account verification status:</div>
            {#if $wallet}
              <AccountVerification
                on:upgrade={openUpgradeKYCLevel}
                level={$wallet.kycMaxLevel}
                pending={$wallet.kycPending}
              />
            {/if}
          </div>

          <div class="p-6 text-white-opacity-50" style="background: var(--wallet-balance-content-bg-color-secondary)">
            <span class="text-sm text-gray-500">
              {#if $wallet}
                {@html getKYCLevelDepositDisclaimer($wallet.kycMaxLevel)}
                {#if $wallet.kycMaxLevel < 2}<a
                    href={KYC_INFO}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline">Learn more</a
                  >.{/if}
              {/if}
            </span>
          </div>
        </div>
        <ThemeContext id="wallet-buttons">
          <div class="mt-8">
            <WalletButtons on:deposit={handleDepositSelectModal} on:withdraw={handleWithdrawSelectModal} />
          </div>
        </ThemeContext>
      {:else}
        <ThemeContext id="wallet-balance">
          <WalletBalance
            balance={Number.parseFloat($wallet?.balanceInfo[0]?.circleBalance)}
            availableBalance={Number.parseFloat($wallet?.balanceInfo[0]?.totalBalance)}
            withdrawableBalance={$withdrawableBalanceUsd}
          >
            <svelte:fragment slot="kyc">
              {#if $wallet}
                <AccountVerification
                  on:upgrade={openUpgradeKYCLevel}
                  level={$wallet.kycMaxLevel}
                  pending={$wallet.kycPending}
                />
              {/if}
              <div class="mt-6">
                <span class="text-sm text-gray-500">
                  {#if $wallet}
                    {@html getKYCLevelDepositDisclaimer($wallet.kycMaxLevel)}
                    {#if $wallet.kycMaxLevel < 2}<a
                        href={KYC_INFO}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline">Learn more</a
                      >.{/if}
                  {/if}
                </span>
              </div>
            </svelte:fragment>
          </WalletBalance>
        </ThemeContext>
        <ThemeContext id="wallet-buttons">
          <div class="mt-8">
            <WalletButtons on:deposit={handleDepositSelectModal} on:withdraw={handleWithdrawSelectModal} />
          </div>
        </ThemeContext>
      {/if}
    </div>
  </StickyColumn>
</div>
