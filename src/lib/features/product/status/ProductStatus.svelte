<script lang="ts">
  import type { Product, Transaction } from '$lib/sku-item/types';
  import type { ActionType } from '$lib/features/product/actions/types';
  import { readable } from 'svelte/store';
  import { mdiClose, mdiArrowCollapseLeft } from '@mdi/js';
  import arrowRight from '$lib/features/product/assets/arrow-right';
  import Icon from '$ui/icon/Icon.svelte';
  import { toast } from '$ui/toast';
  import { onSignIn, user } from '$lib/user';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrency, formatDate } from '$util/format';
  import { auctionStarted, polls, saleStarted, totalBids } from '$lib/features/product/product.store';
  import { fetchRequiredSkus, gateKeepSkus } from '$lib/features/gateKeeping/gateKeeping.store';
  import Button from '$lib/components/Button.svelte';
  import {
    InfiniteExtensionStore,
    nftBalance,
    QueryBalanceStore,
  } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import {
    hasActiveSale,
    hasUpcomingSale,
    hasActiveAuction,
    isOwner,
    hasUpcomingAuction,
    canCancelAuction as canCancelAuctionFunction,
    transferredOut,
    inExternalBalance,
  } from '../product.service';
  import { maxPlacedBid, auctionEnded } from '../product.store';
  import BidForm from '../auction/BidForm.svelte';
  import { onOrderIntent } from '../../order/order.service';
  import { onAction, onBid } from '../actions/product-actions.service';
  import ProductStatusUpcoming from './ProductStatusUpcoming.svelte';
  import { getBiddingFee } from '../product.fee';
  import ProductStatusLayout from './ProductStatusLayout.svelte';

  export let product: Product;
  export let userId: string;
  export let transactions: Transaction[];

  function verifyExtensionState(action: ActionType) {
    if ($InfiniteExtensionStore.walletLocked) {
      toast.danger('Please unlock the INFINITE browser wallet and refresh the window to use this feature.');
    } else if (!$InfiniteExtensionStore.extensionAvailable || !$InfiniteExtensionStore.loggedIn) {
      toast.danger(
        'Please connect the INFINITE browser wallet to use this feature, <a target="_blank" noreferrer href="https://chrome.google.com/webstore/detail/infinite-browser-wallet/jijmcpjphgekceoblbgeffccmganjaig">learn more</a>.'
      );
    } else if ($InfiniteExtensionStore.loggedIn && !isInExternalBalance) {
      toast.danger("This product isn't in your external wallet balance.");
    } else {
      onAction(action, product);
    }
  }

  async function onBuy() {
    const { sku, activeProductListings } = product;
    const hasGateKeepingRules = !!sku.gateKeepingRules;
    const redirectToLogin = !$user && hasGateKeepingRules;
    if (redirectToLogin) {
      onSignIn();
    } else {
      await fetchRequiredSkus({ skuId: sku._id });
      if ($gateKeepSkus.some((gateKeepSku) => gateKeepSku.status !== 'owned')) {
        return;
      }
      onOrderIntent({ product: product, listing: activeProductListings[0] });
    }
  }

  function onTransferIn() {
    verifyExtensionState('transfer-in');
  }

  $: showActiveSale = hasActiveSale(product);
  $: showUpcomingSale = hasUpcomingSale(product);
  $: isActive = $polls[product._id]?.$isActive || readable(false);
  $: isProductOwner = isOwner(product, userId);
  $: showUpcomingAuction = hasUpcomingAuction(product);
  $: showActiveAuction = hasActiveAuction(product);
  $: canCancelAuction = canCancelAuctionFunction(product, userId, $totalBids);

  $: activeProductListing = product?.activeProductListings?.[0];
  $: upcomingProductListing = product?.upcomingProductListings?.[0];

  $: isTransferredOut = transferredOut(product, transactions);
  $: isInExternalBalance = inExternalBalance(product, $QueryBalanceStore, $nftBalance);

  const textClass = 'text-2xl md:text-xl lg:text-2xl';
</script>

<div {...$$restProps}>
  {#if showActiveSale}
    <ProductStatusLayout>
      <div class="flex flex-row lg:flex-col gap-1 items-center lg:items-start">
        <div class="text-sm text-gray-500">Active Sale:</div>
        <div class="flex gap-1">
          Started on
          <div class="text-gray-300">
            {formatDate(activeProductListing?.startDate)}
          </div>
        </div>
      </div>
      {#if isProductOwner}
        <div class={textClass}>
          Selling for {formatCurrency(activeProductListing?.price)}
        </div>
      {/if}

      <svelte:fragment slot="action">
        {#if isProductOwner}
          <Button
            variant="brand"
            --button-border-radius="0"
            on:click={() => onAction('cancel-sale', product)}
            class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
            >Cancel Sale<Icon size="1.2" path={mdiClose} /></Button
          >
        {:else}
          <Button
            variant="brand"
            --button-border-radius="0"
            disabled={$isActive}
            on:click={onBuy}
            class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
          >
            {$isActive ? 'Processing...' : `Buy Now for ${formatCurrency(activeProductListing?.price)}`}<Icon
              size="1.2"
              path={arrowRight}
            /></Button
          >
        {/if}
      </svelte:fragment>
    </ProductStatusLayout>
  {/if}

  {#if showUpcomingSale}
    <ProductStatusUpcoming
      type="sale"
      startDate={upcomingProductListing?.startDate}
      price={upcomingProductListing?.price}
      {isProductOwner}
      on:zero={() => saleStarted({ product })}
      on:cancel={() => onAction('cancel-sale', product)}
    />
  {/if}

  {#if showUpcomingAuction}
    <ProductStatusUpcoming
      type="auction"
      startDate={upcomingProductListing?.startDate}
      price={upcomingProductListing?.minBid}
      {isProductOwner}
      on:zero={() => auctionStarted({ product })}
      on:cancel={() => onAction('cancel-auction', product)}
    />
  {/if}

  {#if showActiveAuction}
    {#if isProductOwner}
      <ProductStatusLayout>
        <div class="flex flex-row lg:flex-col gap-1 items-center lg:items-start">
          <div class="text-sm text-gray-500">Auction ends in:</div>
          <div class="flex gap-1">
            <TimeDifference date={activeProductListing?.endDate} on:zero={() => auctionEnded({ product })} />
            <div class="text-gray-300">
              — {formatDate(activeProductListing?.endDate)}
            </div>
          </div>
        </div>
        {#if !canCancelAuction}
          <div class={textClass}>
            Current bid {formatCurrency($maxPlacedBid)}
          </div>
        {:else}
          <div class={textClass}>
            Starting price {formatCurrency(activeProductListing?.minBid)}
          </div>
        {/if}

        <svelte:fragment slot="action">
          {#if canCancelAuction}
            <Button
              variant="brand"
              --button-border-radius="0"
              on:click={() => onAction('cancel-auction', product)}
              class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
              >Cancel Auction<Icon size="1.2" path={mdiClose} /></Button
            >
          {/if}
        </svelte:fragment>
      </ProductStatusLayout>
    {:else}
      <BidForm
        {product}
        maxPlacedBid={$maxPlacedBid}
        listing={activeProductListing}
        fee={getBiddingFee(product)}
        on:place-bid={(event) => onBid(event.detail.amount, product)}
      />
    {/if}
  {/if}

  {#if isTransferredOut}
    <div
      class="flex flex-col md:flex-row w-full h-full md:rounded-lg overflow-hidden"
      style="background-color: #313131;"
    >
      <div
        class="flex flex-grow flex-col md:flex-row md:px-6 py-2 md:py-4 justify-center md:justify-between items-center"
      >
        <div class="flex flex-row md:flex-col gap-1 items-center md:items-start">
          <div class="text-sm text-gray-500">External wallet:</div>
          <div class="text-base text-gray-300">Hedera {product.externalWallet}</div>
        </div>
      </div>
      <Button
        --button-border-radius="0"
        animate={false}
        on:click={() => onTransferIn()}
        class="flex items-center gap-2 px-6 h-20 md:h-auto"
        variant="brand">Transfer In<Icon size="1.2" path={mdiArrowCollapseLeft} /></Button
      >
    </div>
  {/if}
</div>
