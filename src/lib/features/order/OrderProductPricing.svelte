<script lang="ts">
  import { formatCurrency } from '$util/format';

  export let price: number;
  export let marketplaceFee: number;
  export let currency: 'USD' | 'ETH';
  export let gasFee = 0;
  export let rate: number = undefined;

  $: priceWFee = (1 + marketplaceFee) * price + gasFee;
  $: absoluteFee = marketplaceFee * price;

  const options = {
    currency,
    maximumFractionDigits: currency === 'ETH' ? 5 : 4,
    eth_currency_symbol: 'ETH',
  };
</script>

<div class="grid grid-cols-2 text-gray-500 font-medium text-sm sm:text-lg w-full">
  <div class="mb-2">Seller price:</div>
  <div class="flex justify-end items-center">
    {#if currency === 'ETH' && rate}
      <div class="text-right">
        {`${formatCurrency(price * rate, { currency: 'USD' })} ≈`}
      </div>
    {/if}
    <div class="text-right ml-1 text-black">
      {formatCurrency(price, options)}
    </div>
  </div>
  <div class="mb-2">Marketplace fee ({marketplaceFee * 100}%):</div>
  <div class="flex justify-end items-center">
    {#if currency === 'ETH' && rate}
      <div class="text-right">
        {`${formatCurrency(absoluteFee * rate, { currency: 'USD' })} ≈`}
      </div>
    {/if}
    <div class="text-right ml-1 text-black">
      {formatCurrency(absoluteFee, options)}
    </div>
  </div>
  {#if gasFee}
    <div class="mb-2">NFT minting fee:</div>
    <div class="flex justify-end items-center">
      {#if rate}
        <div class="text-right">
          {`${formatCurrency(gasFee * rate, { currency: 'USD' })} ≈`}
        </div>
      {/if}
      <div class="text-right ml-1 text-black">
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
