<script lang="ts">
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { media } from '$lib/media-query.store';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import purpleLineImg from './assets/purple-curvy-line.png';
  import emiliaPhoto from './assets/emilia-photo.png';
  import leftGreyLineImg from './assets/left-light-grey-line.png';
  import rightGreyLineImg from './assets/right-light-grey-line.png';
  // export let profile: Profile;
  // TODO (Matt): This will be the prop the accepts the sku data
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
  export let sku;

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
          Emilia Clarke's
        </div>
        <div class="text-5xl font-medium pt-4 sm:text-7xl text-center lg:text-left" style="color: #FFD54E;">
          SameYou NFT collection
        </div>
        <div class="text-xl sm:text-2xl text-white font-normal pt-8 text-center lg:text-left">
          Benefitting the SameYou non-profit focused on treatment for brain injury and stroke recovery.
        </div>
        <div class="text-white-opacity-50 pt-4 font-light text-center lg:text-left">
          Featuring an experiential poetic mindscape of brain injury healing with spoken word by Emilia Clarke,
          physically redeemable items, and unique ownership benefits.
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
      <div class="relative">
        {#if !$media.lg}
          <div class="flex justify-center">
            <div class="center-card right-1/4 rounded-md flex justify-center w-1/4">
              <SkuItem {sku} --sku-item-bg-color="#ffd54e" />
            </div>
          </div>
        {/if}
      </div>
      {#if $media.lg}
        <div class="center-card absolute z-30 right-1/4 rounded-md flex w-1/4 justify-center">
          <SkuItem {sku} --sku-item-bg-color="#ffd54e" />
        </div>
      {/if}
      {#if $media.lg}
        <img src={emiliaPhoto} alt="" class="absolute z-10 -bottom-1/4 right-0 w-2/5" />
      {/if}
    </div>
    {#if !$media.lg}
      <img src={emiliaPhoto} alt="" class="w-full mt-8 bottom-0 " />
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
