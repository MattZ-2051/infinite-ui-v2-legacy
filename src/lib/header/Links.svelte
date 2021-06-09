<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { mdiAccountCircleOutline } from '@mdi/js';
</script>

<a sveltekit:prefetch href="/marketplace" class:active={$page.path === '/marketplace'}
  >Marketplace</a
>
<a sveltekit:prefetch href="/jabbar" class:active={$page.path === '/about'}>My Collection</a>
<a sveltekit:prefetch href="/account" class="flex" class:active={$page.path === '/account'}
  ><Icon path={mdiAccountCircleOutline} class="mr-1" />@mrbrowniee</a
>

<style>
  a:hover,
  .active {
    @apply text-white;
  }
</style>
