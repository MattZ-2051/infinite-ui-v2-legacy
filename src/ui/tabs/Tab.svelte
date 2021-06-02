<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';
  import type { ISelectedTab, ITabTitles } from './Tabs.svelte';

  export let id = `tab-id-${uid++}`;
  export let title: string;
  export let icon = null;

  let selfEl: HTMLElement;
  let selectedTab: ISelectedTab = getContext('selectedTab');
  const tabs: ITabTitles = getContext('tabTitles');

  function updateHeader(_title: string, _icon: unknown) {
    tabs.updateHeader(id, { title: _title, icon: _icon });
  }

  $: updateHeader(title, icon);

  onMount(() => {
    tabs.registerTab(id, selfEl);
    updateHeader(title, icon);
  });

  onDestroy(() => {
    tabs.unregisterTab(id);
  });
</script>

<div bind:this={selfEl}>
  {#if $selectedTab === id}
    <slot />
  {/if}
</div>
