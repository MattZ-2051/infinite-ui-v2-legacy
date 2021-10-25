<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import type { FormElementVariant } from '../types';
  import { forwardEventsBuilder } from '$util/forwardEvents';
  import BaseElement from '../BaseElement.svelte';

  export let id = `select-${uid++}`;
  export let name = undefined;
  export let label = '';
  export let value = undefined;
  export let error: string | string[] = '';
  export let variant: FormElementVariant = 'base';
  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<BaseElement {id} {label} {error} {variant} class={_class} let:klass>
  <div class="select-container">
    <select use:forwardEvents {id} {name} class={klass} bind:value {...$$restProps}>
      <slot />
    </select>
  </div>
</BaseElement>

<style lang="postcss">
  .select-container {
    position: relative;
    flex: 1;
  }
  .select-container:after,
  .select-container:before {
    position: absolute;
    content: '';
    display: block;
    right: 0.5rem;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    pointer-events: none;
  }
  .select-container:before {
    border-bottom: 5px solid var(--gray-500);
    top: calc(0.875rem - 6px);
  }
  .select-container:after {
    border-top: 5px solid var(--gray-500);
    bottom: calc(0.875rem - 6px);
  }
  select {
    padding: 0;
    background-color: transparent;
    background-image: none;
    min-height: 1.875rem;
  }
  select :global(option) {
    color: var(--default-color);
    background-color: var(--bg-color);
  }
</style>
