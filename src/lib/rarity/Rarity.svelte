<svelte:options immutable={true} />

<script lang="ts">
  import type { Rarity } from '$lib/sku-item/types';

  export let rarity: Rarity;
</script>

{#if rarity}
  <div data-style="container" {...$$restProps}>
    <div class="{rarity}-badge-color w-4 h-4 rounded-full mr-2" />
    <span class="{rarity}-text">{rarity.charAt(0).toUpperCase() + rarity.slice(1)}</span>
  </div>
{/if}

<style lang="postcss">
  [data-style='container'] {
    display: inline-flex;
    align-items: center;
    --common-start: #8e8e8e;
    --common-end: #8e8e8e;
    --uncommon-start: #777777;
    --uncommon-end: #777777;
    --rare-start: #11d6ec;
    --rare-end: #00eb7c;
    --epic-start: #e81cff;
    --epic-end: #40c9ff;
    --legendary-start: #fff72d;
    --legendary-end: #ff9412;
  }

  .common-badge-color {
    background: linear-gradient(45deg, #ffffff 0%, #8e8e8e 100%);
  }
  .common-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--common-start);
    --tw-gradient-from: var(--common-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
  .uncommon-badge-color {
    background: linear-gradient(45deg, #171717 0%, #777777 100%);
  }
  .uncommon-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--uncommon-start);
    --tw-gradient-from: var(--uncommon-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
  .rare-badge-color {
    background: linear-gradient(41.72deg, #00eb7c -14.01%, #11d6ec 90.62%);
  }
  .rare-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--rare-start);
    --tw-gradient-from: var(--rare-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
  .epic-badge-color {
    background: linear-gradient(45deg, var(--epic-end) 0%, var(--epic-start) 100%);
  }
  .epic-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--epic-start);
    --tw-gradient-from: var(--epic-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
  .legendary-badge-color {
    background: linear-gradient(45deg, #ff9412 0%, #fff72d 98.96%);
  }
  .legendary-text {
    @apply text-transparent bg-clip-text bg-gradient-to-tr;
    --tw-gradient-to: var(--legendary-start);
    --tw-gradient-from: var(--legendary-end);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(244, 114, 182, 0));
  }
</style>
