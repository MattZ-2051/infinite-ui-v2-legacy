<script lang="ts">
  import { mdiAccountCircleOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import AccountMenu from '$lib/layout/header/AccountMenu.svelte';

  let showAccountMenu = false;
  let accountMenuTrigger: HTMLElement;
</script>

<a sveltekit:prefetch href="/marketplace" class:active={$page.path === '/marketplace'}
  >Marketplace</a
>
<a sveltekit:prefetch href="/collection/Mache" class:active={$page.path === '/collection'}
  >My Collection</a
>
<button
  class="flex focus:outline-none"
  class:active={$page.path === '/account'}
  on:click={() => (showAccountMenu = !showAccountMenu)}
  bind:this={accountMenuTrigger}
  ><Icon path={mdiAccountCircleOutline} class="mr-1" /> mrbrowniee
</button>

{#if showAccountMenu}
  <AccountMenu trigger={accountMenuTrigger} on:close={() => (showAccountMenu = false)} />
{/if}

<style>
  a:hover,
  button:hover,
  .active {
    @apply text-white;
  }
</style>
