<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '$util/forwardEvents';
  import BaseElement from '../BaseElement.svelte';

  export let id = `input-${uid++}`;
  export let name = '';
  export let label = '';
  export let before = '';
  export let after = '';
  export let error: string | string[] = '';
  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
</script>

<BaseElement let:klass {id} {name} {label} {before} {after} {error}>
  {#if $$slots.before || before}
    <div class="input-icon flex-none mr-4"><slot name="before" class="flex-none">{before}</slot></div>
  {/if}
  <input use:forwardEvents {id} {name} class="{klass} {_class}" {...$$restProps} />
  {#if $$slots.after || after}
    <div class="input-icon flex-none"><slot name="after" class="flex-none">{after}</slot></div>
  {/if}
</BaseElement>

<style>
  .input-icon {
    color: var(--input-icon-color, var(--input-placeholder-color));
  }
  input::placeholder {
    @apply text-base;
    color: var(--input-placeholder-color);
  }
  input {
    min-height: var(--input-height);
    padding: var(--input-padding);
    background-color: var(--input-bg-color);
    border-radius: var(--input-border-radius);
    color: var(--input-color);
    text-align: var(--input-text-align);
  }
</style>
