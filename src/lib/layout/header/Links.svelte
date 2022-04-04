<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from './types';
  import { createEventDispatcher } from 'svelte';
  import { onSignOut, onSignIn, onSignUp, isLoading, isIssuer } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Menu, MenuList, MenuTrigger, MenuItem } from '$ui/menu';
  import { openModal } from '$ui/modals';
  import routes from '$project/routes';
  import { INFINITE_EXTENSION_ENABLED } from '$project/variables';
  import WalletConnectionModal from '$lib/features/connect-wallet-extensions/WalletConnectionModal.svelte';
  import { tenantSettings } from '$lib/tenant/settings.store';

  import Button from '$lib/components/Button.svelte';
  import account from './assets/account';

  const MM_WALLET_ENABLED = import.meta.env?.VITE_MM_WALLET_ENABLED;

  export let flatten = false;
  export let user: User;
  export let links: Link[];

  const handleWalletModal = () => {
    openModal(WalletConnectionModal, { user });
  };

  const isVisible = (excludeFor: string[]) => {
    return excludeFor ? !excludeFor.includes($page.url.pathname) : true;
  };
  const USER_MENU_VISIBLE = import.meta.env?.VITE_HIDE_NAVBAR_LINKS === 'true' ? isVisible(['/']) : true;

  $: isRoute = function (route: string) {
    return new RegExp(`^${route}(?:/|$)`).test($page.url.pathname);
  };

  const dispatch = createEventDispatcher();
  $: showIssuerCreateButton =
    isRoute(routes.marketplace) &&
    !isRoute(routes.createSku) &&
    ($tenantSettings?.skuCreationEnabled || isIssuer(user));
</script>

<!-- Header block -->
{#each links as { type, location, id, label, excludeFor }}
  <!-- Menu items will be flattened for mobile menu -->
  {#if location === 'header' || (user && flatten && location === 'user-menu')}
    {#if type === 'route' || type === 'route-open-new'}
      <a
        sveltekit:prefetch
        href={routes[id]}
        target={type === 'route-open-new' ? '_blank' : ''}
        rel={type === 'route-open-new' ? 'noopener noreferrer' : ''}
        class="header-link"
        class:sidebar-link={flatten}
        class:active={isRoute(routes[id])}
        class:hidden={!isVisible(excludeFor)}
        on:click={() => flatten && dispatch('select')}>{label}</a
      >
    {:else if type === 'wallet-extensions' && (MM_WALLET_ENABLED === 'true' || INFINITE_EXTENSION_ENABLED)}
      <button
        class="header-link"
        class:sidebar-link={flatten}
        class:hidden={!isVisible(excludeFor)}
        on:click={() => {
          flatten && dispatch('select');
          handleWalletModal();
        }}>{label}</button
      >
    {/if}
    {#if user}
      {#if type === 'user-collection'}
        <a
          sveltekit:prefetch
          href={routes.collection(user.username)}
          class="header-link"
          class:sidebar-link={flatten}
          class:active={isRoute(routes.collection(user.username))}
          on:click={() => flatten && dispatch('select')}
        >
          {label}
        </a>
      {:else if type === 'sign-out'}
        <button
          type="button"
          on:click={() => {
            flatten && dispatch('select');
            onSignOut();
          }}
          class="header-link"
          class:sidebar-link={flatten}>Sign Out</button
        >
      {/if}
    {:else if type === 'sign-in'}
      <button
        class="flex header-link"
        class:hidden={!isVisible(excludeFor)}
        class:sidebar-link={flatten}
        on:click={() => {
          flatten && dispatch('select');
          onSignIn();
        }}
        disabled={$isLoading}>{label}</button
      >
    {:else if type === 'sign-up'}
      {#if flatten}<hr
          class="border-t-[thin] w-full"
          style="border-color: var(--mobile-menu-separator-color, transparent);"
          class:hidden={!isVisible(excludeFor)}
        />{/if}
      <Button
        variant="brand"
        on:click={() => {
          flatten && dispatch('select');
          onSignUp();
        }}
        class={isVisible(excludeFor) ? `whitespace-nowrap header-link ${flatten ? 'sidebar-link' : ''}` : 'hidden'}
        >{label}</Button
      >
    {/if}
  {/if}

  {#if id === 'marketplace' && showIssuerCreateButton}
    <button class="header-link" on:click|preventDefault={async () => await goto(routes.createSku)}>Create</button>
  {/if}
{/each}

<!-- User menu block -->
<!-- Menu items will be nested for desktop view -->
{#if user && flatten === false && USER_MENU_VISIBLE}
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
        <span class="truncate flex items-center">{user.username}</span>
      </div>
    </MenuTrigger>
    <MenuList slot="menu" class="sm:mt-4 font-medium text-sm">
      {#each links.filter((link) => link.location === 'user-menu') as { type, id, label, icon }}
        {#if type === 'route' || type === 'route-open-new'}
          <MenuItem
            href={routes[id]}
            target={type === 'route-open-new' ? '_blank' : ''}
            rel={type === 'route-open-new' ? 'noopener noreferrer' : ''}
            class={$page.url.pathname === routes[id] ? 'hidden' : ''}
          >
            {#if icon}<Icon path={icon} class="shrink-0 float-left mr-3" />{/if}
            {label}
          </MenuItem>
        {:else if type === 'user-collection'}
          <MenuItem
            sveltekit:prefetch
            href={routes.collection(user.username)}
            class={$page.url.pathname === routes.collection(user.username) ? 'hidden' : ''}
          >
            {#if icon}<Icon path={icon} class="shrink-0 float-left mr-3" />{/if}
            {label}
          </MenuItem>
        {:else if type === 'wallet-extensions' && (MM_WALLET_ENABLED === 'true' || INFINITE_EXTENSION_ENABLED)}
          <MenuItem on:select={handleWalletModal}>
            {#if icon}<Icon path={icon} class="shrink-0 float-left mr-3" />{/if}
            {label}
          </MenuItem>
        {:else if type === 'sign-out'}
          <MenuItem on:select={() => onSignOut()}>
            {#if icon}<Icon path={icon} class="shrink-0 float-left mr-3" />{/if}
            {label}
          </MenuItem>
        {/if}
      {/each}
    </MenuList>
  </Menu>
{/if}

<style lang="postcss">
  :global(.header-link) {
    @apply whitespace-nowrap;
    color: var(--header-color, theme('colors.gray.500'));
    text-transform: var(--header-links-text-transform, none);
    font-size: var(--header-links-text-size, 0.875rem);
    font-family: var(--header-links-font);
  }

  :global(.sidebar-link) {
    font-size: var(--mobile-menu-links-size, 0.875rem);
    width: var(--mobile-menu-sign-up-width, initial);
    text-align: var(--mobile-menu-links-align, revert);
    white-space: break-spaces;
  }

  :global(.sidebar-link.brand) {
    font-size: var(--mobile-menu-signup-size, 0.875rem);
  }

  .active,
  :global(.header-link):hover {
    color: var(--default-color);
  }
</style>
