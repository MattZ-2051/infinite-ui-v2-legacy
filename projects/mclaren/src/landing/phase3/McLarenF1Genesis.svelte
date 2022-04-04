<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import genesisVideo from './images/PLACEHOLDER_MCL_GENESIS COLLECTION.mp4';
</script>

<div class="bg-black">
  <div class="relative z-0 img-container">
    <div class="flex justify-center items-center h-full">
      <div
        class="text-white w-full z-10 flex flex-col max-w-6xl items-start sm:items-center justify-center container h-full"
      >
        <p class="text-base sm:text-lg font-normal pb-2 uppercase second-font" style="letter-spacing:0.2em;">
          featured drop
        </p>
        <p class="tracking-widest sm:text-5xl text-3xl font-light pb-3 second-font leading-10 sm:leading-normal">
          MSO LAB <span class="block sm:inline">GENESIS COLLECTION</span>
        </p>
        <div class="text-lg text-center font-light max-w-8xl leading-9 hidden sm:block pb-6">
          <p class="text-center">
            An exclusive invitation-only Tier One membership mint marking McLaren Automotive's move into the metaverse.
          </p>
        </div>
        <Button
          variant="brand"
          class="h-12 sm:h-16 w-full sm:w-fit font-bold text-xs tracking-widest uppercase"
          on:click={() => goto('https://cars.mclaren.com/us-en')}>discover the collection</Button
        >
      </div>
    </div>
    <video class="absolute top-0 -z-1 h-full object-cover hidden md:block w-full" autoplay loop muted>
      <source src={genesisVideo} type="video/mp4" />
    </video>
    <video class="w-full absolute top-0 -z-1 object-cover h-full md:hidden" autoplay loop muted>
      <source src={genesisVideo} type="video/mp4" />
    </video>
  </div>
</div>

<style lang="postcss">
  .img-container {
    height: 70rem;
  }

  @media screen and (max-width: 768px) {
    .img-container {
      height: 50rem;
    }
  }
</style>
