<script lang="ts">
  import Image from '$ui/image/Image.svelte';
  import noResults from '$project/assets/no_results.png?w=240;&format=avif;webp;png&metadata=src;format;width;height';

  let _class = '';
  export { _class as class };
</script>

<div class="flex flex-col gap-4 justify-center w-full text-center {_class}">
  <div class="flex justify-center"><Image src={noResults} alt="" /></div>
  <div class="text-3xl no-result">No Matching Results</div>
  <div class="text-2xl opacity-50">Check your spelling or try adjusting keywords and/or filters.</div>
</div>

<style>
  .no-result {
    font-family: var(--market-no-result-title-font);
  }
</style>
