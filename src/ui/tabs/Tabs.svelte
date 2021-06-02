<script context="module" lang="ts">
  export type ISelectedTab = Writable<string>;
  export type ITabTitles = {
    registerTab(id: string, el: HTMLElement): void;
    updateHeader(id: string, data: unknown): void;
    unregisterTab(id: string): void;
  };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  import Icon from '$ui/icon/Icon.svelte';

  export let selectedTabId: string = null;

  let selectedTabStore = writable<string>(selectedTabId);
  let selfEl: HTMLElement;
  let headers = [];

  $: $selectedTabStore = selectedTabId;
  $: updateProps($selectedTabStore);

  function updateProps(value: string) {
    selectedTabId = value;
  }

  setContext('selectedTab', selectedTabStore);

  setContext('tabTitles', <ITabTitles>{
    registerTab(id, tabEl) {
      const index = Array.from(selfEl.children).indexOf(tabEl);
      headers.splice(index, 0, { id });
      headers = headers;

      if (headers.length === 1 && !selectedTabId) {
        $selectedTabStore = id;
      }
    },
    updateHeader(id, { title, icon }) {
      const tabIndex = headers.findIndex((title) => title.id === id);
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

<nav class="flex justify-between">
  <ul class="flex gap-10">
    {#each headers as { id, title, icon } (id)}
      <li
        class:active={$selectedTabStore === id}
        class="whitespace-nowrap transition-all ease-out duration-300"
      >
        <button
          type="button"
          on:click={() => ($selectedTabStore = id)}
          class="py-1 w-full h-full flex items-center justify-center focus:outline-none focus-visible:underline"
        >
          {#if icon}
            <Icon path={icon} class="h-6 w-6 mr-2 " />
          {/if}
          <span class="">{title}</span>
        </button>
      </li>
    {/each}
  </ul>
  <div><slot name="extra" /></div>
</nav>

<div bind:this={selfEl}>
  <slot {selectedTabId} />
</div>

<style>
  nav {
    box-shadow: inset 0 -2px var(--tab-border-color, #ebebeb);
  }

  li {
    color: var(--tab-color, #9e9e9e);
  }

  li:hover:not(.active) {
    box-shadow: inset 0 -2px var(--tab-color, #9e9e9e);
  }

  .active {
    box-shadow: inset 0 -2px var(--tab-active-border-color, #000000);
    color: var(--tab-active-color, #000000);
  }
</style>
