<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import type { FormElementVariant } from '../types';
  import { forwardEventsBuilder } from '$util/forwardEvents';
  import BaseElement from '../BaseElement.svelte';

  export let id = `textarea-${uid++}`;
  export let name = undefined;
  export let label = '';
  export let value = undefined;
  export let error: string | string[] = '';
  export let helperText: string = '';
  export let variant: FormElementVariant = 'base';
  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<BaseElement {id} {label} {error} {variant} class={_class} {helperText} let:klass>
  <textarea use:forwardEvents {id} {name} class={klass} bind:value {...$$restProps} />
</BaseElement>

<style lang="postcss">
  textarea {
    padding: 0.5rem 0;
    resize: none;
    background-color: transparent;
    min-height: 1.875rem;
  }
</style>
