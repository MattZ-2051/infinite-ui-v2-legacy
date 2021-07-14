<script lang="ts">
  import type { Listing, Product } from '$lib/sku-item/types';
  import type { ActionType } from './actions/types';
  import { TabHeader, TabsVariantDark } from '$ui/tabs';
  import { openModal } from '$ui/modals';
  import { userId } from '$lib/user';
  import { goto } from '$app/navigation';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { page } from '$app/stores';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import { formatCurrency } from '$util/format';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import ProductHistory from './ProductHistory.svelte';
  import ProductAuction from './auction/ProductAuction.svelte';
  import CreateSaleModal from './CreateSaleModal.svelte';
  import CancelSaleModal from './CancelSaleModal.svelte';
  import RedeemModal from './Redeem/RedeemModal.svelte';
  import AuctionModal from './auction/AuctionModal.svelte';
  import CancelAuctionModal from './auction/CancelAuctionModal.svelte';
  import ProductActions from './actions/ProductActions.svelte';
  import { hasAuction, isActiveAuction } from './product.service';

  export let product: Product;

  $: userOwnsTheProduct = $userId && $userId === product.owner._id;

  $: productIsNotListed = product.activeProductListings.length === 0 && product.upcomingProductListings.length === 0;

  $: productHasOnlyActiveListing = (listingPredicate: (listing: Listing) => boolean = () => true) =>
    product.activeProductListings?.length !== 0 &&
    product.upcomingProductListings?.length === 0 &&
    (!listingPredicate || listingPredicate(product.activeProductListings[0]));

  $: productHasOnlyUpcomingListing = (listingPredicate: (listing: Listing) => boolean = () => true) =>
    product.activeProductListings?.length === 0 &&
    product.upcomingProductListings?.length !== 0 &&
    (!listingPredicate || listingPredicate(product.upcomingProductListings[0]));

  $: canSell = userOwnsTheProduct && productIsNotListed;

  $: canCancelSale = userOwnsTheProduct && productHasOnlyActiveListing((l) => l.saleType !== 'auction');

  $: canCancelAuction = userOwnsTheProduct && productHasOnlyUpcomingListing((l) => l.saleType === 'auction');

  $: canAuction = userOwnsTheProduct && productIsNotListed;

  $: canRedeem =
    product.sku.redeemable && userOwnsTheProduct && product.redeemedStatus !== 'redeemed' && productIsNotListed;

  $: showAuction = hasAuction(product);

  $: showActiveSale =
    product.activeProductListings?.length !== 0 &&
    product.upcomingProductListings?.length === 0 &&
    product.activeProductListings[0].saleType !== 'auction';

  let actions: ActionType[];
  $: actions = [
    canRedeem ? 'redeem' : undefined,
    canAuction ? 'auction' : undefined,
    canCancelAuction ? 'cancel-auction' : undefined,
    canSell ? 'create-sale' : undefined,
    canCancelSale ? 'cancel-sale' : undefined,
  ];

  function onAction({ detail: type }: { detail: ActionType }) {
    switch (type) {
      case 'redeem': {
        openModal(RedeemModal, { product });
        break;
      }
      case 'auction': {
        openModal(AuctionModal, { product });
        break;
      }
      case 'cancel-auction': {
        openModal(CancelAuctionModal, { listingId: product?.upcomingProductListings[0]?._id });
        break;
      }
      case 'create-sale': {
        openModal(CreateSaleModal, { product });
        break;
      }
      case 'cancel-sale': {
        openModal(CancelSaleModal, {
          listingId: product?.activeProductListings[0]?._id,
          productId: product._id,
        });
        break;
      }
    }
  }

  function redirect(_tab: 'auction' | 'history' | 'owner') {
    goto(`/product/${product._id}?tab=${_tab}`);
  }

  // TODO(tasos): move to route to avoid unnecessary call for transactions
  $: tab = $page.query.get(`tab`) || (showAuction ? 'auction' : 'history');
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
      <a sveltekit:prefetch href={`/collection/${product.owner.username}`}
        ><span class="font-black">{product.owner.username}</span></a
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
    <div class="flex items-center">
      {#if showActiveSale}
        <div class="flex flex-col items-start mr-4 pb-3.5">
          <span class="text-gray-400 text-xs">Active Sale</span>
          <span class="text-xl font-semibold">{formatCurrency(product.activeProductListings[0].price)}</span>
        </div>
      {/if}
      <ProductActions {actions} on:action={onAction} />
    </div>
  </div>
</div>

<PrivateAsset skuId={product.sku._id} let:total={totalPrivateAssets}>
  <nav class="text-xl flex justify-between gap-4">
    <ul class="flex gap-10">
      <TabsVariantDark>
        {#if showAuction}
          <TabHeader on:click={() => redirect('auction')} active={tab === 'auction'} class="pb-5">Auction</TabHeader>
        {/if}
        <TabHeader on:click={() => redirect('history')} active={tab === 'history'} class="pb-5">History</TabHeader>
        {#if totalPrivateAssets > 0}
          <TabHeader on:click={() => redirect('owner')} active={tab === 'owner'} class="pb-5">Owner Access</TabHeader>
        {/if}
      </TabsVariantDark>
    </ul>
    {#if tab === 'auction' && isActiveAuction(product)}
      <div class="text-gray-500 text-sm md:text-base">
        <span>Expires in</span>
        <span class="text-white"><TimeDifference date={new Date(product.activeProductListings[0].endDate)} /></span>
        <span class="italic text-sm font-black ">
          (<DateFormat value={product.activeProductListings[0].endDate} />)
        </span>
      </div>
    {/if}
  </nav>

  {#if tab === 'auction'}
    <ProductAuction {product} />
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
