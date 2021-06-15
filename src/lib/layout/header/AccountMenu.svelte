<script lang="ts">
  import {
    mdiAccountCircleOutline,
    mdiCogOutline,
    mdiCreditCardOutline,
    mdiLogout,
    mdiPencil,
  } from '@mdi/js';
  import { createEventDispatcher } from 'svelte';
  import { page } from '$app/stores';
  import Icon from '$ui/icon/Icon.svelte';
  import MenuVariantDark from '$ui/menu/variants/MenuVariantDark.svelte';
  import Menu from '$ui/menu/Menu.svelte';
  import MenuItem from '$ui/menu/MenuItem.svelte';

  export let trigger: HTMLElement;

  let dispatch = createEventDispatcher();
</script>

<MenuVariantDark>
  <Menu {trigger} offset={4} position="bottom-end" on:click={() => dispatch('close')} on:close>
    <MenuItem href="/account" class={$page.path === '/account' ? 'hidden' : ''}>
      <Icon path={mdiAccountCircleOutline} class="flex-shrink-0 float-left mr-3" /> Go to account
    </MenuItem>
    <MenuItem>
      <Icon path={mdiPencil} class="flex-shrink-0 float-left mr-3" /> Edit username
    </MenuItem>
    <MenuItem href="/account/settings">
      <Icon path={mdiCogOutline} class="flex-shrink-0 float-left mr-3" /> Account settings
    </MenuItem>
    <MenuItem href="/wallet">
      <Icon path={mdiCreditCardOutline} class="flex-shrink-0 float-left mr-3" /> My wallet
    </MenuItem>
    <MenuItem>
      <Icon path={mdiLogout} class="flex-shrink-0 float-left mr-3" /> Sign out
    </MenuItem>
  </Menu>
</MenuVariantDark>
