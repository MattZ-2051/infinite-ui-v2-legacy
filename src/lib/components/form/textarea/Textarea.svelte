<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';
  import BaseElement from '../BaseElement.svelte';

  export let id = `textarea-${uid++}`;
  export let name = undefined;
  export let label = '';
  export let error: string | string[] = '';
  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<BaseElement {id} {name} {label} {error} let:klass>
  <textarea use:forwardEvents {id} {name} class="{klass} {_class}" {...$$restProps} />
</BaseElement>

<style lang="postcss">
  textarea::placeholder {
    @apply text-base;
    color: var(--input-placeholder-color);
  }
  textarea {
    min-height: var(--input-height);
    padding: var(--input-padding);
    background-color: var(--input-bg-color);
    border-radius: var(--input-border-radius);
    color: var(--input-color);
    text-align: var(--input-text-align);
  }
</style>
