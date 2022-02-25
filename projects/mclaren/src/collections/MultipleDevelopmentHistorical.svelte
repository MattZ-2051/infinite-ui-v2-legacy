<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import mclarenDevelopmentCar from './images/mclaren-gt-development-img.png';
  import mclarenDevelopmentCarMobile from './images/mclaren-gt-development-img-mobile.png';
  import mclarenHistoricalCar from './images/mclaren-f1-historical-img.png';
  import mclarenHistoricalCarMobile from './images/mclaren-f1-historical-img-mobile.png';
</script>

<div class="lg:grid grid-cols-2 gap-x-12 md:container mb-20">
  <div class="text-white z-0 relative img-container mb-11">
    <img
      src={mclarenDevelopmentCar}
      alt="development car"
      class="absolute -z-1 -top-0 img-container object-cover img-shadow rounded-3xl hidden sm:block"
    />
    <img
      src={mclarenDevelopmentCarMobile}
      alt="development car mobile"
      class="absolute -z-1 -top-0 img-container object-cover img-shadow rounded-3xl block sm:hidden"
    />
    <div class="px-6 sm:px-14 flex items-end pb-11 sm:pb-16 w-full h-full">
      <div class="text-white">
        <p class="tracking-wider text-base sm:text-2xl font-normal pb-3 second-font uppercase">
          gt development <span class="lg:hidden inline-block">for</span>
        </p>
        <p class="tracking-wider text-5xl sm:text-6xl font-normal pb-2 second-font block uppercase">
          <span class="lg:inline-block hidden">for</span> excellence
        </p>
        <p class="text-base font-light w-9/12 sm:w-11/12 max-w-xl leading-7 sm:leading-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Lorem ipsum dolor sit amet.
        </p>
        <Button
          class="text-xs w-60 h-14 sm:w-64 sm:h-16 mt-6 sm:mt-16 font-semibold tracking-widest uppercase second-font"
          variant="brand">view collection</Button
        >
      </div>
    </div>
  </div>

  <div class="text-white z-0 relative img-container">
    <img
      src={mclarenHistoricalCar}
      alt="development car"
      class="absolute -z-1 -top-0 img-container object-cover img-shadow rounded-3xl hidden sm:block"
    />
    <img
      src={mclarenHistoricalCarMobile}
      alt="development car mobile"
      class="absolute -z-1 -top-0 img-container object-cover img-shadow rounded-3xl block sm:hidden"
    />
    <div class="px-6 sm:px-14 flex items-end pb-11 sm:pb-16 w-full h-full">
      <div class="text-white">
        <p class="tracking-wider text-base sm:text-2xl font-normal pb-3 second-font uppercase">
          F1 HISTORICAL <span class="lg:hidden inline-block">race</span>
        </p>
        <p class="tracking-wider text-5xl sm:text-6xl font-normal pb-2 second-font block uppercase">
          <span class="lg:inline-block hidden">race</span> challenges
        </p>
        <p class="text-base font-light w-9/12 sm:w-11/12 max-w-xl leading-7 sm:leading-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Lorem ipsum dolor sit amet.
        </p>
        <Button
          class="text-xs w-60 h-14 sm:w-64 sm:h-16 mt-6 sm:mt-16 font-semibold tracking-widest uppercase second-font"
          variant="brand">view collection</Button
        >
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .img-container {
    height: 47.125rem;
    width: 100%;
  }
</style>
