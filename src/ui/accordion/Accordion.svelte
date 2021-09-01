<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { getContext } from 'svelte';
  import type { AccordionContext } from './AccordionGroup.svelte';
  import AccordionHeader from './AccordionHeader.svelte';
  import { addItemToSelection, isItemActive } from './utils';

  /**
   * HTML element id used as key to define the active item(s).
   */
  export let id = `accordion-id-${uid++}`;

  /**
   * Whether the Accordion can collapse.
   */
  export let collapsible = true;

  /**
   * The title of the Accordion.
   */
  export let title = '';

  /**
   * Class to be added on each AccordionHeader.
   */
  export let titleClass = '';

  const { multiple, activeStore } = getContext<AccordionContext>('Accordion');

  function toggle() {
    if (collapsible) {
      $activeStore = addItemToSelection(id, multiple, $activeStore);
    }
  }

  $: active = collapsible ? isItemActive(id, multiple, $activeStore) : true;
</script>

<div {...$$restProps}>
  <AccordionHeader {id} on:click={toggle} {active} {collapsible} class={titleClass}>
    <slot name="title">{@html title}</slot></AccordionHeader
  >

  {#if active}
    <div class="accordion pb-5 pt-2 px-6">
      <slot />
    </div>
  {/if}
</div>
