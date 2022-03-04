<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import type { FormElementVariant } from '../types';
  import { forwardEventsBuilder } from '$util/forwardEvents';
  import Button from '$lib/components/Button.svelte';
  import BaseElement from '../BaseElement.svelte';

  export let id = `input-${uid++}`;
  export let name = '';
  export let label = '';
  export let before = '';
  export let after = '';
  export let value = undefined;
  export let error: string | string[] = '';
  export let variant: FormElementVariant = 'base';
  export let isEthInput = false;
  export let withdrawableAmount = 0;
  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
  const hasBalance = withdrawableAmount > 0;
</script>

<BaseElement {id} {label} {error} {variant} class={_class} let:klass>
  {#if $$slots.before || before}
    <div class="input-icon flex-none mr-4"><slot name="before" class="flex-none">{before}</slot></div>
  {/if}
  <input use:forwardEvents {id} {name} class={klass} bind:value {...$$restProps} />
  {#if $$slots.after || after}
    <div class="input-icon flex-none"><slot name="after" class="flex-none">{after}</slot></div>
  {/if}
  {#if isEthInput}
    <Button
      type="button"
      variant="brand"
      class="w-1/2"
      --button-border-radius="0.5rem"
      disabled={!hasBalance}
      style
      on:click={() => (value = withdrawableAmount)}>Enter Max</Button
    >
  {/if}
</BaseElement>

<style lang="postcss">
  .input-icon {
    color: theme('colors.gray.500');
  }
  input {
    @apply placeholder-gray-500;
    padding: 0;
    text-align: inherit;
    background-color: transparent;
    min-height: var(--search-bar-min-size, 1.875rem);
    font-size: var(--search-bar-font-size, 1rem);
    text-transform: var(--search-bar-text-transform, none);
  }
</style>
