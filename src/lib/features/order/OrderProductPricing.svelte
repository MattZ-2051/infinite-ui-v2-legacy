<script lang="ts">
  import type { Listing } from '$lib/sku-item/types';
  import { page } from '$app/stores';
  import Input from '$lib/components/form/input/Input.svelte';
  import { formatCurrency } from '$util/format';
  import { checkoutBidAmount, updateCheckoutBidAmount } from '../checkout/checkout.store';
  import { maxPlacedBid as maxProductBid } from '../product/product.store';
  import { maxPlacedBid as maxSkuBid } from '../sku-auction/sku-auction.store';

  export let price: number;
  export let marketplaceFee: number;
  export let currency: 'USD' | 'ETH';
  export let gasFee = 0;
  export let rate: number = undefined;
  export let listing: Listing;

  const isProduct = $page.url.pathname.includes('product');
  $: isAuction = listing?.saleType === 'auction';
  $: isGiveAway = listing?.saleType === 'giveaway';
  $: isFixed = listing?.saleType === 'fixed';
  $: priceWFee = isAuction ? $checkoutBidAmount * (1 + marketplaceFee) : (1 + marketplaceFee) * price + gasFee;
  $: absoluteFee = isAuction ? $checkoutBidAmount * marketplaceFee : marketplaceFee * price;
  $: minBid = isProduct ? $maxProductBid + 1 : $maxSkuBid + 1;

  const options = {
    currency,
    maximumFractionDigits: currency === 'ETH' ? 5 : 4,
    eth_currency_symbol: 'ETH',
  };

  const onBidInput = (event) => {
    const { value } = event.target as HTMLInputElement;
    updateCheckoutBidAmount(Number(value));
  };
</script>

<div class="grid grid-cols-2 text-gray-500 font-medium text-sm sm:text-lg w-full">
  {#if isFixed || isGiveAway}
    <div class="mb-2">Seller price:</div>
    <div class="flex justify-end items-center">
      {#if currency === 'ETH' && rate}
        <div class="text-right">
          {`${formatCurrency(price * rate, { currency: 'USD' })} ≈`}
        </div>
      {/if}
      <div class="text-right ml-1 text-default">
        {formatCurrency(price, options)}
      </div>
    </div>
  {:else if isAuction}
    <div class="flex col-span-2 mb-4">
      <div class="mb-2 text-black mr-6 mt-2 whitespace-nowrap">Bid Amount:</div>
      <div class="w-full">
        <Input
          name="eth-address"
          class="border border-solid rounded-lg h-12 border-grey-50 px-4 text-default w-full"
          variant="base"
          placeholder={`Minimum ${formatCurrency(minBid, options)}`}
          value={$checkoutBidAmount === 0 ? undefined : $checkoutBidAmount}
          type="number"
          on:input={onBidInput}
        />
      </div>
    </div>
  {/if}

  <div class="mb-2">Marketplace fee ({marketplaceFee * 100}%):</div>
  <div class="flex justify-end items-center">
    {#if currency === 'ETH' && rate}
      <div class="text-right">
        {`${formatCurrency(absoluteFee * rate, { currency: 'USD' })} ≈`}
      </div>
    {/if}
    <div class="text-right ml-1 text-default">
      {formatCurrency(absoluteFee, options)}
    </div>
  </div>
  {#if gasFee}
    <div class="mb-2">Prepaid NFT gas fee:</div>
    <div class="flex justify-end items-center">
      {#if rate}
        <div class="text-right">
          {`${formatCurrency(gasFee * rate, { currency: 'USD' })} ≈`}
        </div>
      {/if}
      <div class="text-right ml-1 text-default">
        {formatCurrency(gasFee, options)}
      </div>
    </div>
  {/if}
</div>
<hr class="h-px w-full my-4" />
<div class="flex justify-between w-full">
  <div class="font-medium text-sm sm:text-lg">Total cost:</div>
  <div class="flex justify-end items-center">
    {#if currency === 'ETH' && rate}
      <div class="text-right text-gray-500 flex items-center">
        {`${formatCurrency(priceWFee * rate, { currency: 'USD' })} ≈`}
      </div>
    {/if}
    <div class="text-right text-sm sm:text-lg ml-1">
      {formatCurrency(priceWFee, options)}
    </div>
  </div>
</div>
