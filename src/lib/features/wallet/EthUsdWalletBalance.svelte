<script lang="ts">
  import { mdiInformationVariant } from '@mdi/js';
  import type { CurrencyType } from './types';
  import { formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';
  import Image from '$ui/image/Image.svelte';
  import { depositOptions } from './deposit/deposit-options';

  export let ethBalance: string = undefined;
  export let usdBalance: string = undefined;
  export let availableEthBalance: string = undefined;
  export let availableUsdBalance: string = undefined;
  export let currencyType: CurrencyType;
  export let helpText: string;
  export let withdrawableBalance: string = undefined;
  export let showWithdrawableBalance: boolean;

  const EthData = depositOptions.find((option) => option.id === 'eth');
  const UsdData = depositOptions.find((option) => option.id === 'usdc');

  $: isEthCurrency = currencyType === 'ETH';

  $: balance = isEthCurrency ? ethBalance : usdBalance;
  $: availableBalance = isEthCurrency ? availableEthBalance : availableUsdBalance;
</script>

<div class="flex flex-col mt-6 md:mt-12 rounded-lg border">
  <div class="p-6 flex flex-col gap-6 font-medium">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        {#if currencyType}
          <Image src={isEthCurrency ? EthData.image : UsdData.image} width={40} />
        {:else}
          <div class="inline-block animate-pulse bg-gray-300 rounded-full h-10 w-10" />
        {/if}
        <div class="flex flex-col justify-center pl-4">
          {#if !currencyType}
            <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-12" />
            <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-6 mt-2" />
          {:else}
            <span>{isEthCurrency ? EthData.title : UsdData.title}</span>
            <span class="text-gray-500 text-sm">{isEthCurrency ? 'Ether' : 'USD Coin'}</span>
          {/if}
        </div>
      </div>
      <div class="flex items-center gap-2">
        {#if Number.isNaN(balance) || balance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          <span class="text-2xl md:text-4xl tracking-tight" style="color: var(--wallet-balance-heading-color)">
            {formatCurrency(balance, { currency: currencyType })}
          </span>
        {/if}
      </div>
    </div>
    <div class="separator" />

    <div class="flex items-center justify-between">
      <span class="text-gray-500">Available:</span>
      <div class="flex items-center gap-2">
        {#if Number.isNaN(availableBalance) || availableBalance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          {formatCurrency(availableBalance, { currency: currencyType })}
        {/if}
        <div tabindex="0" use:tooltip={'The available funds exclude pending transactions and active bids.'}>
          <Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" />
        </div>
      </div>
    </div>

    {#if showWithdrawableBalance}
      <div class="flex items-center justify-between">
        <span class="text-gray-500">Withdrawable:</span>
        <div class="flex items-center gap-2">
          {#if Number.isNaN(withdrawableBalance) || withdrawableBalance === undefined}
            <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
          {:else}
            {formatCurrency(withdrawableBalance, { currency: currencyType })}
          {/if}
          <div
            tabindex="0"
            use:tooltip={'The withdrawable amount excludes pending transactions (e.g., active bids) and credit card deposits less than 30 days old.'}
          >
            <Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" />
          </div>
        </div>
      </div>
    {/if}
  </div>
  <div class="separator bg-gray-100" />

  <div class="p-6 text-white-opacity-50" style="background: var(--wallet-balance-content-bg-color-secondary)">
    <span class="text-sm text-gray-500 ">
      {helpText}
      <a href="https://info.seva.love/seva-love-resources-faq#my-wallet" target="_blank" rel="noopener noreferrer" class="underline"
        >Learn more.</a
      >
    </span>
  </div>
</div>
