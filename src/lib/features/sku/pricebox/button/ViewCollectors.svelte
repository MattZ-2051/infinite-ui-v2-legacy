<script lang="ts">
  import { readable } from 'svelte/store';
  import type { Sku } from '$lib/sku-item/types';
  import { polls } from '$lib/features/product/product.store';
  import routes from '$project/routes';
  import { goto } from '$app/navigation';
  import SkuPriceBoxButton from './SkuPriceBoxButton.svelte';

  $: isPolling = $polls[sku._id]?.$isActive || readable(false);

  export let sku: Sku;

  const parameters =
    sku?.mintPolicy?.transaction === 'later' ? '?mintStatus=all&sortBy=serialNumber:desc' : '?saleType=all';
  const href = routes.collectors(sku._id, parameters);
</script>

<SkuPriceBoxButton action={href !== undefined} polling={$isPolling} on:click={() => goto(href)}>
  <div class="flex justify-between gap-2">
    <div class="text-2xl from-collector-text-custom scalable-title">View Collectors</div>
  </div>
</SkuPriceBoxButton>

<style lang="postcss">
  .from-collector-text-custom {
    font-weight: var(--font-weight-view-collector, 400);
    font-family: var(--font-family-from-collector, inherit);
  }
  .scalable-title {
    /* 0.055 ratio will scale to 1.5rem when container is 400px */
    --scale-ratio: 0.055;

    font-size: clamp(0.875rem, calc((var(--price-box-container-width) * var(--scale-ratio)) * 1px), 1.5rem);
    @apply transition-all duration-75;
  }
</style>
