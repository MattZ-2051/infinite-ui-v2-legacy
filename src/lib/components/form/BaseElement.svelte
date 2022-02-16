<script lang="ts">
  import clsx from 'clsx';
  import type { FormElementVariant } from './types';

  export let id;
  export let label = '';
  export let variant: FormElementVariant;
  export let error: string | string[] = '';
  let _class = '';
  export { _class as class };

  const klass = 'flex-grow appearance-none w-full focus:outline-none border-0 focus:ring-0 text-current';
</script>

<div>
  {#if label}
    <label for={id} class="form-element-label"><slot name="label">{label}</slot></label>
  {/if}
  <div class={clsx(_class, `${variant}-element`, 'form-element-container flex items-center')}>
    <slot {klass} />
  </div>
  {#if error}
    <div class="text-red-500 text-sm pt-1">{error}</div>
  {/if}
</div>

<style lang="postcss">
  .form-element-label {
    color: var(--form-element-label-color, theme('colors.gray.500'));
    font-size: var(--form-element-label-font-size, 0.875rem);
    display: flex;
    padding-bottom: 1px;
  }
  .base-element.form-element-container {
    padding-bottom: 0.125rem;
    border-color: theme('colors.gray.300');
    border-bottom-width: var(--base-element-border-bottom-width, 1px);
  }
  .rounded-element.form-element-container {
    @apply px-3 border border-transparent rounded-lg;
  }
  .form-element-container:focus-within {
    @apply border-current;
  }
</style>
