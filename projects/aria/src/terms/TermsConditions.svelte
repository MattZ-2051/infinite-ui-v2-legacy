<script lang="ts">
  import InfiniteTermsConditions from './InfiniteTermsConditions.svelte';
  import AriaTermsConditions from './AriaTermsConditions.svelte';
</script>

<div class="container py-8 sm:pt-20" id="terms">
  <div class="flex flex-col space-y-8 text-center justify-center sm:flex-row sm:space-y-0 sm:space-x-8 sm:pb-8">
    <a href="#InfiniteWorld">InfiniteWorld Terms of Service</a>
    <a href="#Aria">ARIA Supplemental Terms of Service</a>
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
