<script lang="ts">
  import xss from 'xss';
  import { CLIENT_COMPANY_NAME } from '$project/variables';
  import { Tabs, Tab } from '$ui/tabs';
  import Accordion from '$ui/accordion/Accordion.svelte';
  import AccordionGroup from '$ui/accordion/AccordionGroup.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import { media } from '$lib/media-query.store';
  import Gallery from '$lib/components/Gallery.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import hedera from '$lib/components/icons/hedera';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import SkuPriceBox from './SkuPriceBox.svelte';
  import SkuCollectorList from './SkuCollectorList.svelte';
  import SkuInfo from './SkuInfo.svelte';
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
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-8">
      <AccordionGroup multiple>
        <Accordion title={'Description'} open={true} collapsible={!$media.md}>
          <div class="mt-4 description text-gray-400">
            {@html xss($sku.description || '')}
          </div>
          <div class="mt-4 flex bg-gray-100 text-gray-400 px-6 py-3 rounded-3xl justify-between items-center text-sm">
            <div class="flex items-center ">
              <div class="inline-block bg-black rounded-2xl p-2 mr-4">
                <Icon path={hedera} size="0.6" />
              </div>
              <span>{CLIENT_COMPANY_NAME} NFTs are minted on the Hedera Hashgraph</span>
            </div>
            <a href="https://support.suku.world/infinite/hedera-hashgraph-hts" class="link">Learn more</a>
          </div>
        </Accordion>
        <Accordion open={true} collapsible={!$media.md}>
          <div slot="title" class="flex gap-4 items-center">
            <span>Collectors</span>
            {#if $totalCollectors > 0}<span class="text-gray-400 text-lg">{$totalCollectors} Total</span>{/if}
          </div>
          <SkuCollectorList collectors={$collectors} skuId={$sku._id} />
        </Accordion>
        <PrivateAsset skuId={$sku._id} let:total={totalPrivateAssets}>
          {#if totalPrivateAssets > 0}
            <div>
              <Accordion title={'Owner Access'} open={true} collapsible={!$media.md}>
                <PrivateAssetList />
              </Accordion>
            </div>
          {/if}
        </PrivateAsset>
      </AccordionGroup>
    </div>
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

<style lang="postcss">
  .description :global(h3) {
    @apply font-bold;
    @apply text-black;
  }
  .description :global(p) {
    @apply my-4;
  }
  .description :global(ul) {
    @apply my-4;
    @apply list-disc;
    @apply pl-5;
  }
  .description :global(a) {
    @apply underline;
    @apply text-black;
  }
</style>
