<script lang="ts">
  import type { SkuCollection } from '$lib/features/collections/types';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import { loadSkuCollectionFeaturedFx, skuCollectionFeatured } from '$lib/features/collections/collections.store';
  import Button from '$lib/components/Button.svelte';

  export let featuredSkuId: SkuCollection['featuredSkuId'];

  loadSkuCollectionFeaturedFx({ id: featuredSkuId });
</script>

<section class="mx-auto container max-w-7xl">
  {#if $skuCollectionFeatured}
    <article
      class="featured-block md:shadow-[0_40px_80px_rgba(0, 0, 0, 0.3)] rounded-2xl relative flex flex-col md:flex-row"
    >
      <div class="my-auto md:mx-12 xl:mx-24 relative space-y-10 md:text-white basis-3/4">
        <h3 class="second-font text-base md:text-lg uppercase tracking-widest">
          Featured Nft<span class="block text-4xl md:text-5xl uppercase font-light mt-2"
            >{$skuCollectionFeatured.name}</span
          >
        </h3>
        <p class="md:max-w-xl leading-7 text-gray-700 md:text-white">
          {@html $skuCollectionFeatured.description}
        </p>
        <Button variant="outline-brand" class="h-14 w-64 hidden md:block">Explore</Button>
      </div>
      <div
        class="wrapper shadow-[0_4px_30px_rgba(0, 0, 0, 0.1)] relative max-w-md mx-auto md:max-w-sm md:mr-12 xl:mr-24 mt-10 md:-mt-24 mb-24 rounded-2xl"
      >
        <SkuItem sku={$skuCollectionFeatured} />
      </div>
    </article>
  {/if}
</section>

<style lang="postcss">
  @media screen(md) {
    .featured-block {
      background: linear-gradient(225deg, #181c20 0%, #363f45 100%);
    }
  }
</style>
