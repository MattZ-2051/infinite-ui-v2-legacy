<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import Button from '$lib/components/Button.svelte';
  import { media } from '$lib/media-query.store';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import Wave from './assets/Wave.svg';

  export let skuData: Sku;
</script>

<div class="relative w-full h-full pb-40 sm:pb-0 sm:mb-0">
  <div class="container h-full sm:h-screen flex flex-col gap-10 max-w-5xl sm:grid sm:grid-cols-2 px-6">
    <div class="z-1 flex flex-col gap-8 justify-center items-start">
      <div class="text-4xl leading-none sm:text-6xl text-left">Emilia's first <br /> NFT for good</div>
      <div class="font-light text-base mt-8 text-left">
        Emilia Clarke’s charity SameYou and Seva.Love are releasing a series of NFT’s illustrating the experiential
        journey of healing from traumatic brain injury to recovery.
      </div>
      <div class="font-light text-base mt-8 text-left">
        Your purchase of this unrepeatable collection will have an outsized impact on SameYou’s core mission of helping
        survivors in addition to educating and raising awareness about Acquired Brain Injury.
      </div>
      <!-- <div class="font-light text-base mt-8 text-left" style="color: #7852FD">
        We believe in the effectiveness of compassion, {#if $media.sm}<br /> {/if}kindness and listening
      </div> -->
      <!-- <button class="bg-black rounded-3xl text-white w-44 mt-10 h-12">Learn more</button> -->
      <Button
        --button-padding="12px 48px"
        --button-border-radius="999px"
        --button-brand-bg-color="rgba(0,0,0)"
        --button-brand-color="rgba(255,255,255)"
        --button-brand-border-color-hover="#7852FD"
        --button-brand-border-color="transparent"
        --button-brand-bg-color-hover="#7852FD"
        --button-brand-color-hover="rgba(255,255,255)"
        animate={false}
        variant="brand"
        class="mt-8"
        type="submit">Learn more</Button
      >
    </div>
    <div class="flex items-center justify-center pl-1">
      {#if !$media.md}
        <div class="center-card relative z-1 mt-10 h-auto rounded-md">
          <SkuItem sku={skuData} --sku-item-bg-color="#FFD54E" />
        </div>
      {/if}
      {#if $media.md}
        <div class="center-card relative z-1 h-auto rounded-md">
          <SkuItem sku={skuData} --sku-item-bg-color="#FFD54E" />
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
      style="margin-bottom:-2.7em"
      class="hidden sm:block 2xl:hidden object-cover absolute bottom-0 z-0 right-0 w-full "
    />
    <img
      src={Wave}
      alt="curved purple line"
      style="margin-bottom:-1px; object-position: 80%"
      class=" sm:hidden object-cover absolute bottom-0 z-0 right-0 w-full h-1/2 "
    />
  </div>
</div>

<style lang="postcss">
  .center-card {
    background-color: #ffd54e;
    box-shadow: 20px 20px rgba(0, 0, 0, 0.1);
  }
</style>
