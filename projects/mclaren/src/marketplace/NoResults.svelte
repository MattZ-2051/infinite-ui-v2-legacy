<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import noResults from './assets/no_results.png?format=avif;webp;png&metadata=src;format;width;height';

  let _class = '';
  export { _class as class };
</script>

<div class="flex flex-col gap-4 justify-center w-full text-center {_class}">
  <div class="flex justify-center"><Image src={noResults} alt="attention" /></div>
  <div class="text-4xl mt-6 mb-10 no-result">No Matching Results</div>
  <div class="w-2/4 items-center justify-center">
    <slot name="search-input" />
  </div>
  <div class="text-xl opacity-80">Check your spelling or try adjusting keywords and/or filters.</div>
</div>

<style>
  .no-result {
    font-family: var(--market-no-result-title-font);
  }
</style>
