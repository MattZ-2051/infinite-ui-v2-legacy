<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from './types';
  import { createEventDispatcher } from 'svelte';
  import clsx from 'clsx';
  import { onSignOut, onSignIn, onSignUp, isLoading, isIssuer } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { Menu, MenuList, MenuTrigger, MenuItem } from '$ui/menu';
  import { openModal } from '$ui/modals';
  import routes from '$project/routes';
  import { INFINITE_EXTENSION_ENABLED } from '$project/variables';
  import { variables } from '$lib/variables';
  import WalletConnectionModal from '$lib/features/connect-wallet-extensions/WalletConnectionModal.svelte';
  import { tenantSettings } from '$lib/tenant/settings.store';
  import { isVisible } from '$lib/layout/header/links.utils';

  import Button from '$lib/components/Button.svelte';
  import account from '$lib/layout/header/assets/account';

  const MM_WALLET_ENABLED = variables.metamask.walletEnabled;

  export let flatten = false;
  export let user: User;
  export let links: Link[];
  export let hideUserMenu = false;

  const handleWalletModal = () => {
    openModal(WalletConnectionModal, { user });
  };

  $: isRoute = function (route: string) {
    return new RegExp(`^${$page.url.pathname}(/?$)`).test(route);
  };

  const dispatch = createEventDispatcher();
  const checkCurrentRoute = (route: string) => {
    const splitRoute = route.split('?');
    return $page.url.pathname === splitRoute[0];
  };
</script>

<!-- Header block -->
{#each links as { type, location, id, label, excludeFor, classes }}
  <!-- Menu items will be flattened for mobile menu -->
  {#if location === 'header' || (user && flatten && location === 'user-menu')}
    {#if type === 'route' || type === 'route-open-new'}
      <a
        sveltekit:prefetch
        href={routes[id]}
        target={type === 'route-open-new' ? '_blank' : ''}
        rel={type === 'route-open-new' ? 'noopener noreferrer' : ''}
        class={clsx(classes, 'header-link', {
          'sidebar-link': flatten,
          hidden: !isVisible(excludeFor, $page.url.pathname),
          active: isRoute(routes[id]),
        })}
        on:click={() => flatten && dispatch('select')}>{label}</a
      >
    {:else if type === 'wallet-extensions' && (MM_WALLET_ENABLED || INFINITE_EXTENSION_ENABLED)}
      <button
        class={clsx(classes, 'header-link', {
          'sidebar-link': flatten,
          hidden: !isVisible(excludeFor, $page.url.pathname),
        })}
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
          class={clsx(classes, 'header-link', {
            'sidebar-link': flatten,
            active: isRoute(routes[id]),
          })}
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
          class={clsx('header-link', classes)}
          class:sidebar-link={flatten}>Sign Out</button
        >
      {/if}
    {:else if type === 'sign-in'}
      <button
        class={clsx(classes, 'flex header-link', {
          'sidebar-link': flatten,
          hidden: !isVisible(excludeFor, $page.url.pathname),
        })}
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
          class:hidden={!isVisible(excludeFor, $page.url.pathname)}
        />{/if}
      <Button
        variant="brand"
        on:click={() => {
          flatten && dispatch('select');
          onSignUp();
        }}
        class={isVisible(excludeFor, $page.url.pathname)
          ? clsx(classes, 'whitespace-nowrap header-link', { 'sidebar-link': flatten })
          : 'hidden'}>{label}</Button
      >
    {/if}
  {/if}

  {#if id === 'marketplace' && ($tenantSettings?.skuCreationEnabled || isIssuer(user))}
    <a
      sveltekit:prefetch
      class={clsx('header-link', classes)}
      href={routes.createSku}
      class:active={isRoute(routes.createSku)}>Create</a
    >
  {/if}
{/each}

<!-- User menu block -->
<!-- Menu items will be nested for desktop view -->
{#if user && flatten === false && !hideUserMenu}
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
            class={checkCurrentRoute(routes[id]) ? 'route-selected-custom' : ''}
          >
            {#if icon}<Icon path={icon} class="shrink-0 float-left mr-3" />{/if}
            {label}
          </MenuItem>
        {:else if type === 'user-collection'}
          <MenuItem
            sveltekit:prefetch
            href={routes.collection(user.username)}
            class={checkCurrentRoute(routes.collection(user.username)) ? 'route-selected-custom' : ''}
          >
            {#if icon}<Icon path={icon} class="shrink-0 float-left mr-3" />{/if}
            {label}
          </MenuItem>
        {:else if type === 'wallet-extensions' && (MM_WALLET_ENABLED || INFINITE_EXTENSION_ENABLED)}
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
