<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import type { FormElementVariant } from '../types';
  import { forwardEventsBuilder } from '$util/forwardEvents';
  import BaseElement from '../BaseElement.svelte';

  export let id = `input-${uid++}`;
  export let name = '';
  export let label = '';
  export let before = '';
  export let after = '';
  export let value = undefined;
  export let error: string | string[] = '';
  export let variant: FormElementVariant = 'base';
  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<BaseElement {id} {label} {error} {variant} class={_class} let:klass>
  {#if $$slots.before || before}
    <div class="input-icon flex-none mr-4"><slot name="before" class="flex-none">{before}</slot></div>
  {/if}
  <input use:forwardEvents {id} {name} class={klass} bind:value {...$$restProps} />
  {#if $$slots.after || after}
    <div class="input-icon flex-none"><slot name="after" class="flex-none">{after}</slot></div>
  {/if}
</BaseElement>

<style lang="postcss">
  .input-icon {
    color: theme('colors.gray.500');
  }
  input {
    @apply placeholder-gray-500;
    padding: 0;
    background-color: transparent;
    min-height: 1.875rem;
  }
</style>
