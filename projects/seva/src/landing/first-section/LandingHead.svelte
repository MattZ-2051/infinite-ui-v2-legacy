<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import LineImage from '../images/line-image.svg';
  import LineImageMobile from '../images/line-image-mobile.svg';
  import Bubbles from '../images/bubbles-landing.svg';

  export let sku;
</script>

<div class="container-custom">
  <div class="container text-center max-w-7xl pt-12 px-6">
    <div class="text-4xl md:text-6xl" style="color:#ffd54e">
      <p>The world’s first</p>
      <p>NFT goodness exchange.</p>
      <div class="text-xl text-center opacity-90 mt-10 text-white">
        <p>SEVA.LOVE is a one of a kind goodness exchange which will empower partners to create</p>
        <p>their unique NFT collectibles and exchange them in return of goodness for the world.</p>
      </div>
    </div>
  </div>

  <div class="grid grid-rows-1 md:grid-rows-2 mb-96">
    <div class="container flex flex-col items-center md:items-start justify-center md:flex-row max-w-7xl px-6">
      <ThemeContext id="landing-head-left-card">
        <div class="font-normal text-left md:text-right mt-16 md:mt-32 md:flex flex-col order-2 md:w-1/3 md:order-1">
          <p class="text-xl md:text-3xl font-medium">Emilia’s first NFT for good</p>
          <p class="text-base mt-2.5 font-medium hidden md:flex">
            Experience Emilia Clarke’s NFT for brain injury recovery in association with SAME YOU.
          </p>
          <p class="text-base opacity-90 mt-2.5 font-medium">
            We work with global partners to find and test new holistic treatments and play our part in making these
            available to survivors.
          </p>
          <p class="text-base mt-2.5 font-medium" style="color:#ffd54e">
            We believe in the effectiveness of <br />
            compassion, kindness and listening
          </p>
        </div>
      </ThemeContext>
      <div class="md:h-0 order-1 md:order-2">
        <div
          class="rounded-md grid grid-cols-1 md:mx-16 mt-20 md:relative items-center w-96 z-10"
          style="box-shadow: 20px 20px #442aa0;"
        >
          <SkuItem {sku} --sku-item-bg-color="#ffd54e" --sku-item-border-color="#ffd54e" />
        </div>
      </div>
      <ThemeContext id="landing-head-right-card">
        <div class="text-left mt-16 md:mt-32 md:w-1/3 order-3 md:order-3">
          <p class="title-card text-xl md:text-3xl font-medium">Same You headline</p>
          <p class="text-base opacity-90 mt-2.5 font-medium">
            SameYou is working to develop better recovery treatment for survivors of brain injury and stroke.
          </p>
          <p class="text-base opacity-90 mt-2.5 font-medium">
            We work with global partners to find and test new holistic treatments and play our part in making these
            available to survivors.
          </p>
          <Button on:click={() => goto('/about')} variant="brand" class="mt-6">Learn More</Button>
        </div>
      </ThemeContext>
    </div>
    <div>
      <div class="image-line-container w-full hidden md:block relative top-0 z-1" style="height:510px">
        <img src={LineImage} alt="line" width="100%" />
        <div class="bubble-container absolute top-80 right-60">
          <img src={Bubbles} alt="bubble-images" width="100%" />
        </div>
      </div>
      <div class="image-line-container-mobile w-full block md:hidden relative z-1 -top-7" style="height:510px">
        <img src={LineImageMobile} alt="line" width="100%" />
        <div class="bubble-container absolute top-11 right-7">
          <img src={Bubbles} alt="bubble-images" width="100%" />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container-custom {
    background-image: url('../images/back-min.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    background-position-y: top;
  }
</style>
