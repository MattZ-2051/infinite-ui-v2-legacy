<script lang="ts">
  import type { Sku } from '$lib/sku-item/types';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { media } from '$lib/media-query.store';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import purpleLineImg from './assets/purple-curvy-line.png';
  import leftGreyLineImg from './assets/left-light-grey-line.png';
  import rightGreyLineImg from './assets/right-light-grey-line.png';

  export let sku: Sku;

  export let title1: string;
  export let title2: string;
  export let title3: string;
  export let photo: string;

  const handleScrollToCollection = () => {
    const collection = document.querySelector('#collection');
    collection.scrollIntoView({ behavior: 'smooth' });
  };
</script>

<ThemeContext id="issuer">
  <div class="w-full bg-black relative h-full mb-64">
    <div class="lg:grid lg:grid-cols-2 items-center container relative px-6 mt-8 lg:mt-20">
      <div class="z-30 w-full lg:w-11/12 ">
        <div class="text-5xl font-medium sm:text-7xl text-center lg:text-left" style="color: #FFD54E;">
          {title1}
        </div>
        <div class="text-xl sm:text-2xl text-white font-normal pt-8 text-center lg:text-left">
          {title2}
        </div>
        <div class="text-white-opacity-50 pt-4 font-light text-center lg:text-left">
          {title3}
        </div>
        <div class=" mt-8 mb-12 flex items-center justify-center lg:justify-start w-full">
          <button
            type="button"
            class="collection-button hover:cursor-pointer hover:text-white py-4 px-10 bg-white text-black text-base sm:text-lg font-semibold rounded-full flex"
            on:click={() => handleScrollToCollection()}
          >
            View Collection</button
          >
        </div>
      </div>
      {#if sku}
        <div class="relative">
          {#if !$media.lg}
            <div class="flex justify-center">
              <div class="center-card right-1/4 rounded-md flex justify-center max-w-sm">
                <SkuItem {sku} --sku-item-bg-color="#ffd54e" />
              </div>
            </div>
          {/if}
        </div>
        {#if $media.lg}
          <div class="center-card absolute z-30 right-1/4 rounded-md flex max-w-sm justify-center">
            <SkuItem {sku} --sku-item-bg-color="#ffd54e" />
          </div>
        {/if}
      {/if}
      {#if $media.lg}
        <img src={photo} alt="" class="absolute z-10 -bottom-1/4 right-0 w-2/5" />
      {/if}
    </div>
    {#if !$media.lg}
      <img src={photo} alt="" class="w-full mt-8 bottom-0 " />
    {/if}
    {#if !$media.lg}
      <img src={purpleLineImg} alt="" class="absolute w-full purple-line z-20" />
    {/if}
    {#if $media.lg}
      <img src={leftGreyLineImg} alt="" class="absolute top-0 z-0 w-full h-full" />
      <img src={rightGreyLineImg} alt="" class="absolute top-0 z-0 right-0 w-full h-full" />
      <img src={purpleLineImg} alt="" class="absolute w-full -bottom-3/4 top-1/2 z-20 h-full" />
    {/if}
  </div>
</ThemeContext>

<style lang="postcss">
  .center-card {
    background-color: #ffd54e;
    box-shadow: 20px 20px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 1350px) {
    .center-card {
      right: 20%;
    }
  }
  @media (max-width: 1100px) {
    .center-card {
      right: 15%;
    }
  }
  .purple-line {
    bottom: -85%;
  }
  @media (max-width: 1300px) {
    .purple-line {
      bottom: -70%;
    }
  }
  @media (max-width: 899px) {
    .purple-line {
      bottom: -5%;
    }
  }

  .collection-button:hover {
    background: rgb(87, 57, 193);
  }
</style>
