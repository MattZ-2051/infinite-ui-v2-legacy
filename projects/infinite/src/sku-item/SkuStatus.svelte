<script lang="ts">
  import type { Sku, Status } from '$lib/sku-item/types';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrencyWithOptionalFractionDigits } from '$util/format';
  import { skuStatus } from '$lib/sku-item/status';

  export let item: Sku;

  let status: Status;
  $: status = skuStatus(item);
</script>

<section>
  {#if status === 'upcoming'}
    <span class="opacity-50">Upcoming</span>
  {:else if status === 'upcoming-soon'}
    <span class="opacity-50">Upcoming in:</span>
    <TimeDifference date={item.minStartDate} />
  {:else if status === 'no-sale'}
    <span class="opacity-50">None for sale</span>
  {:else if status === 'active'}
    <span class="opacity-50">Starting Price:</span>
    <span class="opacity-100">
      {formatCurrencyWithOptionalFractionDigits(item.minPrice)}
    </span>
  {/if}
</section>
