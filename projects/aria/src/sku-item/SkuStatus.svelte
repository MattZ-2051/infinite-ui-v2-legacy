<script lang="ts">
  import type { Sku, Status } from '$lib/sku-item/types';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits, formatDate } from '$util/format';
  import { skuStatus } from '$lib/sku-item/status';

  export let item: Sku;

  let status: Status;
  $: status = skuStatus(item);
</script>

<div
  class="card-status text-lg flex gap-2 justify-center items-center rounded-full py-3 mx-3 whitespace-nowrap px-6"
  class:no-sale={status === 'no-sale'}
>
  {#if status === 'upcoming'}
    <span>Upcoming on:</span>
    <span>{formatDate(item.minStartDate, 'MMM D')}</span>
  {:else if status === 'upcoming-soon'}
    <span>Upcoming in:</span>
    <TimeDifference date={item.minStartDate} />
  {:else if status === 'no-sale'}
    <span>None for sale</span>
  {:else if status === 'active'}
    <span>Starting Price:</span>
    <span>
      {formatCurrencyWithOptionalFractionDigits(item.minPrice)}
    </span>
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
