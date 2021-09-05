<script lang="ts">
  import type { Sku, CollectorProduct } from '$lib/sku-item/types';
  import routes from '$lib/routes';
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
  <Gallery slot="sticky-content" items={sku.nftPublicAssets} />
  <div slot="onscreen-content">
    <div class="pl-8 mt-8 md:mt-10">
      <div class="flex items-center text-4xl font-medium">
        <a sveltekit:prefetch href={routes.sku(sku._id)} class="text-gradient-primary">{sku.name}</a>
        <span class="mx-3 text-white-opacity-30">/</span>
        <span class="text-gradient-primary">Collectors</span>
      </div>

      <!-- <div class="mt-6">
        <ProductInfo product={$product} />
      </div> -->
    </div>

    <div class="mt-12 pl-8">
      <CollectorsSummary {sku} {collectors} {page} {forSale} {search} {total} {perPage} />
    </div>
  </div>
</StickyColumn>
