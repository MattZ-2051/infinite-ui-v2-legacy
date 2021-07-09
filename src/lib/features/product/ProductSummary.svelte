<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import type { ActionType } from './actions/types';
  import { TabHeader, TabsVariantDark } from '$ui/tabs';
  import { openModal } from '$ui/modals';
  import { userId } from '$lib/user';
  import { goto } from '$app/navigation';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { page } from '$app/stores';
  import { totalAuctions } from '$lib/features/product/product.store';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';

  import ProductHistory from './ProductHistory.svelte';
  import ProductAuctions from './ProductAuctions.svelte';
  import CreateSaleModal from './CreateSaleModal.svelte';
  import CancelSaleModal from './CancelSaleModal.svelte';
  import RedeemModal from './Redeem/RedeemModal.svelte';
  import ProductActions from './actions/ProductActions.svelte';

  export let product: Product;

  $: canSell =
    $userId &&
    $userId === product.owner._id &&
    product.activeProductListings.length === 0 &&
    product.upcomingProductListings.length === 0;

  $: canCancelSale =
    $userId &&
    $userId === product.owner._id &&
    product.activeProductListings?.length !== 0 &&
    product.upcomingProductListings?.length === 0 &&
    product.activeProductListings[0].saleType !== 'auction';

  $: canRedeem =
    product.sku.redeemable &&
    $userId &&
    $userId === product?.owner._id &&
    product.redeemedStatus !== 'redeemed' &&
    product.activeProductListings.length === 0 &&
    product.upcomingProductListings.length === 0;

  let actions: ActionType[];
  $: actions = [
    canRedeem ? 'redeem' : undefined,
    canSell ? 'create-sale' : undefined,
    canCancelSale ? 'cancel-sale' : undefined,
  ];

  function onAction({ detail: type }: { detail: ActionType }) {
    switch (type) {
      case 'redeem': {
        openModal(RedeemModal, { product });
        break;
      }
      case 'create-sale': {
        openModal(CreateSaleModal, { product });
        break;
      }
      case 'cancel-sale': {
        openModal(CancelSaleModal, { listingId: product?.activeProductListings[0]?._id, productId: product._id });
        break;
      }
    }
  }

  function redirect(_tab: 'auctions' | 'history' | 'owner') {
    goto(`/product/${product._id}?tab=${_tab}`);
  }

  // TODO(tasos): move to route to avoid unnecessary call for transactions
  $: tab = $page.query.get(`tab`) || ($totalAuctions > 0 ? 'auctions' : 'history');
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
      {#if product.sku.redeemable && product.redeemedStatus === 'NA'}
        <IconRedeem class="text-black bg-white rounded-full mr-2 p-1" />
        <span>Redeemable</span>
      {:else}
        <IconRedeem size="1.2" color="#636363" class="mr-2 p-1" disabled tooltip="" />
        <span class="text-gray-600 self-center">Redeemed</span>
      {/if}
    </div>
    <ProductActions {actions} on:action={onAction} />
  </div>
</div>

<PrivateAsset skuId={product.sku._id} let:total={totalPrivateAssets}>
  <nav class="text-xl ">
    <ul class="flex gap-10">
      <TabsVariantDark>
        {#if $totalAuctions > 0}
          <TabHeader on:click={() => redirect('auctions')} active={tab === 'auctions'} class="pb-5">Auctions</TabHeader>
        {/if}
        <TabHeader on:click={() => redirect('history')} active={tab === 'history'} class="pb-5">History</TabHeader>
        {#if totalPrivateAssets > 0}
          <TabHeader on:click={() => redirect('owner')} active={tab === 'owner'} class="pb-5">Owner Access</TabHeader>
        {/if}
      </TabsVariantDark>
    </ul>
  </nav>

  {#if tab === 'auctions'}
    <ProductAuctions />
  {/if}

  {#if tab === 'history'}
    <ProductHistory />
  {/if}

  {#if tab === 'owner'}
    {#if totalPrivateAssets > 0}
      <div class="text-white">
        <PrivateAssetList />
      </div>
    {/if}
  {/if}
</PrivateAsset>

<style>
  nav {
    box-shadow: inset 0 -2px #232323;
  }
</style>
