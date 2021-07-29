<script lang="ts">
  import { getContext } from 'svelte';
  import type { AccordionContext } from './AccordionGroup.svelte';
  import AccordionHeader from './AccordionHeader.svelte';

  /**
   * Whether the Accordion is open.
   */
  export let open = false;

  /**
   * Whether the Accordion can collapse.
   */
  export let collapsible = true;

  /**
   * The title of the Accordion.
   */
  export let title = '';

  const close = () => (open = false);
  const toggle = () => {
    if (collapsible) {
      open = !open;
    }
  };
  const context: AccordionContext = getContext('Accordion');
  const setCurrent = context && context.setCurrent;

  $: isOpen = collapsible ? open : true;
  $: isOpen && setCurrent && setCurrent(close);
</script>

<slot name="header" {toggle} open={isOpen}>
  <AccordionHeader on:click={toggle} open={isOpen} {collapsible} {...$$restProps}
    ><slot name="title">{title}</slot></AccordionHeader
  >
</slot>

{#if isOpen}
  <slot />
{/if}
