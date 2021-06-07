<script lang="ts">
  import Rarity from '$lib/rarity/Rarity.svelte';
  import type { Sku } from './types';
  import TimeDifference from './TimeDifference.svelte';
  import IntersectionObserver from 'svelte-intersection-observer';

  export let item: Sku;

  $: isUnique = item?.totalSupply === 1;

  let videoElement: HTMLVideoElement;
</script>

<div class="flex flex-col">
  <div class="w-full h-72 card-img relative">
    {#if item.type === 'Video' || item.graphicUrl.endsWith('mov') || item.graphicUrl.endsWith('mp4')}
      <IntersectionObserver
        element={videoElement}
        once
        rootMargin={'150px'}
        on:intersect={(e) => {
          videoElement.src = videoElement.dataset.src;
        }}
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
      <div
        class="w-8 h-8 bg-white absolute top-6 right-4 rounded-full flex shadow-md hover:opacity-60 p-1.5"
      >
        <img class="" src="/redeem.png" alt="marked" />
      </div>
    {/if}
  </div>
  <div
    class="px-5 pt-3 pb-10 bottom-half-container rounded-b-3xl flex flex-col flex-grow justify-between"
  >
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
      <span class="card-series">{item.series.name}</span>
      <div class=" flex items-end">
        {#if isUnique}
          <div class="flex items-center">
            <img class="w-5 h-5 mr-1 " src="/fire.png" alt="fire" loading="lazy" />
            <span class="card-uniqueitem">Unique item!</span>
          </div>
        {:else}
          <span class="card-serial-number">{item.totalSupply}</span>
          <span class="card-serial ml-1">total</span>
        {/if}
      </div>
    </div>
  </div>
  <div
    class="flex justify-between card-status rounded-full py-3 transform -translate-y-2/4 mx-3 whitespace-nowrap px-6 items-center"
  >
    <span class="card-status-text">Upcoming in:</span>
    <span class="text-2xl card-time-color font-light"
      ><TimeDifference date={item.startDate || new Date(2022)} /></span
    >
  </div>
</div>

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
  .card-uniqueitem {
    color: #ff0000;
  }
  .card-serial {
    color: #9e9e9e;
  }
  .card-serial-number {
    color: var(--card-serial-number-color, #000000);
  }
  .card-status {
    background: var(--card-status-color, #000000);
  }
  .card-status-text {
    color: #c4c4c4;
  }
  .card-time-color {
    color: #ffffff;
  }
</style>
