<script lang="ts">
  import { mdiAccountCircleOutline, mdiCreditCardOutline, mdiLogout } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import MenuVariantDark from '$ui/menu/variants/MenuVariantDark.svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';
  import { logout } from '$lib/auth';

  export let trigger: HTMLElement;

  let dispatch = createEventDispatcher();

  function onLogout(path) {
    // TODO: needs configuration at auth0
    // const redirectPath = path === "/u/account" ? "/" : path;

    logout(`${window.location.origin}`);
  }
</script>

<MenuVariantDark>
  <Menu {trigger} offset={4} position="bottom-end" on:click={() => dispatch('close')} on:close>
    <MenuItem href="/u/account" class={$page.path === '/u/account' ? 'hidden' : ''}>
      <Icon path={mdiAccountCircleOutline} class="flex-shrink-0 float-left mr-3" /> My account
    </MenuItem>
    <MenuItem href="/u/wallet" class={$page.path === '/u/wallet' ? 'hidden' : ''}>
      <Icon path={mdiCreditCardOutline} class="flex-shrink-0 float-left mr-3" /> My wallet
    </MenuItem>
    <MenuItem on:click={() => onLogout($page.path)}>
      <Icon path={mdiLogout} class="flex-shrink-0 float-left mr-3" /> Sign out
    </MenuItem>
  </Menu>
</MenuVariantDark>
