<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';
  import BaseElement from '../BaseElement.svelte';

  export let id = `select-${uid++}`;
  export let name = undefined;
  export let label = '';
  export let error: string | string[] = '';
  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<BaseElement {id} {name} {label} {error} let:klass>
  <div class="select-container">
    <select use:forwardEvents {id} {name} class="{klass} {_class}" {...$$restProps}>
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
    padding-bottom: 0;
    padding-left: 0;
    background-image: none;
    min-height: var(--input-height);
    background-color: var(--select-bg-color);
    color: var(--select-color);
  }
  select :global(option) {
    color: var(--select-option-color);
    background-color: var(--select-option-bg-color);
  }
</style>
