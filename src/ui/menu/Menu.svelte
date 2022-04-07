<script lang="ts">
  import { createPopperActions } from 'svelte-popperjs';
  import type { PopperOptions } from 'svelte-popperjs';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Placement, StrictModifiers } from '@popperjs/core';
  import type { VisibleStore } from './types';
  import clickOutside from '$util/clickOutside';
  import { navigating } from '$app/stores';

  /**
   * Whether or not the Menu is visible.
   */
  export let visible = false;

  /**
   * The placement of the MenuList relative to the MenuTrigger.
   */
  export let placement: Placement = 'bottom';

  /**
   * The distance offset of the MenuList (https://popper.js.org/docs/v2/modifiers/offset/)
   */
  export let offset = 4;
  let _class = '';
  export { _class as class };

  let popperOptions: PopperOptions<StrictModifiers>;
  $: popperOptions = {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, offset],
        },
      },
    ],
  };

  // eslint-disable-next-line unicorn/prevent-abbreviations
  const [popperRef, popperContent] = createPopperActions(popperOptions);

  let visibleStore = writable<VisibleStore>({
    visible,
  });

  $: $visibleStore = { visible };
  $: updateProperties($visibleStore);

  function updateProperties(store: VisibleStore) {
    visible = store.visible;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      $visibleStore = { visible: false, event, reason: 'keydown' };
    }
  }

  function handleClickOutside(event: MouseEvent) {
    $visibleStore = { visible: false, event, reason: 'clickoutside' };
  }

  function handleNavigation(event: { from: URL; to: URL }) {
    $visibleStore = { visible: false, event, reason: 'navigation' };
  }

  setContext('visibleStore', visibleStore);
  setContext('popperRef', popperRef);

  $: if ($navigating) handleNavigation($navigating);
</script>

<div
  use:clickOutside={{
    enabled: $visibleStore.visible,
    cb: handleClickOutside,
  }}
  class="inline-block {_class}"
  on:keydown={handleKeydown}
  {...$$restProps}
>
  <slot name="trigger" />
  {#if $visibleStore.visible}
    <div use:popperContent={popperOptions} style="min-width: 6rem" class="z-50 max-w-xs">
      <slot name="menu" />
    </div>
  {/if}
</div>
