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

  function onLogout() {
    clearUser();
    logout(`${window.location.origin}`);
  }
</script>

<a sveltekit:prefetch href={routes.marketplace} class="whitespace-nowrap">Marketplace</a>
{#if user}
  <a sveltekit:prefetch href={routes.collection(user.username)} class="whitespace-nowrap">My Collection</a>
  {#if flatten}
    <a sveltekit:prefetch href={routes.account}>Account Settings</a>
    <a sveltekit:prefetch href={routes.wallet}>My Wallet</a>
    <button type="button" on:click={() => onLogout()}>Sign Out</button>
  {:else}
    <Menu placement="bottom-end">
      <MenuTrigger slot="trigger" class="whitespace-nowrap">
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
  <a sveltekit:prefetch href={routes.about} class="whitespace-nowrap">About Us</a>
  <button class="flex whitespace-nowrap" on:click={async () => await login()} disabled={$isLoading}>Sign in</button>
  <div class="button-container">
    <Button href={routes.signup} class="whitespace-nowrap">Sign up</Button>
  </div>
{/if}
