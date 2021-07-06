<script lang="ts">
  import type { Status } from './types';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';

  export let startDate: Date;
  export let price = 0;
  export let type: 'sku' | 'product' = 'sku';
  export let status: Status = 'active';
</script>

<div
  class="flex justify-between card-status rounded-full py-3 transform -translate-y-2/4 mx-3 whitespace-nowrap px-6 items-center"
  class:no-sale={status === 'no-sale'}
>
  {#if status === 'upcoming'}
    <span class="card-status-text text-2xl m-auto">Upcoming</span>
  {:else if status === 'upcoming-soon'}
    <span class="card-status-text">Upcoming in:</span>
    <span class="text-2xl card-time-color font-light">
      <TimeDifference date={startDate} />
    </span>
  {:else if status === 'no-sale'}
    <span class="card-status-text text-2xl m-auto">
      {type === 'product' ? 'Not for sale' : 'None for sale'}
    </span>
  {:else if status === 'active'}
    <span class="card-status-text">
      {type === 'product' ? 'Current Price:' : 'Lowest Price:'}
    </span>
    <span class="text-2xl card-time-color">
      {formatCurrencyWithOptionalFractionDigits(price)}
    </span>
  {/if}
</div>

<style>
  .card-status {
    background: var(--card-status-color, #000000);
  }
  .card-status-text {
    color: var(--card-status-text, #c4c4c4);
  }
  .no-sale {
    --card-status-color: #e5e5e5;
    --card-status-text: #9e9e9e;
  }
  .card-time-color {
    color: #ffffff;
  }
</style>
