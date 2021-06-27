<script lang="ts">
  import type { Sku } from './types';
  import IntersectionObserver from 'svelte-intersection-observer';
  import Rarity from '$lib/rarity/Rarity.svelte';

  export let item: Sku;

  let videoElement: HTMLVideoElement;
</script>

<a sveltekit:prefetch href={`/marketplace/${item._id}`} class="flex flex-col">
  <div class="w-full h-72 card-img relative">
    {#if item.type === 'Video' || item.graphicUrl.endsWith('mov') || item.graphicUrl.endsWith('mp4')}
      <IntersectionObserver
        element={videoElement}
        once
        rootMargin={'150px'}
        on:intersect={() => (videoElement.src = videoElement.dataset.src)}
      >
        <video
          bind:this={videoElement}
          data-src={item.graphicUrl}
          playsinline
          autoplay
          loop
          muted
          style="height: 100%; width: 100%; object-fit: cover;"
        />
      </IntersectionObserver>
    {:else}
      <img src={item.graphicUrl} alt="" style="height: 100%; width: 100%; object-fit: cover;" />
    {/if}

    {#if item.redeemable}
      <div class="w-8 h-8 bg-white absolute top-6 right-4 rounded-full flex shadow-md hover:opacity-60 p-1.5">
        <img class="" src="/redeem.png" alt="marked" />
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
