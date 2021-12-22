<script lang="ts">
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import HederaDisclaimer from './HederaDisclaimer.svelte';
  import EthDisclaimer from './EthDisclaimer.svelte';
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

<StickyColumn fitOnScreenContent --xl-split="0.55" --lg-split="0.51">
  <div slot="onscreen-content" class="flex flex-col justify-between h-full">
    <Gallery items={$sku.nftPublicAssets} />
  </div>
  <div slot="sticky-content" class="h-full sku-sticky-content">
    <div class="sku-name-block flex flex-col px-4 md:px-10 lg:px-12 gap-4 md:gap-8 pt-8 mb-8 md:mb-0">
      <div class="name-info-wrapper flex flex-col gap-8">
        <header class="text-gradient-primary text-3xl md:text-4.5xl font-medium section-title">{$sku.name}</header>
        <SkuInfo sku={$sku} />
      </div>
    </div>
  </div>
  <SkuPriceBox slot="sticky-cta" sku={$sku} totalCollectors={$totalCollectors} collectors={$collectors} />
  <div slot="tabs" class="px-4 md:px-12 pt-12 pd:pt-16 pb-4" style="min-height: 300px">
    <PrivateAsset skuId={$sku._id} let:total={totalPrivateAssets}>
      <Tabs items={getItems(totalPrivateAssets)} menuBreakpoint="sm" itemClass="text-2xl">
        <Tab id="description">
          <SkuDescription content={$sku.description} />

          <div class="mt-8">
            {#if $sku.currency === 'USD'}
              <HederaDisclaimer />
            {:else if $sku.currency === 'ETH'}
              <EthDisclaimer />
            {/if}
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
        <Tabs items={[{ id: 'related', title: 'Related Collectibles' }]} itemClass="text-2xl section-title">
          <Tab id="related">
            <SkuItemGrid class="mt-4" skus={$related} />
          </Tab>
        </Tabs>
      </div>
    </div></ThemeContext
  >
{/if}

<style lang="postcss">
  @media screen and (min-width: 768px) and (max-height: 920px) {
    .sku-name-block {
      padding-top: min(5vh, 4rem);
      margin-bottom: min(2.5vh, 2rem);
    }

    .name-info-wrapper {
      gap: min(2.5vh, 2rem);
    }
  }

  @media screen and (min-width: 768px) and (max-height: 768px) {
    .name-info-wrapper > header {
      @apply text-3xl;
    }
  }
</style>
