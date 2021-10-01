<script>
  import Button from '$lib/components/Button.svelte';
  import SkuItem from '$project/sku-item/SkuItem.svelte';
  import LineImage from '../images/line-image.svg';
  import LineImageMobile from '../images/line-image-mobile.svg';
  import Bubbles from '../images/bubbles-landing.svg';
  import LeftCard from './LeftCard.svelte';
  import { skuLandingHeadData } from '../utils/landingData';

  const skuData = skuLandingHeadData();
</script>

<div class="container-custom">
  <div class="container text-center max-w-7xl pt-12 px-6">
    <div class="text-4xl md:text-6xl" style="color:#ffd54e">
      <p>The world’s first</p>
      <p>NFT goodness exchange.</p>
      <div class="text-xl text-white text-center opacity-90 mt-10">
        <p>SEVA.LOVE is a one of a kind goodness exchange which will empower partners to create</p>
        <p>their unique NFT collectibles and exchange them in return of goodness for the world.</p>
      </div>
    </div>
  </div>

  <div class="grid grid-rows-1 md:grid-rows-2 mb-96">
    <div class="container flex flex-col items-center md:items-start justify-center md:flex-row max-w-7xl px-6">
      <LeftCard class="md:flex flex-col order-2 md:w-1/3 md:order-1" />
      <div class="md:h-0 order-1 md:order-2">
        <div
          class="rounded-md grid grid-cols-1 md:mx-16 mt-20 md:relative  items-center"
          style="background-color:#ffd54e; box-shadow: 20px 20px #442aa0; z-index: 2;"
        >
          <SkuItem sku={skuData} />
        </div>
      </div>
      <div class="text-left mt-16 md:mt-32 md:w-1/3 order-3 md:order-3">
        <p class="title-card text-white text-xl md:text-3xl font-medium">Same You headline</p>
        <p class="text-base text-white opacity-90 mt-2.5 font-medium">
          SameYou is working to develop better recovery treatment for survivors of brain injury and stroke.
        </p>
        <p class="text-base text-white opacity-90 mt-2.5 font-medium">
          We work with global partners to find and test new holistic treatments and play our part in making these
          available to survivors.
        </p>
        <Button
          animate={false}
          --button-padding="9px 32px"
          --button-border-radius="999px"
          --button-brand-bg-color="rgba(255,255,255)"
          --button-brand-color="rgba(0,0,0)"
          --button-brand-border-color-hover="#FFD54E"
          --button-brand-border-color="transparent"
          --button-brand-bg-color-hover="#FFD54E"
          variant="brand"
          class="mt-6">Learn More</Button
        >
      </div>
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
