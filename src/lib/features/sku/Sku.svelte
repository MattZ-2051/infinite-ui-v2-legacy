<script lang="ts">
  import { onMount } from 'svelte';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import NftGateKeepList from '$lib/features/gateKeeping/NftGateKeepList.svelte';
  import { clearRequiredSkus, gateKeepSkus } from '$lib/features/gateKeeping/gateKeeping.store';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import { userId } from '$lib/user';
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
      items.push({ id: 'owner', title: 'Unlockable Content' });
    }

    return items;
  }

  onMount(async () => {
    clearRequiredSkus();
  });

  $: activeGateKeepSkus = $gateKeepSkus.some((gateKeepSku) => gateKeepSku.status !== 'owned');
</script>

<StickyColumn fitOnScreenContent --xl-split="0.55" --lg-split="0.51" class="sku">
  <div slot="onscreen-content" class="flex flex-col justify-between h-full">
    <Gallery items={$sku.nftPublicAssets} class="sku-gallery" />
  </div>
  <div slot="sticky-content" class="h-full sku-sticky-content">
    {#if activeGateKeepSkus}
      <NftGateKeepList />
    {:else}
      <div class="sku-name-block flex flex-col px-4 md:px-10 lg:px-12 gap-4 md:gap-8 pt-8 mb-8 md:mb-0">
        <div class="name-info-wrapper flex flex-col gap-8">
          <header
            class="text-gradient-primary text-3xl md:text-4.5xl font-medium section-title {!$sku?.skuCollection &&
              'name-mb'}"
          >
            {$sku.name}
          </header>
          {#if $sku?.skuCollection}
            <span class="text-gray-500 font-light text-base not-italic inline-block name-mb">
              {$sku?.skuCollection.name}</span
            >
          {/if}
          <SkuInfo sku={$sku} />
        </div>
      </div>
    {/if}
  </div>
  <div slot="sticky-cta" class="custom-content-buttons">
    {#if !activeGateKeepSkus}
      <SkuPriceBox sku={$sku} totalCollectors={$totalCollectors} collectors={$collectors} userId={$userId} />
    {/if}
  </div>
  <div slot="tabs" class="px-4 md:px-12 pt-12 pd:pt-16 pb-4" style="min-height: 300px">
    <PrivateAsset productId={undefined} skuId={$sku._id} let:total={totalPrivateAssets}>
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
{:else}
  <div class="h-32" />
{/if}

<style lang="postcss">
  .custom-content-buttons {
    padding: var(--padding-sku-buttons, 0);
    margin-bottom: var(--margin-bottom-sku-buttons, 0);
  }

  @media screen and (min-width: 768px) and (max-height: 920px) {
    .sku-name-block {
      padding-top: min(5vh, 4rem);
      margin-bottom: min(2.5vh, 2rem);
    }

    .name-info-wrapper {
      gap: var(--sku-name-wrapper-lg-gap, min(2.5vh, 2rem));
    }
  }

  @screen xl {
    .name-mb {
      margin-bottom: var(--sku-collection-name-xl-mb, 0);
    }
  }

  @screen 2xl {
    .sku-name-block {
      padding-top: var(--sku-name-block-2xl-pt, theme('padding.8'));
    }

    .name-info-wrapper {
      gap: var(--sku-name-wrapper-lg-gap, theme('gap.8'));
    }
  }

  @media screen and (min-width: 768px) and (max-height: 768px) {
    .name-info-wrapper > header {
      @apply text-3xl;
    }
  }

  @media screen and (max-width: 768px) {
    .custom-content-buttons {
      padding: var(--padding-sku-buttons-sm, 0);
      margin-bottom: var(--margin-bottom-sku-buttons-sm, 0);
    }
  }

  @screen md {
    .custom-content-buttons {
      padding: var(--padding-sku-buttons-md, 0);
      margin-bottom: var(--margin-bottom-sku-buttons-md, 0);
    }
  }

  @screen lg {
    .custom-content-buttons {
      padding: var(--padding-sku-buttons-lg, 0);
      margin-bottom: var(--margin-bottom-sku-buttons-lg, 0);
    }
  }
</style>
