<script lang="ts">
  import type { SkuCollection } from '$lib/features/collections/types';
  import type { FileAsset } from '$ui/file/types';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import routes from '$project/routes';
  import bucketAssets from '$project/assets/aws-bucket-assets';
  import { goto } from '$app/navigation';
  import { loadSkuCollectionFeaturedFx, skuCollectionFeatured } from '$lib/features/collections/collections.store';
  import Button from '$lib/components/Button.svelte';

  export let featuredSkuId: SkuCollection['featuredSkuId'];
  export let collectionName = '';
  export let isPhase3 = false;

  loadSkuCollectionFeaturedFx({ id: featuredSkuId });

  const skuItemFilePreview = { url: bucketAssets.collection.featured } as FileAsset;
</script>

<section class="mx-auto md:px-6 max-w-7xl">
  {#if $skuCollectionFeatured}
    <article
      class="featured-block md:shadow-[0_40px_80px_rgba(0, 0, 0, 0.3)] rounded-2xl relative flex flex-col md:flex-row backdrop-opacity-100"
    >
      <div class="mt-20 md:mb-20 mx-6 md:mx-12 xl:mx-24 relative space-y-10 md:text-white basis-3/4">
        <h3 class="second-font text-base md:text-lg tracking-widest">
          <span class="uppercase"
            >{collectionName} {collectionName.toLowerCase().includes('collection') ? '' : 'collection'}</span
          >
          <span class="block text-[32px] text-4xl md:text-5xl font-light mt-2">THE NFTs</span>
        </h3>
        <p class="md:max-w-xl leading-7 text-gray-700 font-light md:text-white">
          {@html $skuCollectionFeatured.description}
        </p>
        <Button
          variant="outline-brand"
          class={isPhase3 ? 'h-16 w-64 hidden md:block' : 'hidden'}
          on:click={() => goto(routes.sku($skuCollectionFeatured._id))}>Buy Now</Button
        >
      </div>
      <div
        class="wrapper shadow-[0_4px_30px_rgba(0, 0, 0, 0.1)] relative max-w-md px-6 md:px-0 mx-auto md:max-w-sm md:mr-8 lg:mr-12 xl:mr-24 mt-10 md:-mt-24 mb-24 rounded-2xl"
      >
        <SkuItem sku={{ ...$skuCollectionFeatured, nftPublicAssets: [skuItemFilePreview] }} {isPhase3} />
      </div>
    </article>
  {/if}
</section>

<style lang="postcss">
  .featured-block {
    background: linear-gradient(184.75deg, rgba(54, 63, 69, 0.5) 41.25%, rgba(0, 0, 0, 0.5) 85.36%);
  }

  @media screen(md) {
    .featured-block {
      background: linear-gradient(253.57deg, rgba(0, 0, 0, 0.5) 6.96%, rgba(54, 63, 69, 0.5) 77.23%);
    }
  }
</style>
