<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { MenuItems, VisibleStore } from './types';

  export let href = undefined;
  export let selected = false;
  export let disabled = false;

  const { registerItem, unregisterItem }: MenuItems = getContext('menuItems');
  let id = `menuitem-id-${uid++}`;
  let currenItemStore: Writable<string> = getContext('currenItemStore');
  let visibleStore: Writable<VisibleStore> = getContext('visibleStore');
  let selfElement: HTMLElement;
  let anchorElement: HTMLElement;

  $: $currenItemStore === id && anchorElement?.focus();

  onMount(() => {
    registerItem(id, selfElement);
  });

  onDestroy(() => {
    unregisterItem(id);
  });

  function handleClick(event: Event) {
    dispatch('select');
    $visibleStore = { visible: false, event, reason: 'select' };
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!href && event.key === 'Enter') {
      event.preventDefault();
      handleClick(event);
    }
  }

  let dispatch = createEventDispatcher<{ select: void }>();
</script>

<li bind:this={selfElement} role="presentation" on:click={handleClick} class:pointer-events-none={disabled}>
  <a
    bind:this={anchorElement}
    {href}
    class:selected
    class:disabled
    class:menu-item={true}
    role="menuitem"
    tabindex={-1}
    on:keydown={handleKeydown}
    {...$$restProps}
  >
    <slot />
  </a>
</li>

<style lang="postcss">
  .menu-item:not(.hidden) {
    @apply flex items-center flex-grow font-medium py-3 px-4 outline-none cursor-pointer;
    color: var(--menu-item-color);
    font-size: var(--menu-item-font-size, inherit);
    margin-right: var(--menu-item-margin, 0);
    margin-left: var(--menu-item-margin, 0);
    border-radius: var(--menu-item-border-radius, 0);
  }

  .menu-item.disabled {
    @apply opacity-50;
  }

  .menu-item.selected,
  .menu-item:focus:not(.disabled),
  .menu-item:hover {
    background: var(--menu-item-background-selected);
    color: var(--menu-item-color-selected);
  }
  li:first-child > a {
    margin-top: var(--menu-item-margin, 0);
  }
  li:last-child > a {
    margin-bottom: var(--menu-item-margin, 0);
  }

  li {
    border: var(--menu-item-border, none);
  }
  li:not(:nth-of-type(1)) {
    border-top: none;
  }
</style>
