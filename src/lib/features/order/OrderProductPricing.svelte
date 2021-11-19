<script lang="ts">
  import { formatCurrency } from '$util/format';

  export let price: number;
  export let marketplaceFee: number;
  export let currency: 'USD' | 'ETH';

  const priceWFee = (1 + marketplaceFee) * price;
  const absoluteFee = marketplaceFee * price;
</script>

<div class="grid grid-cols-2 text-gray-500 font-medium w-full">
  <div class="mb-2">Seller price:</div>
  <div class="text-right">
    {formatCurrency(price, { currency })}
  </div>
  <div>Marketplace fee ({marketplaceFee * 100}%):</div>
  <div class="text-right">
    {formatCurrency(absoluteFee, { currency })}
  </div>
</div>
<hr class="h-px w-full my-4" />
<div class="grid grid-cols-2 w-full">
  <div class="font-medium">Total:</div>
  <div class="text-right font-semibold">
    {formatCurrency(priceWFee, { currency })}
  </div>
</div>
