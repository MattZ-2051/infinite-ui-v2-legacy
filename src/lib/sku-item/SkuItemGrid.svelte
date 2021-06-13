<script lang="ts">
  import type { Sku } from './types';
  import SkuItem from './SkuItem.svelte';

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

  export let items: Sku[] = [
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

  $: information = max > 0 ? items.slice(0, max) : items;
</script>

<div
  class="grid grid-cols-1 gap-2 max-w-sm mx-auto md:max-w-none md:gap-6 {gridResponsiveClass} {$$props.class}"
>
  {#each information as item}
    <SkuItem {item} />
  {/each}
</div>
