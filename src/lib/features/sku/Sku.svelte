<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import Gallery from '$lib/components/Gallery.svelte';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import SkuPriceBox from './SkuPriceBox.svelte';
  import SkuCollectorList from './SkuCollectorList.svelte';
  import SkuInfo from './SkuInfo.svelte';
  import SkuDescription from './SkuDescription.svelte';
  import { sku, collectors, totalCollectors, related } from './sku.store';
</script>

<StickyColumn fitOnScreenContent>
  <div slot="onscreen-content" class="flex flex-col justify-between h-full">
    <Gallery items={$sku.nftPublicAssets} />
  </div>
  <div slot="sticky-content" class="h-full">
    <div class="flex flex-col px-4 md:px-8 gap-4 md:gap-8 text-white mt-8 md:mt-16">
      <div class="flex flex-col gap-8 ">
        <div class="text-gradient-primary text-3xl md:text-4xl font-medium">{$sku.name}</div>
        <SkuInfo sku={$sku} />
      </div>
    </div>
  </div>
  <SkuPriceBox slot="sticky-cta" sku={$sku} totalCollectors={$totalCollectors} collectors={$collectors} />
  <div slot="tabs">
    <Tabs
      items={[
        { id: 'description', title: 'Description' },
        { id: 'details', title: 'Details' },
        { id: 'collectors', title: 'Collectors' },
        { id: 'owner', title: 'Owner Access' },
      ]}
      class="text-3xl mt-12 md:mt-16 mb-4"
      itemClass=""
    >
      <Tab id="description">
        <SkuDescription sku={$sku} />
      </Tab>

      <Tab id="details">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore consequatur ipsam accusantium consectetur, fuga
        voluptas impedit sequi corporis doloribus earum quis vero officia, qui quidem! Quae sint temporibus facere
        saepe.
      </Tab>

      <Tab id="collectors">
        <SkuCollectorList collectors={$collectors} skuId={$sku._id} />
      </Tab>

      <Tab id="private">
        <PrivateAsset skuId={$sku._id} let:total={totalPrivateAssets}>
          {#if totalPrivateAssets > 0}
            <PrivateAssetList />
          {/if}
        </PrivateAsset>
      </Tab>
    </Tabs>
  </div>
  <div slot="offscreen-content">
    {#if $related.length > 0}
      <div class="container mt-8">
        <Tabs items={[{ id: 'related', title: 'Related Releases' }]} itemClass="md:pb-8">
          <Tab id="related">
            <SkuItemGrid class="mt-4" skus={$related} />
          </Tab>
        </Tabs>
      </div>
    {/if}
  </div>
</StickyColumn>
