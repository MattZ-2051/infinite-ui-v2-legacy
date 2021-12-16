<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { ReferenceAction } from 'svelte-popperjs';
  import type { VisibleStore } from './types';

  // eslint-disable-next-line unicorn/prevent-abbreviations
  let popperRef: ReferenceAction = getContext('popperRef');
  let visibleStore: Writable<VisibleStore> = getContext('visibleStore');
  let trigger: HTMLElement;

  // return focus to the triggering element on Escape or on MenuItem selection (with either click or Enter)
  $: (($visibleStore.reason === 'keydown' && ($visibleStore.event as KeyboardEvent).key === 'Escape') ||
    $visibleStore.reason === 'select') &&
    trigger &&
    trigger.focus();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      $visibleStore = { visible: true, event, reason: 'keydown' };
    }
  }

  function handleClick(event: MouseEvent) {
    $visibleStore = { visible: !$visibleStore.visible, event, reason: 'click' };
  }
</script>

<button
  use:popperRef
  bind:this={trigger}
  class:trigger={true}
  type="button"
  aria-haspopup="true"
  aria-expanded={$visibleStore.visible}
  on:click={handleClick}
  on:keydown={handleKeydown}
  on:click
  {...$$restProps}
  aria-label="Menu"
>
  <slot visible={$visibleStore.visible} />
</button>

<style lang="postcss">
  .trigger {
    @apply flex items-center select-none;
  }
</style>
