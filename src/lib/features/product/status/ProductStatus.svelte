<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { readable } from 'svelte/store';
  import { mdiArrowRight, mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrency, formatDate } from '$util/format';
  import { auctionStarted, polls, saleStarted, totalBids } from '$lib/features/product/product.store';
  import Button from '$lib/components/Button.svelte';
  import {
    hasActiveSale,
    hasUpcomingSale,
    hasActiveAuction,
    isOwner,
    hasUpcomingAuction,
    canCancelAuction as canCancelAuctionFunction,
  } from '../product.service';
  import { maxPlacedBid, auctionEnded } from '../product.store';
  import BidForm from '../auction/BidForm.svelte';
  import { onOrderIntent } from '../../order/order.service';
  import { onAction, onBid } from '../actions/product-actions.service';
  import ProductStatusUpcoming from './ProductStatusUpcoming.svelte';
  import { getBiddingFee } from '../product.fee';

  export let product: Product;
  export let userId: string;

  function onBuy() {
    onOrderIntent({ product: product, listing: product.activeProductListings[0] });
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

  const textClass = 'text-2xl md:text-xl lg:text-2xl';
</script>

<div {...$$restProps}>
  {#if showActiveSale}
    <div
      class="flex flex-col md:flex-row w-full h-full md:rounded-lg overflow-hidden whitespace-nowrap"
      style="background-color: #313131;"
    >
      <div
        class="flex flex-grow flex-col md:flex-row md:px-6 py-2 md:py-4 justify-center md:justify-between items-center"
      >
        <div class="flex flex-row md:flex-col gap-1 items-center md:items-start">
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
      </div>

      {#if isProductOwner}
        <Button
          --button-border-radius="0"
          animate={false}
          on:click={() => onAction('cancel-sale', product)}
          class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
          >Cancel Sale<Icon size="1.2" path={mdiClose} /></Button
        >
      {:else}
        <Button
          --button-border-radius="0"
          animate={false}
          disabled={$isActive}
          on:click={onBuy}
          class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
        >
          {$isActive ? 'Processing...' : `Buy Now for ${formatCurrency(activeProductListing?.price)}`}<Icon
            size="1.2"
            path={mdiArrowRight}
          /></Button
        >
      {/if}
    </div>
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
      <div
        class="flex flex-col md:flex-row w-full h-full md:rounded-lg overflow-hidden"
        style="background-color: #313131;"
      >
        <div
          class="flex flex-grow flex-col md:flex-row md:px-6 py-2 md:py-4 justify-center md:justify-between items-center"
        >
          <div class="flex flex-row md:flex-col gap-1 items-center md:items-start">
            <div class="text-sm text-gray-500">Auction ends in:</div>
            <div class="flex gap-1">
              <TimeDifference date={activeProductListing?.endDate} on:zero={() => auctionEnded()} />
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
        </div>

        {#if canCancelAuction}
          <Button
            --button-border-radius="0"
            animate={false}
            on:click={() => onAction('cancel-auction', product)}
            class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
            >Cancel Auction<Icon size="1.2" path={mdiClose} /></Button
          >
        {/if}
      </div>
    {:else}
      <BidForm
        maxPlacedBid={$maxPlacedBid}
        listing={activeProductListing}
        fee={getBiddingFee(product)}
        on:place-bid={(event) => onBid(event.detail.amount, product)}
      />
    {/if}
  {/if}
</div>
