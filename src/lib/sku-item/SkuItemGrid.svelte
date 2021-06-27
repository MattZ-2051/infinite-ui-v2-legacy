<script lang="ts">
  import type { Sku, Product } from './types';
  import SkuStatus from './SkuStatus.svelte';
  import SkuStatusInfo from './SkuStatusInfo.svelte';
  import SkuItem from './SkuItem.svelte';
  import { skuStatus, productStatus } from './status';

  export let max = 0;
  export let maxCols = 4;

  $: gridResponsiveClass = getGridResponsiveClasses(maxCols);

  function getGridResponsiveClasses(cols: number): string {
    switch (cols) {
      case 3:
        return 'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3';

      case 4:
        return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

      default:
        return '';
    }
  }

  export let products: Product[] = [];

  export let skus: Sku[] = [];

  $: productList = max > 0 ? (products || []).slice(0, max) : products || [];
  $: information = max > 0 ? skus.slice(0, max) : skus;
</script>

<div class="grid grid-cols-1 gap-2 max-w-sm mx-auto md:max-w-none md:gap-6 {gridResponsiveClass} {$$props.class}">
  {#if productList.length}
    {#each productList as item}
      <SkuItem item={item.sku}>
        <svelte:fragment slot="info">
          <SkuStatusInfo unique={item?.sku?.maxSupply === 1} serialNumber={item.serialNumber} />
        </svelte:fragment>
        <svelte:fragment slot="status">
          <SkuStatus
            type="product"
            startDate={item?.upcomingProductListings[0]?.startDate}
            status={productStatus(item)}
            price={item?.activeProductListings[0]?.price}
          />
        </svelte:fragment>
      </SkuItem>
    {/each}
  {:else}
    {#each information as item}
      <SkuItem {item}>
        <svelte:fragment slot="info">
          <SkuStatusInfo
            unique={item.maxSupply === 1}
            status={skuStatus(item)}
            supplyType={item.supplyType}
            circulatingSupply={item.circulatingSupply}
            totalSupply={item.totalSupply}
            totalSupplyLeft={item.totalSupplyLeft}
          />
        </svelte:fragment>
        <svelte:fragment slot="status">
          <SkuStatus type="sku" startDate={item.startDate} status={skuStatus(item)} price={item.minPrice} />
        </svelte:fragment>
      </SkuItem>
    {/each}
  {/if}
</div>
