<script lang="ts">
  import type { SkuCollection } from '$lib/features/collections/types';
  import Button from '$lib/components/Button.svelte';

  export let name: SkuCollection['name'];
  export let title: SkuCollection['title'];
  export let descriptionShort: SkuCollection['descriptionShort'];
  export let mainFileAsset: SkuCollection['mainFileAsset'];
</script>

<section class="w-full">
  <figure class="aspect-[4/7] sm:aspect-square lg:aspect-[16/8] relative h-full w-full overflow-hidden">
    <img class="h-full w-full object-cover" alt={`${name} banner`} src={mainFileAsset.url} />
    <div class="overlay w-full h-full absolute top-0 left-0" />
    <figcaption
      class="mx-6 mb-16 md:mx-16 lg:mx-20 lg:mb-20 xl:mx-40 xl:mb-40 font-light absolute left-0 bottom-0 text-white"
    >
      <h2 class="second-font text-4xl md:text-6xl max-w-4xl tracking-wider md:tracking-widest">
        {#each title as line}
          <span class="block">
            {line.text}
          </span>
        {/each}
      </h2>
      <p class="text-lg font-light max-w-screen-sm lg:leading-10 mt-5">
        {descriptionShort}
      </p>
      <Button variant="outline-brand" class="h-14 mt-10 w-60">View Collection</Button>
    </figcaption>
  </figure>
</section>

<style lang="postcss">
  figure::before {
    content: '';
    @apply w-full h-full absolute top-0 left-0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) -43.86%, rgba(0, 0, 0, 0.8) 100%);
  }
</style>
