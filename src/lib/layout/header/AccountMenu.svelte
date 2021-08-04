<script lang="ts">
  import { mdiAccountCircleOutline, mdiCreditCardOutline, mdiLogout } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import MenuVariantDark from '$ui/menu/variants/MenuVariantDark.svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';
  import { logout } from '$lib/auth';
  import { clearUser } from '$lib/user';
  import routes from '$lib/routes';

  export let trigger: HTMLElement;

  let dispatch = createEventDispatcher();

  function onLogout() {
    clearUser();
    logout(`${window.location.origin}`);
  }
</script>

<MenuVariantDark>
  <Menu {trigger} offset={4} position="bottom-end" on:click={() => dispatch('close')} on:close>
    <MenuItem href={routes.account} class={$page.path === routes.account ? 'hidden' : ''}>
      <Icon path={mdiAccountCircleOutline} class="flex-shrink-0 float-left mr-3" /> My account
    </MenuItem>
    <MenuItem href={routes.wallet} class={$page.path === routes.wallet ? 'hidden' : ''}>
      <Icon path={mdiCreditCardOutline} class="flex-shrink-0 float-left mr-3" /> My wallet
    </MenuItem>
    <MenuItem on:click={() => onLogout()}>
      <Icon path={mdiLogout} class="flex-shrink-0 float-left mr-3" /> Sign out
    </MenuItem>
  </Menu>
</MenuVariantDark>
