<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import clsx from 'clsx';
  import { forwardEventsBuilder } from '$util/forwardEvents';

  /**
   * The button's type.
   */
  export let type = 'button';

  /**
   * The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node.
   */
  export let href = undefined;

  /**
   * If true, the button will be disabled.
   */
  export let disabled = false;

  /**
   * The appearance of the button.
   */
  export let variant: 'base' | 'brand' | 'outline-brand' | 'invert-brand' = 'base';

  let _class = '';
  /**
   * Extra classes.
   */
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());

  $: classes = clsx(
    'button inline-flex items-center justify-center border select-none transition duration-200',
    _class,
    variant,
    disabled && 'opacity-50 pointer-events-none cursor-default'
  );
</script>

{#if href}
  <a
    aria-disabled={disabled}
    use:forwardEvents
    tabindex={disabled ? -1 : 0}
    href={disabled ? '' : href}
    class={classes}
    {...$$restProps}><slot /></a
  >
{:else}
  <button {type} use:forwardEvents {disabled} class={classes} {...$$restProps}><slot /></button>
{/if}

<style lang="postcss">
  .button {
    padding: var(--button-padding);
    border-radius: var(--button-border-radius);
    border-color: transparent;
  }
  .brand {
    color: var(--button-brand-color);
    background-color: var(--button-brand-bg-color);
    border-color: var(--button-brand-border-color);
  }
  .brand:hover {
    color: var(--button-brand-color-hover);
    background-color: var(--button-brand-bg-color-hover);
    border-color: var(--button-brand-border-color-hover);
  }
  .outline-brand {
    color: var(--button-outline-brand-color);
    background-color: var(--button-outline-brand-bg-color);
    border-color: var(--button-outline-brand-border-color);
  }
  .outline-brand:hover {
    color: var(--button-outline-brand-color-hover);
    background-color: var(--button-outline-brand-bg-color-hover);
    border-color: var(--button-outline-brand-border-color-hover);
  }
  .invert-brand {
    color: var(--button-brand-color-hover);
    background-color: var(--button-brand-bg-color-hover);
    border-color: var(--button-brand-border-color-hover);
  }
  .invert-brand:hover {
    color: var(--button-brand-color);
    background-color: var(--button-brand-bg-color);
    border-color: var(--button-brand-border-color);
  }
</style>
