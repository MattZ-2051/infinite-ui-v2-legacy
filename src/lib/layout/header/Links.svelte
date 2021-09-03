<script lang="ts">
  import { mdiCogOutline, mdiCreditCardOutline, mdiLogout } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { login, isLoading, logout } from '$lib/auth';
  import { user, clearUser } from '$lib/user';
  import routes from '$lib/routes';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';
  import Button from '$lib/components/Button.svelte';

  function onLogout() {
    clearUser();
    logout(`${window.location.origin}`);
  }
</script>

<a sveltekit:prefetch href={routes.marketplace} class="whitespace-nowrap">Marketplace</a>
{#if $user}
  <a sveltekit:prefetch href={routes.collection($user.username)} class="whitespace-nowrap">My Collection</a>
  <Menu placement="bottom-end">
    <MenuTrigger slot="trigger" class="whitespace-nowrap">
      {#if $user.profilePhotoUrl}
        <img class="w-6 mr-1.5 rounded-full" src={$user.profilePhotoUrl} alt="" />
      {/if}
      {$user.username}</MenuTrigger
    >
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
{:else}
  <a sveltekit:prefetch href={routes.about} class="whitespace-nowrap">About Us</a>
  <button class="flex whitespace-nowrap" on:click={async () => await login()} disabled={$isLoading}> Log In </button>
  <div class="button-container">
    <Button href={routes.signup} class="whitespace-nowrap">Sign up</Button>
  </div>
{/if}
