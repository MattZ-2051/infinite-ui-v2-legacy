<script lang="ts">
  import type { Transaction, Product } from '$lib/sku-item/types';
  import TabsVariantDark from '$ui/tabs/variants/TabsVariantDark.svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import { user } from '$lib/user';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import History from './ProductHistory.svelte';
  import CreateSaleModal from './CreateSaleModal.svelte';

  export let product: Product;
  export let transactions: Transaction[];
  let showCreateSale = false;

  $: canSale =
    $user &&
    $user._id === product.owner._id &&
    product.activeProductListings.length === 0 &&
    product.upcomingProductListings.length === 0;
</script>

<div class="flex justify-evenly flex-col h-48 text-white">
  <div class="font-black italic">
    <a class="lg:hidden" href="/marketplace">...</a>
    <a class="hidden lg:inline" href="/marketplace">Marketplace</a>
    <span class="mx-2 text-gray-500">/</span>
    <a sveltekit:prefetch href={`/marketplace/${product.sku._id}`}>{product.sku.name}</a>
    <span class="mx-2 text-gray-500">/</span>
    <span class="text-gray-500">#{product.serialNumber}</span>
  </div>
  <div class="flex flex-wrap gap-7 w-full sm:gap-0">
    <span class="text-5xl">#{product.serialNumber}</span>
    <span class="mx-2 text-gray-500 text-5xl">/</span>
    <div class="flex flex-col">
      <span class="text-gray-500">Owner</span>
      <a sveltekit:prefetch href={`/collection/${product.sku.issuer.username}`}
        ><span class="font-black">{product.sku.issuerName}</span></a
      >
    </div>
    <span class="mx-2 text-gray-500 text-5xl">/</span>
    <div class="self-center flex flex-grow">
      {#if product.sku.redeemable}
        <IconRedeem class="text-black bg-white rounded-full mr-2 p-1" />
        <span>Redeemable</span>
      {:else}
        <IconRedeem size="1.2" color="#636363" class="mr-2 p-1" disabled tooltip="" />
        <span class="text-gray-600 self-center">Redeemed</span>
      {/if}
    </div>
    {#if canSale}
      <button
        on:click={() => (showCreateSale = true)}
        class="rounded-3xl bg-black text-gray-400 font-black px-2 justify-self-end"
        >Create Sale
      </button>
      <CreateSaleModal bind:show={showCreateSale} {product} />
    {/if}
  </div>
</div>
<TabsVariantDark>
  <Tabs class="text-lg" itemClass={'pb-4'}>
    <Tab id="1" title="Auctions" />
    <Tab id="2" title="History">
      <History {transactions} />
    </Tab>
  </Tabs>
</TabsVariantDark>
