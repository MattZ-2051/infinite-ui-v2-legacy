<script lang="ts">
  import type { SkuCollection } from '$lib/features/collections/types';

  export let name: SkuCollection['name'];
  export let description: SkuCollection['description'];
  export let fileAssets: SkuCollection['fileAssets'];
</script>

<section class="mx-auto container max-w-7xl flex flex-col-reverse md:grid md:gap-x-10 xl:gap-x-20 grid-cols-[40%_1fr]">
  <div
    class="img-wrapper shadow-[0_40px_80px_rgba(0,0,0,0.3)] aspect-square md:aspect-[300/377] mt-10 lg:mt-0 rounded-3xl overflow-hidden lg:h-full max-w-full"
  >
    <img alt={`${name} `} src={fileAssets[0].url} class="h-full w-full object-cover md:object-contain" />
  </div>
  <div class="md:my-auto font-light text-base">
    <h3 class="second-font md:text-lg tracking-widest mb-6 md:mb-8">
      GENESIS COLLECTION
      <span class="block text-[32px] text-3xl md:text-5xl font-light mt-2 uppercase">The story of an icon</span>
    </h3>
    <div class="space-y-4 lg:space-y-6">
      {#if typeof description === 'string'}
        <p class="lg:mr-3 leading-7 text-white opacity-80">{description}</p>
      {:else if description?.length !== undefined}
        {#each description as paragraph}
          <p class="lg:mr-3 leading-7 text-white opacity-80">
            {paragraph.text}
          </p>
        {/each}
      {/if}
    </div>
  </div>
</section>
