<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import mclarenArtura from './images/mclaren-artura-img.png';
</script>

<div class="sm:container mb-7">
  <div class="relative collectible-container">
    <img
      src={mclarenArtura}
      alt="mclaren-artura"
      class="absolute w-full h-full z-0 object-cover"
      style="border-radius:20px"
    />
    <div class="w-full h-full flex justify-center items-center max-w-5xl">
      <div class="h-full text-white z-∞ flex flex-col justify-end w-5/6 pb-11 md:pb-40">
        <p class="text-base md:text-2xl font-light pb-3 uppercase second-font tracking-wider">mclaren classics 1st</p>
        <p
          class="text-4xl sm:text-5xl font-light pb-4 md:pb-7 uppercase md:text-7xl second-font"
          style="line-height: 65px;"
        >
          collection release
        </p>
        <div class="max-w-xl">
          <p class="text-base md:text-xl font-light" style="line-height:40px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lorem ipsum dolor sit amet.
          </p>
        </div>
        <Button
          class="text-xs w-60 h-14 sm:w-64 sm:h-16 mt-8 md:mt-16 font-semibold tracking-widest uppercase second-font"
          variant="brand">view collection</Button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .collectible-container {
    height: 56rem;
  }
</style>
