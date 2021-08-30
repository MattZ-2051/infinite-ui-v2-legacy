<script context="module" lang="ts">
  export type ActiveType = string | string[];
  export type AccordionContext = { multiple: boolean; activeStore: Writable<ActiveType> };
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';

  /** Whether we allow multiple items open at a time.	*/
  export let multiple = false;

  /** Id(s) of the active item(s).	*/
  export let active: ActiveType = [];

  const activeStore = writable<ActiveType>(active);

  setContext('Accordion', <AccordionContext>{
    multiple,
    activeStore,
  });

  $: $activeStore = active;
  $: updateProperties($activeStore);

  function updateProperties(store: ActiveType) {
    active = store;
  }
</script>

<div {...$$restProps}>
  <slot />
</div>
