<script lang="ts">
  import type { Sku, Status, Product } from '$lib/sku-item/types';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { skuStatus, productStatus } from '$lib/sku-item/status';

  export let sku: Sku;
  export let product: Product;

  let tileInfo: Status;
  $: tileInfo = product ? productStatus(product) : skuStatus(sku);
</script>

<section>
  {#if tileInfo.status === 'upcoming'}
    <span class="text-gray-500">Upcoming</span>
  {:else if tileInfo.status === 'upcoming-soon'}
    <span class="text-gray-500">Upcoming in:</span>
    <TimeDifference date={tileInfo.minStartDate} />
  {:else if tileInfo.status === 'no-sale'}
    <span class="text-gray-500">Not for sale</span>
  {:else if tileInfo.status === 'active'}
    <span class="text-gray-500">Starting Price:</span>
    <span class="text-default">
      {formatCurrencyWithOptionalFractionDigits(tileInfo.minPrice)}
    </span>
  {/if}
</section>
