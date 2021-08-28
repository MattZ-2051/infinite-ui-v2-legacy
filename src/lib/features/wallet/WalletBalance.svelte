<script lang="ts">
  import { mdiInformationVariant } from '@mdi/js';
  import { formatCurrency } from '$util/format';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';

  export let balance: number = undefined;
  export let availableBalance: number = undefined;
  export let withdrawableBalance: number = undefined;
</script>

<div class="font-medium">
  <div class="text-2xl">My Wallet</div>
  <div class="text-5xl tracking-tight mt-5">
    {#if balance === undefined}
      <div class="animate-pulse bg-gray-300 rounded h-10 w-52" />
    {:else}
      {formatCurrency(balance)}
    {/if}
  </div>
</div>

<div class="flex flex-col mt-12 rounded-lg border border-primary">
  <div class="p-6 flex flex-col gap-6 font-medium">
    <div class="flex items-center justify-between">
      <span class="text-white-opacity-50">Available</span>
      <div class="flex items-center gap-2">
        {#if availableBalance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          {formatCurrency(availableBalance)}
          <button type="button" use:tooltip={'Excludes pending transactions and active bids'}
            ><Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" /></button
          >
        {/if}
      </div>
    </div>

    <div class="h-px w-full" style="background: var(--separator-bg-color);" />

    <div class="flex items-center justify-between">
      <span class="text-white-opacity-50">Withdrawable</span>
      <div class="flex items-center gap-2">
        {#if Number.isNaN(withdrawableBalance) || withdrawableBalance === undefined}
          <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
        {:else}
          {formatCurrency(withdrawableBalance)}
          <button
            type="button"
            use:tooltip={'Excludes pending transactions and credit card payments less than 30 days old'}
            ><Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" /></button
          >
        {/if}
      </div>
    </div>
  </div>

  <div class="h-px w-full bg-primary" />

  <div class="p-6">
    <div class="text-white-opacity-50 text-sm mb-4">Account verification status:</div>
    <slot name="kyc">yoooo</slot>
  </div>
</div>
