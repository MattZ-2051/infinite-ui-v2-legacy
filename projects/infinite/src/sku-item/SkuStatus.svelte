<script lang="ts">
  import type { Sku, Status, Product } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import { isSkuV2 } from '$lib/infinite-api-sdk/guard.service';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { skuStatus, productStatus, skuStatusForV2 } from '$lib/sku-item/status';

  export let sku: Sku | SkuV2;
  export let product: Product = undefined;
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

<section>
  {#if tileInfo.status === 'upcoming'}
    <span class:text-gray-500={!productStatus}>Upcoming:</span>
    <span>{formatDate(tileInfo.minStartDate, 'MMM D @ h:mm A')}</span>
  {:else if tileInfo.status === 'upcoming-soon'}
    <span class:text-gray-500={!productStatus}>Upcoming:</span>
    <TimeDifference date={tileInfo.minStartDate} />
  {:else if tileInfo.status === 'no-sale'}
    <span class:text-gray-500={!productStatus}>Not for sale</span>
  {:else if tileInfo.status === 'active'}
    <span class="text-gray-500 mr-2">{tileInfo.saleTypeTitle}</span>
    {#if !forProductStatus}
      <span class="text-default">
        {formatCurrencyWithOptionalFractionDigits(tileInfo.minPrice, { currency: sku.currency })}
      </span>
    {/if}
  {/if}
</section>
