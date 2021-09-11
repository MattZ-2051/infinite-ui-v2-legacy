<script lang="ts">
  import type { CollectorProduct } from '$lib/sku-item/types';
  import routes from '$project/routes';
  import SkuCollectorListItem from './SkuCollectorListItem.svelte';

  export let collectors: CollectorProduct[];
  export let skuId: string;
</script>

<div class="flex flex-col pt-5 gap-4">
  {#if collectors.length === 0}
    <span class="text-gray-400 self-center">No one owns this item yet</span>
    <div class="w-full border-b border-gray-100" />
  {:else}
    {#each collectors as collector}
      <SkuCollectorListItem {collector} />
    {/each}
    <a sveltekit:prefetch href={routes.collectors(skuId)} class="self-center text-lg mt-2 link">View all collectors</a>
  {/if}
</div>
