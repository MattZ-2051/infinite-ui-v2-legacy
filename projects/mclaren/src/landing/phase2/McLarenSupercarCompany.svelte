<script lang="ts">
  import { media } from '$lib/media-query.store';
  import Button from '$lib/components/Button.svelte';
  import bucketAssets from '$project/assets/aws-bucket-assets';
</script>

<div class="w-full py-20 sm:py-48 flex justify-center align-center">
  <div
    class="flex flex-col lg:grid grid-cols-2 gap-x-16 h-full text-black items-center container px-6 md:px-16 xl:px-44"
  >
    <div
      class={`justify-self-center rounded-3xl z-1 mb-20 lg:mb-0 flex align-center items-center max-w-${
        $media['2xl'] ? 'xl' : 'md'
      }`}
    >
      <img
        src={bucketAssets.landing.supercarCompany}
        alt="super car company"
        class="img-card sm:object-cover rounded-3xl img"
      />
    </div>
    <div class="text-left lg:text-left sm:text-left md:text-center">
      <p class="text-base sm:text-lg font-normal pb-2 second-font text-white opacity-80" style="letter-spacing: 0.2em;">
        McLAREN
      </p>
      <p class="text-3xl sm:text-5xl font-light tracking-widest pb-10 second-font text-white opacity-80">
        THE PIONEERING SUPERCAR COMPANY
      </p>
      <div class="w-full xl:w-5/6 font-light text-sm sm:text-lg leading-7">
        <p class="leading-7 pb-6 text-white opacity-80">
          Our cars continually define and redefine the benchmarks against which all others are measured.
        </p>
        <p class="leading-7 md:pb-6 pb-10 text-white opacity-80">
          We embrace pioneering technology, fearless engineering, beautiful yet purposeful design and a relentless
          spirit to ensure that each one is more exhilarating, more refined, more remarkable than the last.
        </p>
        <Button
          variant="brand"
          class="h-12 sm:h-16 w-full sm:w-fit font-bold text-xs tracking-widest !normal-case"
          on:click={() => window.open('https://cars.mclaren.com/gb-en/about')}>DISCOVER McLAREN</Button
        >
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @media screen and (min-width: 768px) {
    .img {
      height: 35rem;
    }
  }
</style>
