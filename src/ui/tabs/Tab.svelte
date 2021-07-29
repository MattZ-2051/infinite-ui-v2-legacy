<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { SelectedTab, TabTitles } from './Tabs.svelte';

  export let id = `tab-id-${uid++}`;
  export let title: string;
  export let icon = undefined;

  let selfElement: HTMLElement;
  let selectedTab: SelectedTab = getContext('selectedTab');
  const tabs: TabTitles = getContext('tabTitles');

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
    {#key id}
      <div in:fade>
        <slot />
      </div>
    {/key}
  {/if}
</div>
