<script lang="ts">
  import type { SkuCollection } from '$lib/features/collections/types';
  import { getFileType } from '$ui/file';

  export let name: SkuCollection['name'];
  export let mainFileAsset: SkuCollection['mainFileAsset'];

  $: fileType = getFileType(mainFileAsset);
</script>

<section class="w-full">
  <figure class="aspect-[4/7] sm:aspect-square lg:aspect-[16/8] relative h-full w-full overflow-hidden">
    {#if fileType === 'video'}
      <video class="w-full object-cover h-screen" alt={name} autoplay loop muted playsinline>
        <source src={mainFileAsset.url} type="video/mp4" />
      </video>
    {:else}
      <img class="h-full w-full object-cover" alt={`${name} banner`} src={mainFileAsset.url} />
    {/if}
  </figure>
</section>

<style lang="postcss">
  figure::before {
    content: '';
    @apply w-full h-full absolute top-0 left-0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) -43.86%, rgba(0, 0, 0, 0.8) 100%);
  }
</style>
