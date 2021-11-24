<script lang="ts">
  import type { Sku, Status, Product } from '$lib/sku-item/types';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { skuStatus, productStatus } from '$lib/sku-item/status';

  export let sku: Sku;
  export let product: Product = undefined;
  export let forProductStatus = false;

  let tileInfo: Status;
  $: tileInfo = product ? productStatus(product, forProductStatus) : skuStatus(sku, forProductStatus);
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
    <span class:text-gray-500={!productStatus}>{tileInfo.saleTypeTitle}</span>
    {#if !forProductStatus}
      <span class="text-default">
        {formatCurrencyWithOptionalFractionDigits(tileInfo.minPrice, { currency: sku.currency })}
      </span>
    {/if}
  {/if}
</section>
