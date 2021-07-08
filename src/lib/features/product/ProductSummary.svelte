<script lang="ts">
  import type { Transaction, Product } from '$lib/sku-item/types';
  import type { ActionType } from './actions/types';
  import TabsVariantDark from '$ui/tabs/variants/TabsVariantDark.svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import { openModal } from '$ui/modals';
  import { user } from '$lib/user';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';

  import History from './ProductHistory.svelte';
  import CreateSaleModal from './CreateSaleModal.svelte';
  import CancelSaleModal from './CancelSaleModal.svelte';
  import RedeemModal from './Redeem/RedeemModal.svelte';
  import ProductActions from './actions/ProductActions.svelte';

  export let product: Product;
  export let transactions: Transaction[];

  $: canSell =
    $user &&
    $user._id === product.owner._id &&
    product.activeProductListings.length === 0 &&
    product.upcomingProductListings.length === 0;

  $: canCancelSale =
    $user &&
    $user._id === product.owner._id &&
    product.activeProductListings?.length !== 0 &&
    product.upcomingProductListings?.length === 0 &&
    product.activeProductListings[0].saleType !== 'auction';

  $: canRedeem =
    product.sku.redeemable &&
    $user &&
    $user._id === product?.owner._id &&
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
    <ProductActions {actions} on:action={onAction} />
  </div>
</div>
<TabsVariantDark>
  <Tabs class="text-lg" itemClass={'pb-4'}>
    <Tab id="1" title="Auctions" />
    <Tab id="2" title="History">
      <History {transactions} />
    </Tab>
    <PrivateAsset skuId={product.sku._id}>
      <Tab id="3" title="Owner Access">
        <div class="text-white"><PrivateAssetList /></div>
      </Tab>
    </PrivateAsset>
  </Tabs>
</TabsVariantDark>
