<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';

  import { mdiAccountCircleOutline } from '@mdi/js';
</script>

<div class="bg-black text-gray-300 w-full h-20 flex">
  <div class="container flex justify-between items-end py-2">
    <img src="/aria_gradient.png" alt="ARIA" class="h-full" />

    <div class="flex gap-1 md:gap-6 lg:gap-12">
      <a sveltekit:prefetch href="/marketplace" class:active={$page.path === '/marketplace'}
        >Marketplace</a
      >
      <a sveltekit:prefetch href="/collection" class:active={$page.path === '/about'}
        >My Collection</a
      >
      <a sveltekit:prefetch href="/account" class="flex" class:active={$page.path === '/account'}
        ><Icon path={mdiAccountCircleOutline} class="mr-1" />@mrbrowniee</a
      >
    </div>
  </div>
</div>

<style>
  a:hover,
  .active {
    @apply text-white;
  }
</style>
