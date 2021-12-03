<script lang="ts">
  import type { Link } from './types';
  import { mdiCogOutline, mdiCreditCardOutline, mdiLogout } from '@mdi/js';
  import type { User } from '$lib/user/types';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { Menu, MenuList, MenuTrigger, MenuItem } from '$ui/menu';
  import routes from '$project/routes';
  import Button from '$lib/components/Button.svelte';
  import account from './assets/account';

  export let flatten = false;
  export let user: User;
  export let links: Link[];

  $: isRoute = function (route: string) {
    return new RegExp(`^${route}(?:/|$)`).test($page.path);
  };
</script>

{#each links as { id, label }}
  <a sveltekit:prefetch href={routes[id]} class="header-link" class:active={isRoute(routes[id])}>{label}</a>
{/each}

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
    <button type="button" on:click={routes.signout} class="header-link">Sign Out</button>
  {:else}
    <Menu placement="bottom-start" class="min-w-0">
      <MenuTrigger slot="trigger" class="header-link w-full">
        <div class="flex sm:gap-1 md:gap-1.5 w-full">
          {#if user.profilePhotoUrl}
            <img
              class="w-6 object-cover rounded-full"
              src={`${user.profilePhotoUrl}?t=${user.updatedAt}`}
              alt="profilePhoto"
            />
          {:else}
            <Icon path={account} />
          {/if}
          <span class="truncate">{user.username}</span>
        </div>
      </MenuTrigger>
      <MenuList slot="menu">
        <MenuItem href={routes.account} class={$page.path === routes.account ? 'hidden' : ''}>
          <Icon path={mdiCogOutline} class="flex-shrink-0 float-left mr-3" />Account Settings
        </MenuItem>
        <MenuItem href={routes.wallet} class={$page.path === routes.wallet ? 'hidden' : ''}>
          <Icon path={mdiCreditCardOutline} class="flex-shrink-0 float-left mr-3" /> My Wallet
        </MenuItem>
        <MenuItem on:select={routes.signout}>
          <Icon path={mdiLogout} class="flex-shrink-0 float-left mr-3" /> Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  {/if}
{:else}
  <button class="flex header-link" on:click={routes.signin}>Sign In</button>
  <Button variant="brand" on:click={routes.signup} class="whitespace-nowrap">Sign Up</Button>
{/if}

<style lang="postcss">
  :global(.header-link) {
    @apply whitespace-nowrap;
    color: var(--header-color, theme('colors.gray.500'));
  }

  .active,
  :global(.header-link):hover {
    color: var(--default-color);
  }
</style>
