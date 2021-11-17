<script lang="ts">
  import { mdiInformationVariant } from '@mdi/js';
  import { formatCurrency, formatEthCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';
  import Image from '$ui/image/Image.svelte';
  import { depositOptions } from './deposit/deposit-options';

  export let ethBalance: number = undefined;
  export let usdBalance: number = undefined;
  export let availableEthBalance: number = undefined;
  export let availableUsdBalance: number = undefined;
  export let currencyType: 'ETH' | 'USD';

  const EthData = depositOptions.find((option) => option.id === 'eth');
  const UsdData = depositOptions.find((option) => option.id === 'usDollar');
  const isEthCurrency = currencyType === 'ETH';
  const helpText = isEthCurrency
    ? 'Your ETH balance can only be used for purchasing NFTs priced in ETH.'
    : 'Your USD balance can only be used for purchasing NFTs priced in USD.';
  const balance = isEthCurrency ? formatEthCurrency(ethBalance, 'symbol') : formatCurrency(usdBalance);
  const availableBalance = isEthCurrency
    ? formatEthCurrency(availableEthBalance, 'symbol')
    : formatCurrency(availableUsdBalance);
</script>

<div class="flex flex-col mt-6 md:mt-12 rounded-lg border">
  <div class="p-6 flex flex-col gap-6 font-medium">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Image src={isEthCurrency ? EthData.image : UsdData.image} width={40} />
        <div class="flex flex-col justify-center pl-4">
          <span>{isEthCurrency ? EthData.title : UsdData.title}</span>
          <span class="text-gray-500 text-sm">{isEthCurrency ? 'Ethereum' : 'USD Coin'}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        {#if Number.isNaN(balance) || balance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          <span class="text-2xl md:text-4xl tracking-tight" style="color: var(--wallet-balance-heading-color)">
            {balance}
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
          {availableBalance}
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
