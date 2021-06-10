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

  export let skus: Sku[] = [
    {
      graphicUrl: '/jordan.jpg',
      issuerName: 'Jordan',
      rarity: 'legendary',
      name: 'Long Walk',
      series: { name: '# Series 3' } as unknown,
      totalSupply: 1,
      startDate: new Date(2021, 8, 23),
    } as Sku,
    {
      graphicUrl: '/cars_traffic.jpg',
      issuerName: 'Car',
      rarity: 'rare',
      name: 'Futuristic Car',
      series: { name: '# Series 10' } as unknown,
      totalSupply: 786,
      startDate: new Date(2021, 10, 23),
    } as Sku,
    {
      graphicUrl: '/graffiti.jpg',
      issuerName: 'Street Art',
      rarity: 'epic',
      name: 'Graffiti Girl',
      series: { name: '# Series 18' } as unknown,
      totalSupply: 542,
      startDate: new Date(2021, 7, 13),
    } as Sku,
    {
      graphicUrl: '/koko.jpg',
      issuerName: 'Koko',
      rarity: 'uncommon',
      name: 'Observe',
      series: { name: '# Series 33' } as unknown,
      totalSupply: 432,
      startDate: new Date(2021, 7, 23),
    } as Sku,
    {
      graphicUrl: '/cars_traffic.jpg',
      issuerName: 'Car',
      rarity: 'rare',
      name: 'Futuristic Car',
      series: { name: '# Series 10' } as unknown,
      totalSupply: 786,
      startDate: new Date(2021, 10, 23),
    } as Sku,
    {
      graphicUrl: '/graffiti.jpg',
      issuerName: 'Street Art',
      rarity: 'epic',
      name: 'Graffiti Girl',
      series: { name: '# Series 18' } as unknown,
      totalSupply: 542,
      startDate: new Date(2021, 7, 13),
    } as Sku,
    {
      graphicUrl: '/koko.jpg',
      issuerName: 'Koko',
      rarity: 'uncommon',
      name: 'Observe',
      series: { name: '# Series 33' } as unknown,
      totalSupply: 432,
      startDate: new Date(2021, 7, 23),
    } as Sku,
    {
      graphicUrl: '/jordan.jpg',
      issuerName: 'Jordan',
      rarity: 'legendary',
      name: 'Long Walk',
      series: { name: '# Series 3' } as unknown,
      totalSupply: 1,
      startDate: new Date(2021, 8, 23),
    } as Sku,
    {
      graphicUrl: '/cars_traffic.jpg',
      issuerName: 'Car',
      rarity: 'rare',
      name: 'Futuristic Car',
      series: { name: '# Series 10' } as unknown,
      totalSupply: 786,
      startDate: new Date(2021, 10, 23),
    } as Sku,
    {
      graphicUrl: '/graffiti.jpg',
      issuerName: 'Street Art',
      rarity: 'epic',
      name: 'Graffiti Girl',
      series: { name: '# Series 18' } as unknown,
      totalSupply: 542,
      startDate: new Date(2021, 7, 13),
    } as Sku,
    {
      graphicUrl: '/koko.jpg',
      issuerName: 'Koko',
      rarity: 'uncommon',
      name: 'Observe',
      series: { name: '# Series 33' } as unknown,
      totalSupply: 432,
      startDate: new Date(2021, 7, 23),
    } as Sku,
  ];

  $: productList = max > 0 ? (products || []).slice(0, max) : products || [];
  $: information = max > 0 ? skus.slice(0, max) : skus;
</script>

<div
  class="grid grid-cols-1 gap-2 max-w-sm mx-auto md:max-w-none md:gap-6 {gridResponsiveClass} {$$props.class}"
>
  {#if productList.length}
    {#each productList as item}
      <SkuItem item={item.sku}>
        <SkuStatusInfo
          slot="info"
          unique={item?.sku?.maxSupply === 1}
          serialNumber={item.serialNumber}
        />
        <SkuStatus
          slot="status"
          type="product"
          startDate={item?.upcomingProductListings[0]?.startDate}
          status={productStatus(item)}
          price={item?.activeProductListings[0]?.price}
        />
      </SkuItem>
    {/each}
  {:else}
    {#each information as item}
      <SkuItem {item}>
        <SkuStatusInfo
          slot="info"
          unique={item.maxSupply === 1}
          status={skuStatus(item)}
          supplyType={item.supplyType}
          circulatingSupply={item.circulatingSupply}
          totalSupply={item.totalSupply}
          totalSupplyLeft={item.totalSupplyLeft}
        />
        <SkuStatus
          slot="status"
          type="sku"
          startDate={item.startDate}
          status={skuStatus(item)}
          price={item.minPrice}
        />
      </SkuItem>
    {/each}
  {/if}
</div>
