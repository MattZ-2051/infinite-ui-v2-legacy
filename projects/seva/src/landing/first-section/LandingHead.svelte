<script lang="ts">
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
      <p>Seva.Love<br class="hidden lg:block" /> NFTs that catalyze change</p>
      <div class="text-xl text-white text-center opacity-90 mt-10">
        <p>
          Empowering communities focused on social and environmental impact causes <br class="hidden lg:block" /> through
          exclusive carbon negative Hedera NFT releases
        </p>
      </div>
    </div>
  </div>

  <div class="grid grid-rows-1 md:grid-rows-2 mb-10 md:mb-64">
    <div class="container flex flex-col items-center md:items-start justify-center md:flex-row max-w-7xl px-6">
      <ThemeContext id="landing-head-left-card">
        <div class="font-normal text-left md:text-right mt-16 md:mt-32 md:flex flex-col order-2 md:w-1/3 md:order-1">
          <p class="text-xl md:text-3xl font-medium">Emilia Clarke’s first NFT</p>
          <p class="text-base mt-2.5 font-medium hidden md:flex">
            Benefiting the SameYou charity, the series illustrates the experiential journey of healing from traumatic
            brain injury to recovery.
          </p>
          <p class="text-base opacity-90 mt-2.5 font-medium">
            Your purchase of NFTs from this collection will benefit SameYou’s core mission of helping survivors while
            raising awareness about Acquired Brain Injury.
          </p>
          <p class="text-base opacity-90 mt-2.5 font-medium">
            Each NFT offers unique ownership benefits, with two releases redeemable for physical items
          </p>
          <p class="text-base mt-2.5 font-medium" style="color:#ffd54e">
            1 of 1 Same You Resilience: redeemable for the physical Atelier Versace dress Emilia debuted on the red
            carpet at the 2016 68th Emmy Awards
          </p>
          <p class="text-base mt-2.5 font-medium" style="color:#ffd54e">
            1 of 10 SameYou Rapture Series: redeemable for a signed print
          </p>
          <p class="text-base mt-2.5 font-medium" style="color:#ffd54e">
            1 of 10,000: SameYou Neuron Series: offers unique benefits to holders
          </p>
        </div>
      </ThemeContext>
      <div class="md:h-0 order-1 md:order-2">
        <div
          class="rounded-md grid grid-cols-1 md:mx-16 mt-20 md:relative items-center max-w-sm sm:w-96 z-10"
          style="box-shadow: 20px 20px #442aa0;"
        >
          <SkuItem {sku} --sku-item-bg-color="#ffd54e" --sku-item-border-color="#ffd54e" />
        </div>
      </div>
      <div class="text-left mt-16 md:mt-32 md:w-1/3 order-3 md:order-3">
        <p class="title-card text-white text-xl md:text-3xl font-medium">SameYou for Brain Injury Recovery</p>
        <p class="text-base text-white opacity-90 mt-2.5 font-medium">
          SameYou is working to develop better recovery treatments for survivors of brain injury and stroke.
        </p>
        <p class="text-base text-white opacity-90 mt-2.5 font-medium">
          Almost 1 in 3 people will face an Acquired Brain Injury (ABI) at some point in their life. Nearly half feel
          abandoned when they leave hospital due to the lack of rehab therapies.
        </p>
        <p class="text-base text-white opacity-90 mt-2.5 font-medium">
          We work with global partners to find and test new holistic treatments and play our part in making these
          available to survivors.
        </p>
        <Button on:click={() => goto('https://www.sameyou.org')} variant="brand" class="mt-6">Learn More</Button>
      </div>
    </div>
    <div>
      <div class="image-line-container w-full hidden md:block relative top-0 z-1" style="height:510px">
        <img src={LineImage} alt="line" width="100%" />
        <div class="bubble-container absolute top-60 right-80">
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
    background-position-y: -12.5em;
  }
</style>
