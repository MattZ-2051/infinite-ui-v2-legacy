<script lang="ts">
  import type { Sku } from './types';
  import IntersectionObserver from 'svelte-intersection-observer';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import Image from '$ui/image/Image.svelte';
  import ariaLogo from '$static/aria-logo-comp.png?w=300&format=avif;webp;png&metadata';

  export let item: Sku;

  let videoElement: HTMLVideoElement;

  let showFallbackImage = false;
  $: featuredImage = (item.nftPublicAssets?.length > 0 && item.nftPublicAssets[0].url) || '';
</script>

<a sveltekit:prefetch href={`/marketplace/${item._id}`} class="flex flex-col">
  <div class="w-full h-72 card-img relative">
    {#if featuredImage && (item.type === 'Video' || featuredImage.endsWith('mov') || featuredImage.endsWith('mp4'))}
      <IntersectionObserver
        element={videoElement}
        once
        rootMargin={'150px'}
        on:intersect={() => (videoElement.src = videoElement.dataset.src)}
      >
        <video
          bind:this={videoElement}
          data-src={featuredImage}
          playsinline
          autoplay
          loop
          muted
          class="w-full h-full object-cover"
        />
      </IntersectionObserver>
    {:else if featuredImage && !showFallbackImage}
      <img
        src={featuredImage}
        alt=""
        class="w-full h-full object-cover"
        on:error={() => (showFallbackImage = true)}
        loading="lazy"
      />
    {:else}
      <Image src={ariaLogo} alt="N/A" class="w-full h-full object-contain" />
    {/if}

    {#if item.redeemable}
      <div class="absolute top-6 right-4">
        <IconRedeem size="1.3" class="bg-white text-black rounded-full p-1.5 border" />
      </div>
    {/if}
  </div>
  <div class="px-5 pt-3 pb-10 bottom-half-container rounded-b-3xl flex flex-col flex-grow justify-between">
    <div>
      <div class="flex justify-between ">
        <span class=" card-name ">{item.issuerName}</span>
        <Rarity rarity={item.rarity} />
      </div>
      <div class="mt-5 mb-2">
        <span class=" text-3xl font-light card-title">{item.name}</span>
      </div>
    </div>
    <div class="flex justify-between mt-8 gap-1">
      <span class="card-series">{item.series?.name}</span>
      <div class=" flex items-end">
        <slot name="info" />
      </div>
    </div>
  </div>
  <slot name="status" />
</a>

<style>
  .bottom-half-container {
    background-color: var(--card-container-color, #ffffff);
    border: var(--bottom-border, 1px solid #ededed);
  }
  .card-name {
    color: var(--card-name-color, #9e9e9e);
  }
  .card-title {
    color: var(--card-title-color, #000000);
  }
  .card-series {
    color: var(--card-series-color, #000000);
  }
</style>
