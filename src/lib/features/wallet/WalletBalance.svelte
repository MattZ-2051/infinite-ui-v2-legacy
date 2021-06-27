<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import { user } from '$lib/user';
  import { formatCurrency } from '$util/format';

  const dispatch = createEventDispatcher();
</script>

<div>
  <div>
    <Tabs class="text-xl md:text-2xl" itemClass={'tracking-tighter pb-5 tab-header'} deactivateSignle={false}>
      <Tab title="Total Balance">
        <p class="text-5xl py-4 tracking-tight">
          {#if $user}
            {formatCurrency($user.balance)}
          {:else}
            <div class="animate-pulse bg-gray-300 rounded h-10 w-52" />
          {/if}
        </p>
      </Tab>
    </Tabs>
  </div>
  <div class="mt-4">
    <p class="available">Available:</p>
    <p class="text-black">
      {#if $user}
        {formatCurrency($user.availableBalance)}
        <span class="text-sm explanation">(Excludes pending transactions)</span>
      {:else}
        <div class="animate-pulse bg-gray-300 rounded h-4 w-36" />
      {/if}
    </p>
  </div>
  <div class="flex flex-col mt-10">
    <button
      class="mb-8 rounded-full py-4 text-white bg-black text-xl tracking-tight "
      on:click={() => dispatch('deposit')}>Deposit</button
    >
    <button
      class="rounded-full text-black border-2 border-black py-4 text-xl tracking-tight"
      on:click={() => dispatch('withdraw')}>Withdrawal</button
    >
  </div>
</div>

<style>
  .available,
  .explanation {
    color: #9e9e9e;
  }
</style>
