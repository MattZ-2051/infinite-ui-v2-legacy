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

<div class="container-custom -mb-24 sm:mb-0">
  <div class="container text-center max-w-7xl pt-12 px-6">
    <div class="text-4xl lg:text-6xl" style="color:#ffd54e">
      <p>Seva.Love<br class="hidden lg:block" /> NFTs that catalyze change</p>
      <div class="text-xl text-white text-center opacity-90 mt-10">
        <p>
          Empowering communities focused on social and environmental impact causes <br class="hidden lg:block" /> through
          exclusive carbon negative Hedera NFT releases
        </p>
      </div>
    </div>
  </div>

  <div class="grid grid-rows-1 lg:grid-rows-2 mb-4 lg:mb-32">
    <div class="container flex flex-col items-center lg:items-start justify-center lg:flex-row max-w-7xl px-6">
      <ThemeContext id="landing-head-left-card">
        <div class="font-normal text-left lg:text-right mt-16 lg:mt-32 lg:flex flex-col order-2 lg:w-1/3 lg:order-1">
          <p class="text-xl lg:text-3xl font-medium">Emilia Clarke’s first NFT</p>
          <p class="text-base mt-2.5 font-medium hidden lg:flex">
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
      <div class="lg:h-0 order-1 lg:order-2">
        <div
          class="rounded-lg grid grid-cols-1 lg:mx-16 mt-20 lg:relative items-center max-w-sm sm:w-96 z-10"
          style="box-shadow: 20px 20px #442aa0;"
        >
          <SkuItem {sku} --sku-item-bg-color="#ffd54e" --sku-item-border-color="#ffd54e" />
        </div>
      </div>
      <div class="text-left mt-16 lg:mt-32 lg:w-1/3 order-3 lg:order-3">
        <p class="title-card text-white text-xl lg:text-3xl font-medium">SameYou for Brain Injury Recovery</p>
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
    <div class="">
      <div class="image-line-container w-full hidden sm:block relative top-0 z-1" style="height:31rem">
        <img src={LineImage} alt="line" class="w-full relative sm:top-32 md:top-20 lg:top-0" />
        <div class="bubble-container absolute lg:top-60 2xl:right-64 top-11 right-7 lg:right-40">
          <img src={Bubbles} alt="bubble-images" class="w-full" />
        </div>
      </div>
      <div class="image-line-container-mobile w-full block sm:hidden relative z-1 -top-7">
        <img src={LineImageMobile} alt="line" class="w-full relative -top-4" />
        <div class="bubble-container absolute top-6 right-7 w-1/3">
          <img src={Bubbles} alt="bubble-images" class="w-full" />
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
