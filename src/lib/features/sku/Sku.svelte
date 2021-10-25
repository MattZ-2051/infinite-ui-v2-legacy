<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import HederaDisclaimer from './HederaDisclaimer.svelte';
  import SkuPriceBox from './pricebox/SkuPriceBox.svelte';
  import SkuInfo from './SkuInfo.svelte';
  import SkuDescription from './SkuDescription.svelte';
  import { sku, collectors, totalCollectors, related } from './sku.store';

  function getItems(totalPrivateAssets: number) {
    let items = [{ id: 'description', title: 'Description' }];

    if ($sku.details) {
      items.push({ id: 'details', title: 'Details' });
    }

    if (totalPrivateAssets > 0) {
      items.push({ id: 'owner', title: 'Owner Access' });
    }

    return items;
  }
</script>

<StickyColumn fitOnScreenContent>
  <div slot="onscreen-content" class="flex flex-col justify-between h-full">
    <Gallery items={$sku.nftPublicAssets} />
  </div>
  <div slot="sticky-content" class="h-full sku-sticky-content">
    <div class="flex flex-col px-4 md:px-8 gap-4 md:gap-8 mt-8 md:mt-16 mb-8 md:mb-0">
      <div class="flex flex-col gap-8">
        <div class="text-gradient-primary text-3xl md:text-4xl font-medium">{$sku.name}</div>
        <SkuInfo sku={$sku} />
      </div>
    </div>
  </div>
  <SkuPriceBox slot="sticky-cta" sku={$sku} totalCollectors={$totalCollectors} collectors={$collectors} />
  <div slot="tabs" class="px-4 pt-12 pd:pt-16 pb-4" style="min-height: 300px">
    <PrivateAsset skuId={$sku._id} let:total={totalPrivateAssets}>
      <Tabs items={getItems(totalPrivateAssets)} menuBreakpoint="sm" itemClass="text-2xl">
        <Tab id="description">
          <SkuDescription content={$sku.description} />

          <div class="mt-8">
            <HederaDisclaimer />
          </div>
        </Tab>

        <Tab id="details">
          <SkuDescription content={$sku.details} />
        </Tab>

        <Tab id="owner">
          {#if totalPrivateAssets > 0}
            <PrivateAssetList />
          {/if}
        </Tab>
      </Tabs>
    </PrivateAsset>
  </div>
</StickyColumn>
{#if $related.length > 0}
  <ThemeContext id="sku-offsreen">
    <div style="background-color: var(--sku-offscreen-bg-color, rgba(255, 255, 255, 0.95))">
      <div class="container mt-12 md:pt-20 md:pb-40">
        <Tabs items={[{ id: 'related', title: 'Related Collectibles' }]} itemClass="text-2xl">
          <Tab id="related">
            <SkuItemGrid class="mt-4" skus={$related} />
          </Tab>
        </Tabs>
      </div>
    </div></ThemeContext
  >
{/if}
