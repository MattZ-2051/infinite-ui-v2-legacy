<script lang="ts">
  import { mdiAccountCircleOutline, mdiCreditCardOutline, mdiLogin, mdiLogout } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { page } from '$app/stores';
  import { login, isLoading, logout } from '$lib/auth';
  import { user, clearUser } from '$lib/user';
  import routes from '$lib/routes';
  import { Menu, MenuList, MenuItem, MenuTrigger } from '$ui/menu';

  function onLogout() {
    clearUser();
    logout(`${window.location.origin}`);
  }
</script>

<a sveltekit:prefetch href={routes.marketplace} hover:text-white class:text-white={$page.path === routes.marketplace}
  >Marketplace</a
>

{#if $user}
  <a
    sveltekit:prefetch
    href={routes.collection($user.username)}
    class="hover:text-white"
    class:text-white={$page.path === routes.collection($user.username)}>My Collection</a
  >

  <Menu placement="bottom-end">
    <MenuTrigger slot="trigger" class={`hover:text-white ${$page.path === routes.account ? 'text-white' : ''}`}
      ><Icon path={mdiAccountCircleOutline} class="mr-1" /> {$user.username}</MenuTrigger
    >
    <MenuList slot="menu">
      <MenuItem href={routes.account} class={$page.path === routes.account ? 'hidden' : ''}>
        <Icon path={mdiAccountCircleOutline} class="flex-shrink-0 float-left mr-3" /> My account
      </MenuItem>
      <MenuItem href={routes.wallet} class={$page.path === routes.wallet ? 'hidden' : ''}>
        <Icon path={mdiCreditCardOutline} class="flex-shrink-0 float-left mr-3" /> My wallet
      </MenuItem>
      <MenuItem on:select={() => onLogout()}>
        <Icon path={mdiLogout} class="flex-shrink-0 float-left mr-3" /> Sign out
      </MenuItem>
    </MenuList>
  </Menu>
{:else}
  <button class="flex hover:text-white" on:click={async () => await login()} disabled={$isLoading}
    ><Icon path={mdiLogin} class="mr-1" /> Log in
  </button>
{/if}
