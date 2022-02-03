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
    'button inline-flex items-center justify-center border select-none transition duration-200 relative z-10',
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
    background: var(--button-brand-bg, none var(--button-brand-bg-color));
  }
  .brand:hover {
    color: var(--button-brand-color-hover);
    background-color: var(--button-brand-bg-color-hover);
    border-color: var(--button-brand-border-color-hover);
    background: var(--button-brand-bg-hover, none var(--button-brand-bg-color-hover));
  }
  .outline-brand {
    color: var(--button-outline-brand-color);
    background-color: var(--button-outline-brand-bg-color);
    border-color: var(--button-outline-brand-border-color);
    background: var(--button-outline-brand-bg, none var(--button-outline-brand-bg-color));
  }
  .outline-brand:hover {
    color: var(--button-outline-brand-color-hover);
    background-color: var(--button-outline-brand-bg-color-hover);
    border-color: var(--button-outline-brand-border-color-hover);
    background: var(--button-outline-brand-bg-hover, none var(--button-outline-brand-bg-color-hover));
  }

  .outline-brand:hover::after {
    position: absolute;
    top: var(--button-outline-brand-gradient-border-width-hover);
    bottom: var(--button-outline-brand-gradient-border-width-hover);
    left: var(--button-outline-brand-gradient-border-width-hover);
    right: var(--button-outline-brand-gradient-border-width-hover);
    content: '';
    z-index: -2;
    background: var(--button-outline-brand-gradient-color-border-hover, none transparent);
    border-radius: var(--button-border-radius);
  }
  .outline-brand:hover::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    z-index: -1;
    background: var(--button-outline-brand-bg-gradient-hover, none transparent);
    border-radius: var(--button-border-radius);
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
