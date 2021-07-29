<script context="module" lang="ts">
  export type ISelectedTab = Writable<string>;
  export type ITabTitles = {
    registerTab(id: string, element: HTMLElement): void;
    updateHeader(id: string, data: unknown): void;
    unregisterTab(id: string): void;
  };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import Icon from '$ui/icon/Icon.svelte';
  import TabHeader from './TabHeader.svelte';

  /**
   * The id of the selected Tab.
   */
  export let selectedTabId: string = undefined;
  /**
   * Class to be added on each Tab.
   */
  export let itemClass: string = undefined;
  export let deactivateSingle = false;

  let selectedTabStore = writable<string>(selectedTabId);
  let selfElement: HTMLElement;
  let headers = [];

  $: $selectedTabStore = selectedTabId;
  $: updateProperties($selectedTabStore);

  function updateProperties(value: string) {
    selectedTabId = value;
  }

  setContext('selectedTab', selectedTabStore);

  setContext('tabTitles', <ITabTitles>{
    registerTab(id, tabElement) {
      // eslint-disable-next-line unicorn/prefer-spread
      const index = Array.from(selfElement.children).indexOf(tabElement);
      headers.splice(index, 0, { id });
      headers = headers;

      if (headers.length === 1 && !selectedTabId) {
        $selectedTabStore = id;
      }
    },
    updateHeader(id, { title, icon }) {
      const tabIndex = headers.findIndex((header) => header.id === id);
      if (tabIndex > -1) {
        headers[tabIndex].title = title;
        headers[tabIndex].icon = icon;
      }
    },
    unregisterTab(id) {
      const tabIndex = headers.findIndex((title) => title.id === id);
      if (tabIndex > -1) {
        headers.splice(tabIndex, 1);
        headers = headers;
      }
    },
  });
</script>

<nav {...$$restProps}>
  <ul class="flex gap-10">
    {#each headers as { id, title, icon } (id)}
      <TabHeader
        on:click={() => ($selectedTabStore = id)}
        active={$selectedTabStore === id && (!deactivateSingle || headers.length > 1)}
        class={itemClass}
      >
        {#if icon}
          <Icon path={icon} class="h-6 w-6 mr-2 " />
        {/if}
        <span>{title}</span>
      </TabHeader>
    {/each}
  </ul>
  <div><slot name="extra" /></div>
</nav>

<div bind:this={selfElement}>
  <slot {selectedTabId} />
</div>

<style>
  nav {
    @apply flex;
    @apply justify-between;
    box-shadow: inset 0 -2px var(--tab-border-color, #ebebeb);
  }
</style>
