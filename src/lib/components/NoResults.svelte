<script lang="ts">
  import { CLIENT_SUPPORT_EMAIL } from '$project/variables';
  import Image from '$ui/image/Image.svelte';
  import noResults from '$project/assets/no_results.png?w=240;&format=avif;webp;png&metadata';

  let _class = '';
  export { _class as class };
</script>

<div class="flex flex-col gap-4 justify-center w-full text-center {_class}">
  <div class="flex justify-center"><Image src={noResults} alt="" /></div>
  <div class="text-3xl">No Matching Results</div>
  <div class="text-2xl opacity-50">Check your spelling or try adjusting keywords and/or filters.</div>
  <div class="text-xl">
    <span class="opacity-50">If the problem persists please contact</span>
    <a href="mailto:{CLIENT_SUPPORT_EMAIL}" class="hover:underline">{CLIENT_SUPPORT_EMAIL}</a>
  </div>
</div>

<style>
  a {
    color: var(--no-results-link-color);
  }
</style>
