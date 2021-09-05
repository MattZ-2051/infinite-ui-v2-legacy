<script lang="ts">
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { TabItem } from './types';
  import type { Screens } from '$lib/media-query.store';
  import { media } from '$lib/media-query.store';
  import { browser } from '$app/env';
  import TabHeader from './TabHeader.svelte';
  import TabMenu from './TabMenu.svelte';

  /**
   * The items to render.
   */
  export let items: TabItem[] = [];

  /**
   * Below this size, Tabs will be rendered as Menu.
   */
  export let menuBreakpoint: keyof Screens = 'sm';

  /**
   * The tab id that is selected initially.
   * One of the `items` must have this id.
   */
  export let defaultSelectedId: string = undefined;

  /**
   * Class to be added on each Tab.
   */
  export let itemClass = '';

  let _class = '';
  /**
   * Extra classes.
   */
  export { _class as class };

  const dispatch = createEventDispatcher<{ select: string }>();

  let selectedTab = writable<TabItem>(items.find((item) => item.id === defaultSelectedId) || items[0]);
  $: renderDropdown = browser && items.length > 1 && menuBreakpoint && !$media[menuBreakpoint];
  $: dropdownItems = items.filter((item) => item.id !== $selectedTab.id);

  function activate(item: TabItem, initial = false) {
    $selectedTab = item;

    if (!initial) {
      dispatch('select', $selectedTab.id);
    }
  }

  function move(event: Event, moves: number) {
    event.preventDefault();

    const selectedIndex = items.findIndex(({ id }) => id === $selectedTab.id);
    activate(items[(items.length + selectedIndex + moves) % items.length]);
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        move(event, -1);
        return;
      case 'ArrowRight':
        move(event, 1);
        return;
      default:
    }
  }

  setContext('selectedTab', selectedTab);
</script>

<div class={`tabs flex justify-between ${_class}`} {...$$restProps}>
  <ul role="tablist" class="flex gap-10" on:keydown={handleKeydown}>
    {#if renderDropdown}
      <TabHeader {...$selectedTab} active={true} class={`pb-5 ${itemClass}`} />
      <TabMenu
        triggerClass={`pb-5 ${itemClass}`}
        items={dropdownItems}
        on:activate={({ detail }) => activate(detail)}
      />
    {:else}
      {#each items as item (item.id)}
        <TabHeader
          {...item}
          active={$selectedTab.id === item.id}
          class={`pb-5 ${itemClass}`}
          on:click={() => activate(item)}
        />
      {/each}
    {/if}
  </ul>
  {#if $$slots.extra}
    <div class="ml-4"><slot name="extra" /></div>
  {/if}
</div>

<div role="tabpanel" id={$selectedTab.id} aria-labelledby={`${$selectedTab.id}__item`}>
  <slot />
</div>

<style lang="postcss">
  .tabs {
    box-shadow: inset 0 -2px var(--tab-border-color);
  }
</style>
