<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import type { ActionType } from './actions/types';
  import { Tabs, Tab } from '$ui/tabs';
  import { openModal } from '$ui/modals';
  import { userId } from '$lib/user';
  import { goto } from '$app/navigation';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { page } from '$app/stores';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import DateFormat from '$ui/date/DateFormat.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import routes from '$lib/routes';
  import ProductHistory from './ProductHistory.svelte';
  import ProductStatusButton from './ProductStatusButton.svelte';
  import ProductAuction from './auction/ProductAuction.svelte';
  import CreateSaleModal from './CreateSaleModal.svelte';
  import CancelSaleModal from './CancelSaleModal.svelte';
  import RedeemModal from './Redeem/RedeemModal.svelte';
  import AuctionModal from './auction/AuctionModal.svelte';
  import CancelAuctionModal from './auction/CancelAuctionModal.svelte';
  import ProductTransferModal from './transfer/ProductTransferModal.svelte';
  import ProductActions from './actions/ProductActions.svelte';
  import {
    hasAuction,
    hasActiveAuction,
    isOwner,
    canCreateSale,
    canCancelSale,
    canStartAuction,
    canCancelAuction,
    canRedeem,
    canTransfer,
  } from './product.service';
  import { totalBids, auctionCancelled } from './product.store';

  export let product: Product;

  $: userOwnsProduct = isOwner(product, $userId);

  $: hasCreateSellAction = canCreateSale(product, $userId);
  $: hasCancelSaleAction = canCancelSale(product, $userId);
  $: hasStartAuctionAction = canStartAuction(product, $userId);
  $: hasCancelAuctionAction = canCancelAuction(product, $userId, $totalBids);
  $: hasRedeemAction = canRedeem(product, $userId);
  $: hasTransferAction = canTransfer(product, $userId);

  $: showAuction = hasAuction(product);

  let actions: ActionType[];
  $: actions = [
    hasRedeemAction ? 'redeem' : undefined,
    hasStartAuctionAction ? 'auction' : undefined,
    hasCancelAuctionAction ? 'cancel-auction' : undefined,
    hasCreateSellAction ? 'create-sale' : undefined,
    hasCancelSaleAction ? 'cancel-sale' : undefined,
    hasTransferAction ? 'transfer' : undefined,
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
        const listingId = (product.upcomingProductListings[0] || product.activeProductListings[0])._id;
        openModal(CancelAuctionModal, { listingId });
        break;
      }
      case 'create-sale': {
        openModal(CreateSaleModal, { product });
        break;
      }
      case 'cancel-sale': {
        openModal(CancelSaleModal, {
          listingId: product?.activeProductListings[0]?._id,
        });
        break;
      }
      case 'transfer': {
        openModal(ProductTransferModal, { product });
        break;
      }
    }
  }

  function redirect({ detail }: CustomEvent<'auction' | 'history' | 'owner'>) {
    goto(`${routes.product(product._id)}?tab=${detail}`, { keepfocus: true });
  }

  // TODO(tasos): move to route to avoid unnecessary call for transactions
  $: tab = $page.query.get(`tab`) || (showAuction ? 'auction' : 'history');

  function getItems(totalPrivateAssets: number) {
    let items = [
      {
        id: 'auction',
        title: 'Auction',
      },
      {
        id: 'history',
        title: 'History',
      },
    ];

    if (totalPrivateAssets > 0) {
      items.push({ id: 'owner', title: 'Owner Access' });
    }

    return items;
  }
</script>

<div class="flex justify-evenly flex-col h-48 text-white">
  <div class="font-black italic">
    <a class="lg:hidden" href={routes.marketplace}>...</a>
    <a class="hidden lg:inline" href={routes.marketplace}>Marketplace</a>
    <span class="mx-2 text-gray-500">/</span>
    <a sveltekit:prefetch href={routes.sku(product.sku._id)}>{product.sku.name}</a>
    <span class="mx-2 text-gray-500">/</span>
    <span class="text-gray-500">#{product.serialNumber}</span>
  </div>
  <div class="flex flex-wrap w-full">
    <span class="text-5xl">#{product.serialNumber}</span>
    <span class="mx-2 text-gray-500 text-5xl">/</span>
    <div class="flex flex-col">
      <span class="text-gray-500">Owner</span>
      <UserLink username={product.owner.username} class="font-black">{product.owner.username}</UserLink>
    </div>
    <span class="mx-2 text-gray-500 text-5xl">/</span>
    <div class="self-center flex flex-grow">
      {#if product.sku.redeemable && product.redeemedStatus === 'NA'}
        <IconRedeem class="text-black bg-white rounded-full mr-2 p-1" />
        <span>Redeemable</span>
      {:else}
        <IconRedeem color="#636363" class="mr-2 p-1" disabled hasTooltip={false} />
        <span class="text-gray-600 self-center">Redeemed</span>
      {/if}
    </div>
    <div class="flex gap-3 items-center">
      <ProductStatusButton {product} />
      <ProductActions {actions} on:action={onAction} />
    </div>
  </div>
</div>

<PrivateAsset skuId={product.sku._id} let:total={totalPrivateAssets}>
  <Tabs items={getItems(totalPrivateAssets)} menuBreakpoint="sm" defaultSelectedId={tab} on:select={redirect}>
    <Tab id="auction">
      <ProductAuction {product} canBid={!userOwnsProduct} />
    </Tab>
    <Tab id="history">
      <ProductHistory />
    </Tab>
    <Tab id="owner">
      <div class="text-white">
        <PrivateAssetList />
      </div>
    </Tab>
    <svelte:fragment slot="extra">
      {#if tab === 'auction' && hasActiveAuction(product)}
        <div class="text-gray-500 text-sm md:text-base">
          <span>Expires in</span>
          <span class="text-white"
            ><TimeDifference
              date={new Date(product.activeProductListings[0].endDate)}
              on:zero={() => auctionCancelled({ listingId: product.activeProductListings[0]._id })}
            /></span
          >
          <span class="italic text-sm font-black ">
            (<DateFormat value={product.activeProductListings[0].endDate} />)
          </span>
        </div>
      {/if}
    </svelte:fragment>
  </Tabs>
</PrivateAsset>
