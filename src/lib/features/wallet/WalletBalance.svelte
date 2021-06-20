<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { user } from '$lib/user';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
</script>

<div>
  <div>
    <Tabs
      class="text-xl md:text-2xl"
      itemClass={'tracking-tighter pb-5 tab-header'}
      deactivateSignle={false}
    >
      <Tab title="Total Balance">
        <p class="text-5xl py-4 tracking-tight lds-big">
          {#if $user}
            ${$user.balance}
          {:else}
            <DualRingLoader />
          {/if}
        </p>
      </Tab>
    </Tabs>
  </div>
  <div class="mt-4">
    <p class="available">Available:</p>
    <p class="money lds-small">
      {#if $user}
        ${$user.availableBalance}
        <span class="text-sm explanation">(Excludes pending transactions)</span>
      {:else}
        <DualRingLoader />
      {/if}
    </p>
  </div>
  <div class="flex flex-col mt-10">
    <button class="mb-8 rounded-full py-4 text-white deposit text-xl tracking-tight "
      >Deposit</button
    >
    <button class="rounded-full withdrawal py-4 text-xl tracking-tight">Withdrawal</button>
  </div>
</div>

<style>
  div {
    --lds-color: #000;
  }

  .lds-big {
    --lds-size: 3rem;
  }

  .lds-small {
    --lds-size: 1.2rem;
  }

  .available {
    color: #9e9e9e;
  }
  .money {
    color: #000000;
  }
  .explanation {
    color: #9e9e9e;
  }
  .deposit {
    background: #000000;
  }
  .withdrawal {
    border: 2px solid #000000;
    color: #000000;
  }
</style>
