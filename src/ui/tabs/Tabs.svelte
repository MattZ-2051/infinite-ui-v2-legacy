<script context="module" lang="ts">
  export type SelectedTab = Writable<string>;
  export type TabTitles = {
    registerTab(id: string, element: HTMLElement): void;
    updateHeader(id: string, data: unknown): void;
    unregisterTab(id: string): void;
  };
</script>

<script lang="ts">
  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import TabHeader from './TabHeader.svelte';

  /**
   * The appearance of the Tabs.
   */
  export let variant: 'default' | 'inverse' = 'default';

  /**
   * The default active tab id that is selected on start.
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

  let selectedTabStore = writable<string>(defaultSelectedId);
  let selfElement: HTMLElement;
  let headers = [];

  function activate(id: string, initial = false) {
    $selectedTabStore = id;

    if (!initial) {
      dispatch('select', id);
    }
  }

  function move(event: Event, moves: number) {
    event.preventDefault();

    const selectedIndex = headers.findIndex(({ id }) => id === $selectedTabStore);
    activate(headers[(headers.length + selectedIndex + moves) % headers.length].id);
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

  setContext('selectedTab', selectedTabStore);

  setContext('tabTitles', <TabTitles>{
    registerTab(id, tabElement) {
      // eslint-disable-next-line unicorn/prefer-spread
      const index = Array.from(selfElement.children).indexOf(tabElement);
      headers.splice(index, 0, { id });
      headers = headers;

      if (headers.length === 1 && !defaultSelectedId) {
        activate(id, true);
      }
    },
    updateHeader(id, { title, icon }) {
      const index = headers.findIndex((header) => header.id === id);
      if (index > -1) {
        headers[index].title = title;
        headers[index].icon = icon;
      }
    },
    unregisterTab(id) {
      const index = headers.findIndex((title) => title.id === id);
      if (index > -1) {
        headers.splice(index, 1);
        headers = headers;
      }
    },
  });
</script>

<div class={`tabs flex justify-between text-xl md:text-2xl ${variant} ${_class}`} {...$$restProps}>
  <ul role="tablist" class="flex gap-10" on:keydown={handleKeydown}>
    {#each headers as { id, title, icon } (id)}
      <TabHeader
        {id}
        {title}
        {icon}
        active={$selectedTabStore === id}
        class={`pb-5 ${itemClass}`}
        on:click={() => activate(id)}
      />
    {/each}
  </ul>
  <div><slot name="extra" /></div>
</div>

<div role="tabpanel" id={$selectedTabStore} aria-labelledby={`${$selectedTabStore}__item`} bind:this={selfElement}>
  <slot />
</div>

<style lang="postcss">
  .default {
    --tab-border-color: #ebebeb;
    --tab-color: #9e9e9e;
    --tab-active-border-color: #000000;
    --tab-active-color: #000000;
  }

  .inverse {
    --tab-border-color: #232323;
    --tab-color: #606060;
    --tab-active-border-color: #ffffff;
    --tab-active-color: #ffffff;
  }
  .tabs {
    box-shadow: inset 0 -2px var(--tab-border-color);
  }
</style>
