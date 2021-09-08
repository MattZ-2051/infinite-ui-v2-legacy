<script lang="ts">
  import { createForm } from 'felte';
  import { mdiArrowRight, mdiMinus, mdiClose } from '@mdi/js';
  import * as yup from 'yup';
  import { validateSchema } from '@felte/validator-yup';
  import { readable } from 'svelte/store';
  import type { Product } from '$lib/sku-item/types';
  import Icon from '$ui/icon/Icon.svelte';
  import notifications from '$ui/toast/toast.store';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { userId } from '$lib/user';
  import { formatCurrency, formatDate } from '$util/format';
  import { polls, totalBids } from '$lib/features/product/product.store';
  import {
    hasActiveSale,
    hasUpcomingSale,
    hasActiveAuction,
    isOwner,
    hasUpcomingAuction,
    canCancelAuction as canCancelAuctionFunction,
  } from './product.service';
  import { maxPlacedBid } from './product.store';
  import { onOrderIntent } from '../order/order.service';

  export let product: Product;
  let _class = '';
  export { _class as class };

  function onBuy() {
    onOrderIntent({ product: product, listing: product.activeProductListings[0] });
  }

  function handleClick() {
    if ($errors.bid) {
      notifications.danger(Array.isArray($errors.bid) ? $errors.bid[0] : $errors.bid, { toastId: 'bidError' });
    }
  }

  const schema = yup.object({
    bid: yup.number().moreThan(0, 'Enter a positive amount.').required('Amount is required.'),
  });

  const { form, errors } = createForm<{ bid: number }>({
    onSubmit: () => {
      // TODO: handle submit
    },
    validate: validateSchema(schema),
  });

  $: showActiveSale = hasActiveSale(product);
  $: showUpcomingSale = hasUpcomingSale(product);
  $: isActive = $polls[product._id]?.$isActive || readable(false);
  $: isProductOwner = isOwner(product, $userId);
  $: showUpcomingAuction = hasUpcomingAuction(product);
  $: showActiveAuction = hasActiveAuction(product);
  $: canCancelAuction = canCancelAuctionFunction(product, $userId, $totalBids);

  $: activeProductListing = product?.activeProductListings?.[0];
  $: upcomingProductListing = product?.upcomingProductListings?.[0];
</script>

<div class=" {_class}" {...$$restProps}>
  {#if showActiveSale}
    <div class="flex flex-row items-center w-full h-full bg-white bg-opacity-10 px-12 font-normal">
      <div class="bg-white-opacity-10 flex p-4 rounded-l-lg w-7/12 h-3/4 justify-between items-center">
        <div class="flex flex-col p-4">
          <div class="text-sm text-white-opacity-50 pb-2">Active Sale:</div>
          <div class="flex">
            <div class="text-base">Started on</div>
            <Icon size="1" path={mdiMinus} color="rgba(255,255,255,0.1);" />
            <div style="color: rgba(255, 255, 255, 0.3); text-base">{formatDate(activeProductListing?.startDate)}</div>
          </div>
        </div>
        {#if isProductOwner}
          <div class="text-2xl pr-2">Selling for {formatCurrency(activeProductListing?.price)}</div>
        {/if}
      </div>
      <div
        class="bg-white-opacity-10 w-5/12 p-4 h-3/4 rounded-r-lg flex items-center justify-center text-white hover:bg-white cursor-pointer hover:text-black"
      >
        {#if !isProductOwner}
          <button class="text-center font-normal text-2xl mr-6">
            {$isActive ? 'Processing...' : `Buy Now for ${formatCurrency(activeProductListing?.price)}`}
          </button>
          <Icon size="2" path={mdiArrowRight} />
        {/if}
        {#if isProductOwner}
          <button class="text-center font-normal text-2xl mr-6"> Cancel Sale </button>
          <Icon size="1.5" path={mdiClose} />
        {/if}
      </div>
    </div>
  {/if}

  {#if showUpcomingSale}
    <div class="flex flex-row items-center w-full h-full bg-white-opacity-10 px-12 font-normal">
      <div class="bg-white-opacity-10 flex p-4 rounded-l-lg w-2/3 h-3/4 justify-between items-center">
        <div class="flex flex-col p-4">
          <div class="text-sm text-white-opacity-50 pb-2">Sale Starts in:</div>
          <div class="flex">
            <TimeDifference date={upcomingProductListing?.startDate} />
            <Icon size="1" path={mdiMinus} color="rgba(255,255,255,0.1);" />
            <div style="color: rgba(255, 255, 255, 0.3); text-base">
              {formatDate(upcomingProductListing?.startDate)}
            </div>
          </div>
        </div>
        {#if isProductOwner}
          <div class="text-2xl pr-2 text-right">Selling for {formatCurrency(upcomingProductListing?.price)}</div>
        {/if}
      </div>

      <div
        class={`bg-white-opacity-10 w-1/3 p-4 h-3/4 rounded-r-lg flex items-center justify-center text-white ${
          isProductOwner && `hover:bg-white hover:cursor-pointer hover:text-black hover:cursor-pointer`
        }`}
      >
        {#if !isProductOwner}
          <div class="text-center font-normal text-2xl">
            Coming soon at {formatCurrency(upcomingProductListing?.price)}
          </div>
        {/if}
        {#if isProductOwner}
          <button class="text-center font-normal text-2xl mr-6">Cancel Sale </button>
          <Icon size="1.5" path={mdiClose} />
        {/if}
      </div>
    </div>
  {/if}

  {#if showUpcomingAuction || (showActiveAuction && canCancelAuction && isProductOwner)}
    <div class="flex flex-row items-center w-full h-full bg-white bg-opacity-10 px-12 font-normal">
      <div class="bg-white-opacity-10 flex p-4 rounded-l-lg w-2/3 h-3/4 justify-between items-center">
        <div class="flex flex-col p-4">
          <div class="text-sm text-white-opacity-50 pb-2">Auction starts in:</div>
          <div class="flex">
            <TimeDifference date={upcomingProductListing?.startDate || activeProductListing?.startDate} />
            <Icon size="1" path={mdiMinus} color="rgba(255,255,255,0.1);" />
            <div style="color: rgba(255, 255, 255, 0.3); text-base">
              {formatDate(upcomingProductListing?.startDate || activeProductListing?.startDate)}
            </div>
          </div>
        </div>
        {#if isProductOwner}
          <div class="text-2xl pr-2">
            Starting price {formatCurrency(upcomingProductListing?.minBid || activeProductListing?.minBid)}
          </div>
        {/if}
      </div>
      <div
        class={`bg-white-opacity-10 w-1/3 p-4 h-3/4 rounded-r-lg flex items-center justify-center text-white ${
          isProductOwner && `hover:bg-white hover:cursor-pointer hover:text-black`
        }`}
      >
        {#if !isProductOwner}
          <div class="text-center font-normal text-2xl">
            Starts soon at {formatCurrency(upcomingProductListing?.minBid || activeProductListing?.minBid)}
          </div>
        {/if}
        {#if isProductOwner}
          <button class="text-center font-normal text-2xl mr-6">Cancel Auction</button>
          <Icon size="1.5" path={mdiClose} />
        {/if}
      </div>
    </div>
  {/if}

  {#if showActiveAuction && !isProductOwner}
    <div class="flex flex-row items-center w-full h-full bg-white bg-opacity-10 px-12 font-normal">
      <div class="bg-white-opacity-10 flex p-4 rounded-l-lg w-2/4 h-3/4 justify-between items-center">
        <div class="flex flex-col p-4">
          <div class="text-sm text-white-opacity-50 pb-2">Auction ends in:</div>
          <div class="flex">
            <TimeDifference date={activeProductListing?.endDate} />
            <Icon size="1" path={mdiMinus} color="rgba(255,255,255,0.1);" />
            <div style="color: rgba(255, 255, 255, 0.3); text-base">{formatDate(activeProductListing?.endDate)}</div>
          </div>
        </div>
      </div>
      <div class="w-7/12 h-3/4">
        <input
          type="number"
          class="h-full m-0 w-full border-none text-default placeholder-white-opacity-40 bg-white-opacity-5 pl-6 text-xl focus:outline-none"
          name="bid"
          placeholder="$ Place a higher bid here"
        />
      </div>
      <div
        class={`bg-white-opacity-10 w-5/12 p-4 h-3/4 rounded-r-lg flex items-center justify-center text-white ${
          !isProductOwner && `hover:bg-white hover:cursor-pointer hover:text-black`
        }`}
      >
        {#if $isActive}
          <div class="text-center font-normal text-2xl">
            {'Processing...'}
          </div>
        {:else}
          <button class="text-center font-normal text-2xl mr-6"> Place Bid </button>
          <Icon size="1.5" path={mdiArrowRight} />
        {/if}
      </div>
    </div>
  {/if}

  {#if showActiveAuction && isProductOwner && !canCancelAuction}
    <div class="flex flex-row items-center w-full h-full bg-white-opacity-10 px-12 font-normal">
      <div class="bg-white-opacity-10 flex p-4 rounded-l-lg w-2/3 h-3/4 justify-between items-center">
        <div class="flex flex-col p-4">
          <div class="text-sm text-white-opacity-50 pb-2">Auction ends in:</div>
          <div class="flex">
            <TimeDifference date={activeProductListing?.endDate} />
            <Icon size="1" path={mdiMinus} color="rgba(255,255,255,0.1);" />
            <div style="color: rgba(255, 255, 255, 0.3); text-base">
              {formatDate(activeProductListing?.endDate)}
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white-opacity-10 w-1/3 p-4 h-3/4 rounded-r-lg flex items-center justify-center text-white">
        <div class="text-center font-normal text-2xl">
          Current bid {formatCurrency(activeProductListing?.minBid)}
        </div>
      </div>
    </div>
  {/if}
</div>
