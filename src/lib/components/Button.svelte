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
   * If false, the button won't animate on hover.
   */
  export let animate = true;

  /**
   * The appearance of the button.
   */
  export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  let _class = '';
  /**
   * Extra classes.
   */
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());

  $: classes = clsx(
    'button inline-block text-center rounded-full w-full',
    _class,
    variant,
    disabled && 'opacity-50 pointer-events-none cursor-default',
    animate && !disabled && 'hover:scale-105 transform duration-200'
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
    border-width: var(--button-sizing-border, 2px);
    padding: var(--button-padding, 1rem);
    font-size: var(--button-text-size, 1.25rem);
    line-height: var(--button-line-height, 1.75rem);
  }

  .primary {
    color: var(--button-primary-text-color, #ffffff);
    background-color: var(--button-primary-bg-color, var(--primary, #000000));
    border-color: var(--button-primary-color-border, var(--primary, #000000));
  }

  .secondary {
    color: var(--button-secondary-text-color, #000000);
    background-color: var(--button-secondary-bg-color, #ffffff);
    border-color: var(--button-neutral-color-border, #000000);
  }

  .tertiary {
    color: var(--button-tertiary-text-color, #000000);
    background-color: var(--button-tertiary-bg-color, #ffffff);
    border-color: var(--button-tertiary-color-border, #ffffff);
  }
</style>
