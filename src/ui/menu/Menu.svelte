<script lang="ts">
  import type { Options, Placement } from './placement';
  import { createEventDispatcher } from 'svelte';
  import clickOutside from '$util/clickOutside';
  import { placement } from './placement';

  export let trigger: HTMLElement;
  export let position: Placement = 'bottom';
  export let offset = 0;

  const dispatch = createEventDispatcher();

  let menuOptions: Options;
  $: menuOptions = {
    referenceElement: trigger,
    placement: position,
    offset: {
      distance: offset,
    },
  };
</script>

<svelte:window on:sveltekit:navigation-start={() => dispatch('close')} />

<nav
  class="flex flex-col px-4 py-2 rounded-3xl z-50"
  use:placement={menuOptions}
  use:clickOutside={{ enabled: true, cb: () => dispatch('close') }}
  on:click
>
  <slot />
</nav>

<style>
  nav {
    background: var(--menu-background-color);
    box-shadow: 0px 0px 20px var(--menu-box-shadow-color);
  }
</style>
