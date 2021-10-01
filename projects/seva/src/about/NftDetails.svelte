<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { media } from '$lib/media-query.store';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import Wave from './assets/Wave.svg';

  export let skuData: Sku;
</script>

<div class="relative w-full h-full pb-40 sm:pb-0 sm:mb-0">
  <div class="container h-full sm:h-screen flex flex-col max-w-5xl sm:grid sm:grid-cols-2">
    <div class="z-1 flex flex-col justify-center items-center sm:items-start">
      <div class="text-4xl leading-none sm:text-6xl text-center sm:text-left">Emilia's first <br /> NFT for good</div>
      <div class="font-light text-base mt-8 text-center sm:text-left">
        Experience Emilia Clarke’s NFT for brain injury recovery {#if $media.sm}<br /> {/if} in association with SAME YOU.
      </div>
      <div class="font-light text-base mt-8 text-center sm:text-left">
        We work with global partners to find and test new {#if $media.sm}<br /> {/if}holistic treatments and play our
        part in making these
        {#if $media.sm}<br /> {/if}available to survivors.
      </div>
      <div class="font-light text-base mt-8 text-center sm:text-left" style="color: #7852FD">
        We believe in the effectiveness of compassion, {#if $media.sm}<br /> {/if}kindness and listening
      </div>
      <button class="bg-black rounded-3xl text-white w-44 mt-10 h-12">Learn more</button>
    </div>
    <div class="flex items-center justify-center">
      {#if !$media.md}
        <div class="center-card relative z-1 mt-10 h-auto rounded-md">
          <SkuItem sku={skuData} />
        </div>
      {/if}
      {#if $media.md}
        <div class="center-card relative z-1 h-auto rounded-md">
          <SkuItem sku={skuData} />
        </div>
      {/if}
    </div>
  </div>
  <div class="w-full flex flex-col flex-end">
    <img
      src={Wave}
      alt="curved purple line"
      style="margin-bottom:-7em"
      class="hidden 2xl:block object-cover absolute bottom-0 z-0 right-0 w-full "
    />
    <img
      src={Wave}
      alt="curved purple line"
      style="margin-bottom:-2em"
      class="hidden md:block 2xl:hidden object-cover absolute bottom-0 z-0 right-0 w-full "
    />
    <img
      src={Wave}
      alt="curved purple line"
      style="margin-bottom:-1px; object-position: 80%"
      class=" md:hidden object-cover absolute bottom-0 z-0 right-0 w-full h-1/2 "
    />
  </div>
</div>

<style lang="postcss">
  .center-card {
    background-color: #ffd54e;
    box-shadow: 20px 20px rgba(0, 0, 0, 0.1);
  }
</style>
