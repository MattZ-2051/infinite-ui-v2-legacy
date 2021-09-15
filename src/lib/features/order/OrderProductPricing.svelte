<script lang="ts">
  import { formatCurrency } from '$util/format';

  export let price: number;
  export let marketplaceFee: number;
</script>

<div class="grid grid-cols-2 text-gray-400 font-medium w-full">
  <div class="mb-2">Seller price:</div>
  <div class="text-right">{formatCurrency(price)}</div>
  <div>Marketplace fee ({marketplaceFee * 100}%):</div>
  <div class="text-right">{formatCurrency(marketplaceFee * price)}</div>
</div>
<hr class="h-px w-full my-4" />
<div class="grid grid-cols-2 w-full">
  <div class="font-medium">Total:</div>
  <div class="text-right font-semibold">{formatCurrency(price + marketplaceFee * price)}</div>
</div>
