<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from './types';
  import { mdiLogout } from '@mdi/js';
  import { onSignOut, onSignIn, onSignUp, isLoading } from '$lib/user';
  import mdiCogOutline from '$lib/layout/header/assets/gear';
  import mdiCreditCardOutline from '$lib/layout/header/assets/wallet';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { Menu, MenuList, MenuTrigger, MenuItem } from '$ui/menu';
  import { openModal } from '$ui/modals';
  import routes from '$project/routes';
  import { INFINITE_EXTENSION_ENABLED } from '$project/variables';
  import WalletConnectionModal from '$lib/features/connect-wallet-extensions/WalletConnectionModal.svelte';

  import Button from '$lib/components/Button.svelte';
  import account from './assets/account';

  const MM_WALLET_ENABLED = import.meta.env?.VITE_MM_WALLET_ENABLED;

  export let flatten = false;
  export let user: User;
  export let links: Link[];

  const handleWalletModal = () => {
    openModal(WalletConnectionModal, { user });
  };

  $: isRoute = function (route: string) {
    return new RegExp(`^${route}(?:/|$)`).test($page.url.pathname);
  };
</script>

{#each links as { id, label }}
  <a sveltekit:prefetch href={routes[id]} class="header-link" class:active={isRoute(routes[id])}>{label}</a>
{/each}

{#if MM_WALLET_ENABLED === 'true' || INFINITE_EXTENSION_ENABLED}
  <button on:click|preventDefault={handleWalletModal}>Wallet</button>
{/if}

{#if user}
  <a
    sveltekit:prefetch
    href={routes.collection(user.username)}
    class="header-link"
    class:active={isRoute(routes.collection(user.username))}
  >
    My Collection
  </a>

  {#if flatten}
    <a sveltekit:prefetch href={routes.account} class="header-link" class:hidden={isRoute(routes.account)}>
      Account Settings
    </a>
    <a sveltekit:prefetch href={routes.wallet} class="header-link" class:hidden={isRoute(routes.wallet)}>My Wallet</a>
    {#if MM_WALLET_ENABLED === 'true' || INFINITE_EXTENSION_ENABLED}
      <button on:click|preventDefault={handleWalletModal}>Wallet</button>
    {/if}
    <button type="button" on:click={() => onSignOut()} class="header-link">Sign Out</button>
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
      <MenuList slot="menu" class="sm:mt-4 font-medium text-sm">
        <MenuItem href={routes.account} class={$page.url.pathname === routes.account ? 'hidden' : ''}>
          <Icon path={mdiCogOutline} class="shrink-0 float-left mr-3" />Account Settings
        </MenuItem>
        <MenuItem href={routes.wallet} class={$page.url.pathname === routes.wallet ? 'hidden' : ''}>
          <Icon path={mdiCreditCardOutline} class="shrink-0 float-left mr-3" /> My Wallet
        </MenuItem>
        <MenuItem on:select={() => onSignOut()}>
          <Icon path={mdiLogout} class="shrink-0 float-left mr-3" /> Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  {/if}
{:else}
  <button class="flex header-link" on:click={onSignIn} disabled={$isLoading}>Sign In</button>
  <Button variant="brand" on:click={onSignUp} class="whitespace-nowrap header-link">Sign Up</Button>
{/if}

<style lang="postcss">
  :global(.header-link) {
    @apply whitespace-nowrap;
    color: var(--header-color, theme('colors.gray.500'));
    text-transform: var(--header-links-text-transform, none);
    font-size: var(--header-links-text-size, 0.875rem);
  }

  .active,
  :global(.header-link):hover {
    color: var(--default-color);
  }
</style>
