<script lang="ts">
  import { mdiInformationVariant } from '@mdi/js';
  import { formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';

  export let balance: number = undefined;
  export let withdrawableBalance: number = undefined;
  export let availableBalance: number = undefined;
</script>

<div class="font-medium">
  <div class="text-xl md:text-2xl section-title font-normal">My Wallet</div>
  <div class="text-3xl md:text-5xl tracking-tight mt-3 md:mt-5" style="color: var(--wallet-balance-heading-color)">
    {#if balance === undefined}
      <div class="animate-pulse bg-gray-300 rounded h-10 w-52" />
    {:else}
      {formatCurrency(balance)}
    {/if}
  </div>
</div>

<div class="flex flex-col mt-6 md:mt-12 rounded-lg border border-primary">
  <div class="p-6 flex flex-col gap-6 font-medium">
    <div class="flex items-center justify-between">
      <span class="text-gray-500">Available</span>
      <div class="flex items-center gap-2">
        {#if Number.isNaN(availableBalance) || availableBalance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          {formatCurrency(availableBalance)}
        {/if}
        <div tabindex="0" use:tooltip={'The available funds exclude pending transactions and active bids.'}>
          <Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" />
        </div>
      </div>
    </div>

    <div class="separator" />

    <div class="flex items-center justify-between">
      <span class="text-gray-500">Withdrawable</span>
      <div class="flex items-center gap-2">
        {#if Number.isNaN(withdrawableBalance) || withdrawableBalance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          {formatCurrency(withdrawableBalance)}
        {/if}
        <div
          tabindex="0"
          use:tooltip={'The withdrawable amount excludes pending transactions and credit card payments less than 30 days old.'}
        >
          <Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>

  <div class="h-px w-full bg-primary" />

  <div class="p-6">
    <div class="text-gray-700 text-sm mb-4">Account verification status:</div>
    <slot name="kyc">yoooo</slot>
  </div>
</div>
