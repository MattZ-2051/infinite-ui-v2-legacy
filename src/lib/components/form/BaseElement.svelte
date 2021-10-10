<script lang="ts">
  export let id;
  export let label = '';
  export let error: string | string[] = '';

  const klass = 'flex-grow appearance-none w-full focus:outline-none border-0 focus:ring-0 text-current';
</script>

<div {...$$restProps}>
  {#if label}
    <label for={id} class="input-label"><slot name="label">{label}</slot></label>
  {/if}
  <div class="input-container flex items-center text-default {error ? 'input-error' : ''}">
    <slot {klass} />
  </div>
  {#if error}
    <div class="input-text-error text-red-500 text-sm pt-1">{error}</div>
  {/if}
</div>

<style lang="postcss">
  .input-label {
    color: var(--input-label-color);
    font-size: var(--input-label-font-size);
    font-weight: var(--input-label-font-weight);
    display: flex;
    padding-bottom: 1px;
  }
  .input-container {
    border-color: var(--input-container-border-color);
    border-bottom-width: var(--input-container-border-width);
    padding-bottom: var(--input-container-padding-bottom);
  }
  .input-error {
    border-color: var(--input-container-border-color-error);
  }
  .input-text-error {
    text-align: var(--input-text-align);
  }
  .input-container:focus-within {
    border-color: var(--input-container-border-color-focus);
  }
</style>
