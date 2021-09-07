<script lang="ts">
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { SelectedTab } from './types';

  export let id = undefined;

  let selectedTab: SelectedTab = getContext('selectedTab');
</script>

{#if $selectedTab.id === id}
  {#key id}
    <div in:fade {...$$restProps}>
      <slot />
    </div>
  {/key}
{/if}
