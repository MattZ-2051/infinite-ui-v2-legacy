<script lang="ts">
  import InfiniteWorldPrivacy from './InfiniteWorldPrivacy.svelte';
  import AriaPrivacy from './AriaPrivacy.svelte';
</script>

<div class="container py-8">
  <div class="flex flex-col pb-20">
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
