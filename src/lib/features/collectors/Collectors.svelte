<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import routes from '$project/routes';
  import StickyColumn from '$lib/layout/StickyColumn.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import CollectorsSummary from './CollectorsSummary.svelte';

  export let sku: Sku;
  export let collectors: CollectorProduct[];
  export let page: number;
  export let forSale: boolean;
  export let search: string;
  export let total: number;
  export let perPage: number;
</script>

<StickyColumn reverse>
  <div slot="sticky-content" class="sticky-content">
    <Gallery items={sku.nftPublicAssets} />
  </div>
  <div class="mr-4 ml-4 md:ml-0" slot="onscreen-content">
    <div class="md:pl-8 mt-8 md:mt-10">
      <div class="flex flex-wrap gap-2 md:gap-0 md:items-center text-3xl md:text-4xl font-medium">
        <a sveltekit:prefetch href={routes.sku(sku._id)} class="text-gradient-primary">{sku.name}</a>
        <div class="flex items-center">
          <span class="mx-3 text-gray-300">/</span>
          <span class="text-gradient-primary">Collectors</span>
        </div>
      </div>

      <!-- <div class="mt-6">
        <ProductInfo product={$product} />
      </div> -->
    </div>

    <div class="mt-20 md:pl-8">
      <CollectorsSummary {sku} {collectors} {page} {forSale} {search} {total} {perPage} />
    </div>
  </div>
</StickyColumn>

<style lang="postcss">
  .sticky-content {
    height: 60vh;
  }
  @screen md {
    .sticky-content {
      height: 100%;
    }
  }
</style>
