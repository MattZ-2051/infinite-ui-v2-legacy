<script lang="ts">
  import { mdiAccountCircleOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
</script>

<a sveltekit:prefetch href="/marketplace" class:active={$page.path === '/marketplace'}
  >Marketplace</a
>
<a sveltekit:prefetch href="/celebrity" class:active={$page.path === '/celebrity'}>My Collection</a>
<a sveltekit:prefetch href="/account" class="flex" class:active={$page.path === '/account'}
  ><Icon path={mdiAccountCircleOutline} class="mr-1" />@mrbrowniee</a
>

<style>
  a:hover,
  .active {
    @apply text-white;
  }
</style>
