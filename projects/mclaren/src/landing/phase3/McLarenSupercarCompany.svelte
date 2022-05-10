<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Image from '$ui/image/Image.svelte';
  import supercarCompanyImg from '$project/assets/aws/landing/MCL014_MSO_Philosophy_Static_no_text_1800x3360.jpeg?w=1800&format=avif;webp;jpg&metadata=src;format;width;height';
  import supercarCompanyImgMobile from './images/supercar-company-bg-img-mobile.png?w=400&format=avif;webp;jpg&metadata=src;format;width;height';
</script>

<div class="relative bg-black z-0">
  <div class="flex justify-center items-center h-screen">
    <div class="text-white w-full z-10 px-6 md:px-16 xl:px-44 flex-col items-center justify-center container">
      <p class="text-base sm:text-xl font-normal pb-2 second-font" style="letter-spacing:0.2em;">McLAREN</p>
      <p
        class="tracking-widest text-3xl sm:text-5xl font-light pb-8 second-font w-full md:w-5/6 xl:w-2/3 leading-10 md:leading-normal"
      >
        THE PIONEERING SUPERCAR COMPANY
      </p>
      <div class="text-sm sm:text-base font-light max-w-lg">
        <p class="pb-6 leading-7">
          Our cars continually define and redefine the benchmarks against which all others are measured.
        </p>
        <p class="pb-12 leading-7">
          We embrace pioneering technology, fearless engineering, beautiful yet purposeful design and a relentless
          spirit to ensure that each one is more exhilarating, more refined, more remarkable than the last.
        </p>
      </div>
      <Button
        variant="brand"
        class="h-12 sm:h-16 w-full sm:w-fit font-bold text-xs tracking-widest !normal-case"
        on:click={() => window.open('https://cars.mclaren.com/gb-en/about')}>DISCOVER McLAREN</Button
      >
    </div>
  </div>
  <Image src={supercarCompanyImg} class="w-full absolute object-cover top-0 -z-1 h-full hidden md:block" />
  <Image src={supercarCompanyImgMobile} class="w-full absolute object-cover top-0 -z-1 h-full md:hidden" />
</div>
