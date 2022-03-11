<script lang="ts">
  import type { SkuCollection } from '$lib/features/collections/types';
  import SwooshHighlight from '$project/common/SwooshHighlight.svelte';

  export let name: SkuCollection['name'];
  export let description: SkuCollection['description'];
  export let fileAssets: SkuCollection['fileAssets'];
</script>

<SwooshHighlight color="#B76404" position="left">
  <section class="mx-auto container max-w-7xl flex flex-col-reverse md:grid gap-x-0 grid-cols-[45%_1fr]">
    <div
      class="img-wrapper shadow-[0_40px_80px_rgba(0,0,0,0.3)] aspect-auto md:aspect-[300/377] mt-10 lg:mt-0 rounded-3xl overflow-hidden lg:h-full max-w-full"
    >
      <img alt={`${name} `} src={fileAssets[0].url} class="h-full w-full object-cover" />
    </div>
    <div class="space-y-3 lg:space-y-10 md:my-auto">
      <h3 class="second-font md:text-lg md:ml-10 xl:ml-20 tracking-widest">
        ABOUT THE McLAREN<span class="block text-4xl md:text-5xl font-light mt-2 uppercase"
          >{name} {name.toLowerCase().includes('collection') ? '' : 'collection'}</span
        >
      </h3>
      {#if typeof description === 'string'}
        <p class="md:ml-10 xl:ml-20 lg:mr-12 xl:mr-24 leading-7 lg:leading-10 text-800">{description}</p>
      {:else if description?.length !== undefined}
        {#each description as paragraph}
          <p class="md:ml-10 xl:ml-20 lg:mr-12 xl:mr-24 leading-7 lg:leading-10 text-800">{paragraph.text}</p>
        {/each}
      {/if}
    </div>
  </section>
</SwooshHighlight>
