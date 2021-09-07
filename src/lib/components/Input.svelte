<script context="module" lang="ts">
  let uid = 1;
</script>

<script lang="ts">
  export let id = `input-${uid++}`;
  export let label = '';
  export let before = '';
  export let after = '';
  export let error: string | string[] = '';

  const klass = 'flex-grow appearance-none w-full focus:outline-none px-0.5 border-0 focus:ring-0 text-current';

  $: cols = +($$slots.before || before) + 1 + +($$slots.after || after);
</script>

<div {...$$restProps}>
  {#if label}
    <label for={id} class="input-label"><slot name="label">{label}</slot></label>
  {/if}
  <div class="input-container flex flex-cols-{cols} items-center text-default {error ? 'input-error' : ''}">
    {#if $$slots.before || before}
      <div class="flex-none mr-4"><slot name="before" class="flex-none">{before}</slot></div>
    {/if}
    <slot {klass} {id} />
    {#if $$slots.after || after}
      <div class="flex-none"><slot name="after" class="flex-none">{after}</slot></div>
    {/if}
  </div>
  {#if error}
    <div class="text-red-500 text-sm pt-1">{error}</div>
  {/if}
</div>

<style lang="postcss">
  .input-label {
    color: var(--input-label-color);
    font-size: var(--input-label-font-size);
    font-weight: var(--input-label-font-weight);
  }
  .input-container {
    border-color: var(--input-container-border-color);
    border-bottom-width: var(--input-container-border-width);
  }
  .input-error {
    border-color: var(--input-container-border-color-error);
  }
  .input-container:focus-within {
    border-color: var(--input-container-border-color-focus);
  }
  .input-container :global(input)::placeholder {
    @apply text-base;
    color: var(--input-placeholder-color);
  }
  .input-container :global(input) {
    min-height: var(--input-height);
    padding: var(--input-padding);
    background-color: var(--input-bg-color);
    border-radius: var(--input-border-radius);
    color: var(--input-color);
    margin-bottom: var(--input-margin-bottom);
  }
  .input-container :global(select) {
    min-height: var(--input-height);
    background-color: var(--select-bg-color);
    color: var(--select-color);
  }
  .input-container :global(option) {
    color: var(--select-option-color);
    background-color: var(--select-option-bg-color);
  }
</style>
