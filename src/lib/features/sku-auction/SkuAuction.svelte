<script lang="ts">
  import routes from '$project/routes';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import SkuAuctionTabs from './SkuAuctionTabs.svelte';
  import SkuAuctionInfo from './SkuAuctionInfo.svelte';
  import SkuAuctionStatus from './status/SkuAuctionStatus.svelte';
  import { skuAuction } from './sku-auction.store';
</script>

<StickyColumn reverse>
  <div slot="sticky-content" class="sticky-content">
    <Gallery items={$skuAuction.nftPublicAssets} />
  </div>
  <div class="flex flex-col md:px-0" slot="onscreen-content" style="min-height: calc(100vh - var(--header-height));">
    <div class="mx-4 md:pl-4 mt-8 md:mt-10">
      <div class="flex md:flex-wrap items-center text-2xl sm:text-3xl md:text-4xl font-medium justify-between gap-6">
        <div class="flex items-center overflow-hidden">
          <a
            sveltekit:prefetch
            href={routes.sku($skuAuction._id)}
            class="text-gradient-primary truncate md:overflow-visible md:whitespace-pre-wrap">{$skuAuction.name}</a
          >
        </div>
      </div>
      <div class="mt-6">
        <SkuAuctionInfo sku={$skuAuction} />
      </div>
    </div>

    <div class="mt-12 md:mx-0 flex flex-col flex-grow">
      <SkuAuctionTabs sku={$skuAuction} />
    </div>

    <SkuAuctionStatus
      class="sticky md:w-full left-0 bottom-0 md:pb-4 lg:pb-12 md:px-4 lg:px-12"
      style="background-color: var(--product-tabs-bg);"
      sku={$skuAuction}
    />
  </div>
</StickyColumn>

<style lang="postcss">
  .sticky-content {
    height: 60vh;
  }
  @screen md {
    .sticky-content {
      height: inherit;
    }
  }
</style>
