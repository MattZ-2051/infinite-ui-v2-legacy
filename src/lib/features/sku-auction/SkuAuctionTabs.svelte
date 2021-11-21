<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { Tabs } from '$ui/tabs';
  import SkuAuctionAuction from './auction/SkuAuctionAuction.svelte';

  export let sku: Sku;
</script>

<Tabs
  class="px-4 md:pl-8 lg:pl-12"
  items={[
    {
      id: 'auction',
      title: 'Auction',
    },
  ]}
  itemClass="text-xl lg:text-2xl items-center"
  menuBreakpoint="sm"
  defaultSelectedId="auction"
  --tab-border-color-active="transparent"
/>

<div class="flex-grow px-4 md:pl-8 lg:px-12 pb-4 lg:pb-12" style="background-color: var(--product-tabs-bg);">
  <SkuAuctionAuction {sku} />
</div>
