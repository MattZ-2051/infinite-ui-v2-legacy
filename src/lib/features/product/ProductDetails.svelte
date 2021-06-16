<script lang="ts">
  import { mdiChevronLeft } from '@mdi/js';
  import type { Product } from '$lib/sku-item/types';
  import Icon from '$ui/icon/Icon.svelte';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import Gallery from '$ui/gallery/Gallery.svelte';

  export let product: Product;
</script>

<div class="flex flex-col bg-white">
  <Gallery
    featuredItem={product.sku.graphicUrl}
    items={[product.sku.graphicUrl, ...product.sku.imageUrls]}
  />
  <div class="px-6 lg:px-8 flex-grow">
    <div class="flex flex-col py-7 border-b border-gray-200 text-black gap-4">
      <div class="flex flex-wrap justify-between text-2xl">
        <span class="text-gray-400">{product.sku.issuerName}</span>
        <Rarity rarity={product.sku.rarity} />
      </div>
      <span class="text-5xl lg:mb-12">{product.sku.name}</span>
      <span class="text-lg">{product.sku.series?.name}</span>
      <div class="flex gap-2">
        {#if product.sku.supplyType === 'fixed'}
          <span class="text-gray-400">1 of {product.totalSupply}</span>
        {:else if product.sku.supplyType === 'variable'}
          <span>{product.circulatingSupply} Released</span>
          <div class="border border-black rounded-xl px-2 text-center">LE</div>
          <a href="/marketplace">(See All)</a>
        {/if}
      </div>
      <div class="flex gap-3 text-sm text-gray-400 font-black">
        <div class="font-normal">
          Created by
          <a href="/account" class="text-black ml-1 font-black">
            @{product.sku.issuer.username}
          </a>
        </div>
        <span>/</span>
        <span class="text-black font-black">Be notified</span>
        <div class="toggle relative self-end w-8 h-4 bg-gray-400 rounded-lg cursor-pointer" />
      </div>
    </div>
    <a class="flex-grow flex justify-items-start my-5 text-lg" href="/marketplace">
      <Icon path={mdiChevronLeft} size="1.125" />
      <span>View release details</span>
    </a>
  </div>
</div>

<style>
  .toggle::before {
    content: '';
    @apply absolute;
    @apply top-1;
    @apply left-1;
    @apply w-2;
    @apply h-2;
    @apply rounded-full;
    @apply bg-white;
  }
</style>
