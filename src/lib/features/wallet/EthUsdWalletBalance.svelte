<script lang="ts">
  import { mdiInformationVariant } from '@mdi/js';
  import type { CurrencyType } from './types';
  import { formatCurrency, formatEthCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';
  import Image from '$ui/image/Image.svelte';
  import { depositOptions } from './deposit/deposit-options';

  export let ethBalance: string = undefined;
  export let usdBalance: string = undefined;
  export let availableEthBalance: string = undefined;
  export let availableUsdBalance: string = undefined;
  export let currencyType: CurrencyType;

  const EthData = depositOptions.find((option) => option.id === 'eth');
  const UsdData = depositOptions.find((option) => option.id === 'usDollar');

  $: isEthCurrency = currencyType === 'ETH';

  $: balance = isEthCurrency ? ethBalance : usdBalance;
  $: availableBalance = isEthCurrency ? availableEthBalance : availableUsdBalance;

  const helpText = isEthCurrency
    ? 'Your ETH balance can only be used for purchasing NFTs priced in ETH.'
    : 'Your USD balance can only be used for purchasing NFTs priced in USD.';
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
            <span class="text-gray-500 text-sm">{isEthCurrency ? 'Ethereum' : 'USD Coin'}</span>
          {/if}
        </div>
      </div>
      <div class="flex items-center gap-2">
        {#if Number.isNaN(balance) || balance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          <span class="text-2xl md:text-4xl tracking-tight" style="color: var(--wallet-balance-heading-color)">
            {isEthCurrency ? formatEthCurrency(balance, 'symbol') : formatCurrency(balance)}
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
          {isEthCurrency ? formatEthCurrency(availableBalance, 'symbol') : formatCurrency(availableBalance)}
        {/if}
        <div tabindex="0" use:tooltip={'The available funds exclude pending transactions and active bids.'}>
          <Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
  <div class="separator bg-gray-100" />

  <div class="p-6 text-white-opacity-50" style="background: var(--wallet-balance-content-bg-color-secondary)">
    <span class="text-sm text-gray-500 ">
      {helpText} <a href="/help" class="underline">Learn more.</a>
    </span>
  </div>
</div>
