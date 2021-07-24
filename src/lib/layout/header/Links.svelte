<script lang="ts">
  import { mdiAccountCircleOutline, mdiLogin } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import AccountMenu from '$lib/layout/header/AccountMenu.svelte';
  import { login, isLoading } from '$lib/auth';
  import { user } from '$lib/user';

  let showAccountMenu = false;
  let accountMenuTrigger: HTMLElement;
</script>

<a sveltekit:prefetch href="/marketplace" class:active={$page.path === '/marketplace'}>Marketplace</a>

{#if $user}
  <a
    sveltekit:prefetch
    href={`/collection/${$user.username}`}
    class:active={$page.path === `/collection/${$user.username}`}>My Collection</a
  >

  <button
    class="flex"
    class:active={$page.path === '/u/account'}
    on:click={() => (showAccountMenu = !showAccountMenu)}
    bind:this={accountMenuTrigger}
    ><Icon path={mdiAccountCircleOutline} class="mr-1" /> {$user.username}
  </button>
{:else}
  <button class="flex" on:click={async () => await login()} disabled={$isLoading}
    ><Icon path={mdiLogin} class="mr-1" /> Log in
  </button>
{/if}

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
