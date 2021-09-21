<script lang="ts">
  import type { User } from '$lib/user/types';
  import { mdiCogOutline, mdiCreditCardOutline, mdiLogout, mdiAccount } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { login, isLoading, logout } from '$lib/auth';
  import { clearUser } from '$lib/user';
  import routes from '$project/routes';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';
  import Button from '$lib/components/Button.svelte';

  export let flatten = false;
  export let user: User;

  $: isRoute = function (route: string) {
    return new RegExp(`^${route}(?:/|$)`).test($page.path);
  };

  function onLogout() {
    clearUser();
    logout(`${window.location.origin}`);
  }
</script>

<a sveltekit:prefetch href={routes.marketplace} class="header-link" class:active={isRoute(routes.marketplace)}
  >Marketplace</a
>
{#if user}
  <a
    sveltekit:prefetch
    href={routes.collection(user.username)}
    class="header-link"
    class:active={isRoute(routes.collection(user.username))}>My Collection</a
  >
  {#if flatten}
    <a sveltekit:prefetch href={routes.account} class="header-link" class:hidden={isRoute(routes.account)}
      >Account Settings</a
    >
    <a sveltekit:prefetch href={routes.wallet} class="header-link" class:hidden={isRoute(routes.wallet)}>My Wallet</a>
    <button type="button" class="header-link" on:click={() => onLogout()}>Sign Out</button>
  {:else}
    <Menu placement="bottom-end">
      <MenuTrigger slot="trigger" class="header-link">
        <div class="flex gap-1.5 ">
          {#if user.profilePhotoUrl}
            <img class="w-6 object-cover rounded-full" src={user.profilePhotoUrl} alt="" />
          {:else}
            <Icon path={mdiAccount} />
          {/if}
          {user.username}
        </div>
      </MenuTrigger>
      <MenuList slot="menu">
        <MenuItem href={routes.account} class={$page.path === routes.account ? 'hidden' : ''}>
          <Icon path={mdiCogOutline} class="flex-shrink-0 float-left mr-3" />Account Settings
        </MenuItem>
        <MenuItem href={routes.wallet} class={$page.path === routes.wallet ? 'hidden' : ''}>
          <Icon path={mdiCreditCardOutline} class="flex-shrink-0 float-left mr-3" /> My Wallet
        </MenuItem>
        <MenuItem on:select={() => onLogout()}>
          <Icon path={mdiLogout} class="flex-shrink-0 float-left mr-3" /> Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  {/if}
{:else}
  <a sveltekit:prefetch href={routes.about} class="header-link" class:active={isRoute(routes.about)}>About Us</a>
  <button class="flex header-link" on:click={async () => await login()} disabled={$isLoading}>Sign in</button>
  <Button animate={false} href={routes.signup} class="whitespace-nowrap">Sign up</Button>
{/if}

<style lang="postcss">
  :global(.header-link) {
    @apply whitespace-nowrap;
    color: var(--header-color);
  }

  .active,
  :global(.header-link):hover {
    color: var(--color);
  }
</style>
