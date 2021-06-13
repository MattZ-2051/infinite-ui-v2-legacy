<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';
  import type { ISelectedTab, ITabTitles } from './Tabs.svelte';

  export let id = `tab-id-${uid++}`;
  export let title: string;
  export let icon = undefined;

  let selfElement: HTMLElement;
  let selectedTab: ISelectedTab = getContext('selectedTab');
  const tabs: ITabTitles = getContext('tabTitles');

  function updateHeader(_title: string, _icon: unknown) {
    tabs.updateHeader(id, { title: _title, icon: _icon });
  }

  $: updateHeader(title, icon);

  onMount(() => {
    tabs.registerTab(id, selfElement);
    updateHeader(title, icon);
  });

  onDestroy(() => {
    tabs.unregisterTab(id);
  });
</script>

<div bind:this={selfElement}>
  {#if $selectedTab === id}
    <slot />
  {/if}
</div>
