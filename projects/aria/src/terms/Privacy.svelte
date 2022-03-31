<script lang="ts">
  import InfiniteWorldPrivacy from './InfiniteWorldPrivacy.svelte';
  import AriaPrivacy from './AriaPrivacy.svelte';
</script>

<div class="container py-8 sm:pt-20" id="privacy">
  <div class="flex flex-col space-y-8 text-center justify-center sm:flex-row sm:space-y-0 sm:space-x-8 sm:pb-8">
    <a href="#InfiniteWorld">InfiniteWorld Privacy Notice</a>
    <a href="#Aria">ARIA Privacy Notice</a>
  </div>
  <InfiniteWorldPrivacy />
  <AriaPrivacy />
</div>

<style lang="postcss">
  a {
    @apply font-medium underline text-2xl;
  }

  a:hover {
    @apply no-underline;
  }
</style>
