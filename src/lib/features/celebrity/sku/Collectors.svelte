<script lang="ts">
  import type { Collector } from '$lib/sku-item/types';
  import CollectorItem from './CollectorItem.svelte';

  export let collectors: Collector[];
  export let max = 4;
  $: collectorList = max > 0 ? (collectors || []).slice(0, max) : collectors || [];
</script>

<div class="flex flex-col pt-5 gap-4">
  {#if collectorList.length === 0}
    <span class="text-gray-400 self-center">No one owns this item yet</span>
    <div class="w-full border-b border-gray-100" />
  {:else}
    {#each collectorList as collector}
      <CollectorItem {collector} />
    {/each}
    <a href="/" class="self-center text-lg mt-2">View all collectors</a>
  {/if}
</div>
