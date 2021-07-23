<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { user } from '$lib/user';
  import { TabHeader } from '$ui/tabs';
  import { formatCurrency } from '$util/format';
  import { withdrawableBalance } from './wallet.store';

  const dispatch = createEventDispatcher();
</script>

<div>
  <div>
    <nav class="text-2xl">
      <ul class="flex gap-10">
        <TabHeader active={true} class="pb-5">Total Balance</TabHeader>
      </ul>
    </nav>
    <div class="text-5xl py-4 tracking-tight">
      {#if $user}
        {formatCurrency($user.balance)}
      {:else}
        <div class="animate-pulse bg-gray-300 rounded h-10 w-52" />
      {/if}
    </div>
  </div>
  <div class="grid grid-cols-1 gap-4 flex-col mt-6 font-medium">
    <div class="text-sm">
      <span class="text-gray-400 mr-1">Available:</span>
      {#if $user}
        {formatCurrency($user.availableBalance)}
      {:else}
        <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
      {/if}
      <br />
      <span class="text-xs text-gray-400">(Excludes pending transactions)</span>
    </div>
    <button class="rounded-full py-4 text-white bg-black text-xl tracking-tight" on:click={() => dispatch('deposit')}
      >Deposit</button
    >
    <div class="text-sm mt-4">
      <span class="text-gray-400 mr-1">Withdrawable:</span>
      {#if Number.isNaN($withdrawableBalance)}
        <div class="inline-block animate-pulse bg-gray-300 rounded h-4 w-24" />
      {:else}
        {formatCurrency($withdrawableBalance)}
      {/if}
      <br />
      <span class="text-xs text-gray-400">(Excludes pending transactions)</span>
    </div>
    <button
      class="rounded-full text-black border-2 border-black py-4 text-xl tracking-tight"
      disabled={!$withdrawableBalance || $withdrawableBalance === 0}
      on:click={() => dispatch('withdraw')}>Withdrawal</button
    >
  </div>
</div>

<style>
  nav {
    box-shadow: inset 0 -2px #ebebeb;
  }
</style>
