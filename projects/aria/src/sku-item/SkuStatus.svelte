<script lang="ts">
  import type { Sku, Status, Product } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import { isSkuV2 } from '$lib/infinite-api-sdk/guard.service';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { skuStatus, productStatus, skuStatusForV2 } from '$lib/sku-item/status';

  export let sku: Sku | SkuV2;
  export let product: Product;
  export let forProductStatus = false;

  let tileInfo: Status;

  $: if (product) {
    tileInfo = productStatus(product, forProductStatus);
  } else if (isSkuV2(sku)) {
    tileInfo = skuStatusForV2(sku, forProductStatus);
  } else {
    tileInfo = skuStatus(sku, forProductStatus);
  }
</script>

<div
  class={forProductStatus
    ? ''
    : 'card-status text-xl flex gap-2 justify-center items-center rounded-full py-3 whitespace-nowrap px-6'}
  class:no-sale={tileInfo.status === 'no-sale'}
>
  {#if tileInfo.status === 'upcoming'}
    <span class:font-bold={!productStatus}>Dropping:</span>
    <span>{formatDate(tileInfo.minStartDate, 'MMM D')}</span>
  {:else if tileInfo.status === 'upcoming-soon'}
    <span class:font-bold={!productStatus}>Dropping:</span>
    <TimeDifference date={tileInfo.minStartDate} />
  {:else if tileInfo.status === 'no-sale'}
    <span class:font-bold={!productStatus}>{product ? 'Not for sale' : 'Sold Out'}</span>
  {:else if tileInfo.status === 'active'}
    <span class:font-bold={!productStatus}>{tileInfo.saleTypeTitle}</span>
    {#if !forProductStatus}
      <span>{formatCurrencyWithOptionalFractionDigits(tileInfo.minPrice, { currency: sku.currency })}</span>
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
