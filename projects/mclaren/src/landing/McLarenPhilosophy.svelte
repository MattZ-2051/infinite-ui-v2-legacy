<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import philosophyImg from './images/philosophy-bg-img.svg';
  import philosophyImgMobile from './images/philosophy-bg-img-mobile.png';
</script>

<div class="relative bg-black z-0 mt-36 sm:mt-0">
  <div class="flex justify-center items-center h-screen">
    <div class="text-white w-full z-10 flex-col max-w-7xl items-center justify-center container">
      <p class="text-lg sm:text-xl font-normal pb-2 uppercase second-font" style="letter-spacing:0.2em;">
        nft, it's as easy as 1-2-3
      </p>
      <p class="tracking-widest sm:text-5xl text-3xl font-light pb-8 second-font leading-10 sm:leading-normal">
        McLAREN PHILOSOPHY
      </p>
      <div class="text-base sm:text-lg font-light max-w-lg leading-9">
        <p class="pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit urna nulla, in pretium orci
          sollicitudin sed. Nunc sed purus et nunc sollicitudin.
        </p>
        <p class="pb-12">
          Proin mi dolor, consequat quis vehicula nec, malesuada ut lorem. Nam vitae erat et leo accumsan viverra vitae
          a nisl. Fusce sit amet interdum nibh. Aenean et consectetur enim.
        </p>
      </div>
      <Button
        variant="brand"
        class="h-12 sm:h-16 w-full sm:w-fit font-bold text-xs tracking-widest uppercase"
        on:click={() => goto('https://cars.mclaren.com/us-en')}>discover our philosophy</Button
      >
    </div>
  </div>
  <img
    alt="mclaren card philosophy"
    src={philosophyImg}
    class="w-full absolute object-cover top-0 -z-1 h-full hidden md:block"
  />
  <img
    alt="mclaren card philosophy mobile"
    src={philosophyImgMobile}
    class="w-full absolute object-cover top-0 -z-1 h-full md:hidden"
  />
</div>
