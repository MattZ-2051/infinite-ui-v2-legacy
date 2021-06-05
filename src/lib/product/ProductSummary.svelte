<script lang="ts">
  import History from '$lib/product/History.svelte';
  import TabsVariantDark from '$ui/tabs/variants/TabsVariantDark.svelte';
  import { Tabs, Tab } from '$ui/tabs';
</script>

<div class="flex justify-evenly flex-col h-48 text-white">
  <div class="font-black italic">
    <a class="lg:hidden" href="/marketplace">...</a>
    <a class="hidden lg:inline" href="/marketplace">Marketplace</a>
    <span class="mx-2 text-gray-500">/</span>
    <a href="/marketplace">TheOriginal - Retro</a>
    <span class="mx-2 text-gray-500">/</span>
    <span class="text-gray-500">#XY271</span>
  </div>
  <div class="flex flex-wrap gap-7 sm:gap-0">
    <span class="text-5xl">#2</span>
    <span class="mx-2 text-gray-500 text-5xl">/</span>
    <div class="flex flex-col">
      <span class="text-gray-500">Owner</span>
      <span class="font-black">@alessandroveronezi</span>
    </div>
    <span class="mx-2 text-gray-500 text-5xl">/</span>
    <div class="self-center flex">
      {#if false}
        <div class="bg-white rounded-2xl mr-2 p-1">
          <img src="/redeemable.svg" alt="redeemed" />
        </div>
        <span>Redeemable</span>
      {:else}
        <div class="redeemed relative mr-2 p-1">
          <img src="/redeemed.svg" alt="redeemed" />
        </div>
        <span class="text-gray-600 self-center">Redeemed</span>
      {/if}
    </div>
  </div>
</div>
<TabsVariantDark>
  <Tabs class="text-lg" itemClass={'pb-4'}>
    <Tab id="1" title="Auctions" />
    <Tab id="2" title="History"><History /></Tab>
  </Tabs>
</TabsVariantDark>

<style>
  .redeemed::after {
    content: '';
    position: absolute;
    border-bottom: 2px solid white;
    width: 22px;
    top: 13px;
    left: 3px;
    transform: rotate(45deg);
  }
  .redeemed::before {
    content: '';
    position: absolute;
    border-bottom: 8px solid;
    width: 24px;
    top: 12px;
    left: 4px;
    transform: rotate(45deg);
    @apply border-gray-900;
  }
</style>
