<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import Wave from './assets/Wave.svg';

  export let skuData: Sku;
</script>

<div class="relative w-full h-full pb-20 sm:pb-0 sm:mb-0 pt-0 md:pt-8 lg:pt-26">
  <div class="container h-full sm:h-screen flex flex-col gap-10 max-w-6xl sm:grid sm:grid-cols-2 px-6">
    <div class="z-1 flex flex-col gap-8 justify-center items-start">
      <div class="text-4xl leading-none sm:text-6xl text-left">Emilia’s SameYou <br /> charity NFT</div>
      <div class="font-light text-base mt-4 text-left">
        Featuring a series of NFT’s illustrating the experiential journey of healing from traumatic brain injury to
        recovery.
      </div>
      <div class="font-semibold text-lg mb-10 text-left" style="color:#7852fd">
        Your purchase of NFTs from this collection will benefit SameYou’s core mission of helping survivors while
        raising awareness about Acquired Brain Injury (ABI).
      </div>
      <Button variant="brand" on:click={() => goto('collection/EmiliaClarke-SameYou')} class="mb-8"
        >View the Collection</Button
      >
    </div>
    <div class="flex items-center justify-center">
      <div class="center-card relative z-1 h-auto rounded-md max-w-sm top-12">
        <SkuItem sku={skuData} --sku-item-bg-color="#ffd54e" --sku-item-border-color="#ffd54e" />
      </div>
    </div>
    <img
      src={Wave}
      alt="curved purple line"
      style="margin-bottom:-7em"
      class="hidden 2xl:block object-cover absolute bottom-0 z-0 right-0 w-full"
    />
    <img
      src={Wave}
      alt="curved purple line"
      style="margin-bottom:-2.7em"
      class="hidden sm:block 2xl:hidden object-cover absolute bottom-0 z-0 right-0 w-full"
    />
    <img
      src={Wave}
      alt="curved purple line"
      style="margin-bottom:-1px; object-position: 80%"
      class="sm:hidden object-cover absolute bottom-0 z-0 right-0 w-full h-1/2"
    />
  </div>
</div>

<style lang="postcss">
  .center-card {
    background-color: #ffd54e;
    box-shadow: 20px 20px rgba(0, 0, 0, 0.1);
  }
</style>
