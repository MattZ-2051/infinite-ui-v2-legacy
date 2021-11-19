<script lang="ts">
  import type { Sku, Status, Product } from '$lib/sku-item/types';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { skuStatus, productStatus } from '$lib/sku-item/status';

  export let sku: Sku;
  export let product: Product;
  export let forProductStatus = false;

  let tileInfo: Status;
  $: tileInfo = product ? productStatus(product, forProductStatus) : skuStatus(sku);
</script>

<div
  class="{forProductStatus
    ? ''
    : 'card-status text-xl flex gap-2 justify-center items-center rounded-full py-3 mx-3 whitespace-nowrap px-6'}}"
  class:no-sale={tileInfo.status === 'no-sale'}
>
  {#if tileInfo.status === 'upcoming'}
    <span class:font-bold={!productStatus}>Dropping:</span>
    <span>{formatDate(tileInfo.minStartDate, 'MMM D')}</span>
  {:else if tileInfo.status === 'upcoming-soon'}
    <span class:font-bold={!productStatus}>Dropping:</span>
    <TimeDifference date={tileInfo.minStartDate} />
  {:else if tileInfo.status === 'no-sale'}
    <span class:font-bold={!productStatus}>{product ? 'Not for sale' : 'Sold'}</span>
  {:else if tileInfo.status === 'active'}
    <span class:font-bold={!productStatus}>{tileInfo.saleTypeTitle}</span>
    {#if !forProductStatus}
      <span>{formatCurrencyWithOptionalFractionDigits(tileInfo.minPrice)}</span>
    {/if}
  {/if}
</div>

<style>
  .card-status {
    background: #2d2d2d;
    color: #c4c4c4;
  }
  .no-sale.card-status {
    background: #e5e5e5;
    color: #9e9e9e;
  }
</style>
