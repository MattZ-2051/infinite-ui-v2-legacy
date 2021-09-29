<script lang="ts">
  import { mdiPlus } from '@mdi/js';
  import { media } from '$lib/media-query.store';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  // import SkuItem from '$project/sku-item/SkuItem.svelte';
  import purpleLineImg from './assets/purple-curvy-line.png';
  import emiliaPhoto from './assets/emilia-photo.png';
  import leftGreyLineImg from './assets/left-light-grey-line.png';
  import rightGreyLineImg from './assets/right-light-grey-line.png';
  import EmiliaAbout from './EmiliaAbout.svelte';
  // export let skuLandingHeadData;
  // const photos = Object.fromEntries(
  //   profile.profilePhotoUrls.map(({ position, url }) => {
  //     return [position, { url }];
  //   })
  // );
  // const textFields = Object.fromEntries(
  //   profile.profileTextFields.map(({ position, text }) => {
  //     return [position, text];
  //   })
  // );
  // const sku = skuLandingHeadData();
</script>

<ThemeContext id="issuer">
  <div class=" h-full relative sm:h-screen bg-black">
    <div class="flex items-center h-full sm:h-3/4 container">
      <div class="w-full sm:w-1/2 z-1">
        <div class="text-4xl font-semibold sm:text-7xl" style="color: #FFD54E;">Emilia Clarke</div>
        <div class="text-4xl font-semibold pt-4 sm:text-7xl" style="color: #FFD54E;">first NFT for good!</div>
        <div class="text-xl sm:text-2xl text-white font-normal pt-8">
          We are proud to present the Emilia's first NFT for good <br /> from SEVA.LOVE in association with SAME YOU for
          brain <br />injury recovery.
        </div>
        <div class="text-white-opacity-50 pt-4 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor nibh at mi ullamcorper, in porta magna
          accumsan. Suspendisse potenti.
        </div>
        <button class="bg-white py-4 px-10 text-xl font-semibold flex items-center rounded-full mt-8" type="button">
          View Collection (5)
          <Icon path={mdiPlus} color="black" size="1.2" />
        </button>
        {#if !$media.sm}
          <div class="center-card relative flex justify-center mt-8">
            <!-- <SkuItem {sku} /> -->
          </div>
        {/if}
      </div>
      {#if $media.sm}
        <div class="center-card absolute mx-6 md:mx-12 mt-20">
          <!-- <SkuItem {sku} /> -->
        </div>
      {/if}
    </div>
    {#if !$media.sm}
      <img src={emiliaPhoto} alt="" class="w-full mt-8 bottom-0" />
    {/if}
    <div class="bg-white h-1/6 sm:h-1/4 absolute w-full m-0" />
    <img src={purpleLineImg} alt="" class="absolute w-full -bottom-12 z-20" />
    {#if $media.sm}
      <img src={leftGreyLineImg} alt="" class="absolute top-0 z-0" />
      <img src={rightGreyLineImg} alt="" class="absolute top-0 z-0 right-0" />
      <img src={emiliaPhoto} alt="" class=" absolute bottom-60 z-10 right-0 w-2/5" />
    {/if}
  </div>
  <div class="container">
    <slot />
  </div>
  <EmiliaAbout />
  <div class="h-12" />
</ThemeContext>

<style lang="postcss">
  .center-card {
    background-color: #ffd54e;
    display: flex;
    border-radius: 6px;
    justify-content: center;
    z-index: 50;
    right: 23%;
    box-shadow: 20px 20px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 640px) {
    .center-card {
      right: 0;
    }
  }
</style>
