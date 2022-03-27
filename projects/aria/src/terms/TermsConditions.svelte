<script lang="ts">
  import InfiniteTermsConditions from './InfiniteTermsConditions.svelte';
  import AriaTermsConditions from './AriaTermsConditions.svelte';
</script>

<div class="container py-8 sm:pt-20" id="terms">
  <div class="flex justify-center pb-20">
    <a href="#InfiniteWorld" class="pr-4">InfiniteWorld Terms of Service</a>
    <a href="#Aria" class="pl-4">ARIA Supplemental Terms of Service</a>
  </div>
  <InfiniteTermsConditions />
  <AriaTermsConditions />
</div>

<style lang="postcss">
  a {
    @apply font-medium underline text-2xl;
  }

  a:hover {
    @apply no-underline;
  }
</style>
