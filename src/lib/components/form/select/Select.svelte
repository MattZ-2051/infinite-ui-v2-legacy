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
  <select use:forwardEvents {id} {name} class="{klass} {_class}" {...$$restProps}>
    <slot />
  </select>
</BaseElement>

<style>
  select {
    padding-bottom: 0;
    padding-left: 0;
    background-position: right 0rem center;
    min-height: var(--input-height);
    background-color: var(--select-bg-color);
    color: var(--select-color);
  }
  select :global(option) {
    color: var(--select-option-color);
    background-color: var(--select-option-bg-color);
  }
</style>
