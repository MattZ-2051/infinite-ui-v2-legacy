<script>
  import {
    MP_SUB_HEADLINE,
    MP_HEADLINE,
    MP_HERO_DESCRIPTION_1,
    MP_HERO_DESCRIPTION_2,
    MP_HERO_DESCRIPTION_2_HIGHLIGHT,
    MP_HERO_DESCRIPTION_3,
    MP_HERO_DESCRIPTION_3_HIGHLIGHT,
    MP_HERO_DESCRIPTION_3_1,
  } from '$project/variables';
  import Mint from '$project/mint/Mint.svelte';
  import hero from './hero.png';
</script>

<div class="w-screen flex flex-col lg:flex-row">
  <div
    class="flex flex-col w-full p-4 mb-16 lg:mb-0 lg:w-[60%] lg:pl-36 lg:pr-32 lg:pt-4 lg:h-screen items-start left-container"
  >
    <div class="text-primary text-sm font-semibold uppercase sub-headline">{MP_SUB_HEADLINE}</div>
    <span class="text-black font-bold font-lora-serif text-6xl lg:text-7xl mt-4 headline">{MP_HEADLINE}</span>
    <p class="font-normal mt-8 hero-description">{MP_HERO_DESCRIPTION_1}</p>
    <p class="mt-2 hero-description">
      {MP_HERO_DESCRIPTION_2}
      <span class="underline">{MP_HERO_DESCRIPTION_2_HIGHLIGHT}</span>
    </p>
    <p class="font-bold font-lora mt-4 hero-description-2">
      {MP_HERO_DESCRIPTION_3}
      <span class="hero-highlight">{MP_HERO_DESCRIPTION_3_HIGHLIGHT}</span>{MP_HERO_DESCRIPTION_3_1}
    </p>
    <Mint class="hidden lg:block" />
  </div>
  <div class="w-full lg:w-[40%] p-12 lg:p-0 lg:absolute lg:top-0 lg:right-0 lg:bottom-0 right-container">
    <div class="flex lg:h-screen items-center justify-center">
      <img src={hero} alt="hero" />
    </div>
  </div>
  <Mint class="lg:hidden" />
</div>

<style>
  .sub-headline {
    color: var(--mp-sub-headline-color);
  }

  .headline {
    color: var(--mp-headline-color);
  }

  .left-container {
    background-color: var(--mp-left-bg-color);
  }

  .right-container {
    background: var(--mp-right-bg-color);
  }

  .hero-description {
    color: var(--mp-hero-description-color);
  }

  .hero-description-2 {
    color: var(--mp-hero-secondary-text-color);
  }

  .hero-highlight {
    color: var(--mp-hero-highlight-color);
  }
</style>
