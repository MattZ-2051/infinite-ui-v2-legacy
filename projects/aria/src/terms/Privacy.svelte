<script lang="ts">
  import InfiniteWorldPrivacy from './InfiniteWorldPrivacy.svelte';
  import AriaPrivacy from './AriaPrivacy.svelte';
</script>

<div class="container py-8">
  <div class="flex justify-center pb-20">
    <a href="#InfiniteWorld">InfiniteWorld Privacy Policy</a>
    <a class="pl-10" href="#Aria">ARIA Privacy Policy</a>
  </div>
  <InfiniteWorldPrivacy />
  <AriaPrivacy />
</div>

<style lang="postcss">
  a {
    @apply font-medium underline text-5xl;
  }

  a:hover {
    @apply no-underline;
  }
</style>
