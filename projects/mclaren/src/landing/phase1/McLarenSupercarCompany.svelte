<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import supercarCompanyImg from './images/supercar-company-bg-img.svg';
  import supercarCompanyImgMobile from './images/supercar-company-bg-img-mobile.png';
</script>

<div class="relative bg-black z-0">
  <div class="flex justify-center items-center h-screen">
    <div class="text-white w-full z-10 px-6 md:px-16 xl:px-44 flex-col items-center justify-center container">
      <p class="text-base sm:text-xl font-normal pb-2 second-font" style="letter-spacing:0.2em;">McLAREN</p>
      <p
        class="tracking-widest sm:text-5xl text-3xl font-light pb-8 second-font w-full md:w-2/3 xl:w-1/2 leading-10 sm:leading-normal"
      >
        THE PIONEERING SUPERCAR COMPANY
      </p>
      <div class="text-base sm:text-lg font-light max-w-lg leading-9">
        <p class="pb-6">
          Our cars continually define and redefine the benchmarks against which all others are measured.
        </p>
        <p class="pb-12">
          We embrace pioneering technology, fearless engineering, beautiful yet purposeful design and a relentless
          spirit to ensure that each one is more exhilarating, more refined, more remarkable than the last.
        </p>
      </div>
      <Button
        variant="brand"
        class="h-12 sm:h-16 w-full sm:w-fit font-bold text-xs tracking-widest !normal-case"
        on:click={() => goto('https://cars.mclaren.com/us-en')}>DISCOVER McLAREN</Button
      >
    </div>
  </div>
  <img
    alt="mclaren card supercar company"
    src={supercarCompanyImg}
    class="w-full absolute object-cover top-0 -z-1 h-full hidden md:block"
  />
  <img
    alt="mclaren card supercar company mobile"
    src={supercarCompanyImgMobile}
    class="w-full absolute object-cover top-0 -z-1 h-full md:hidden"
  />
</div>
