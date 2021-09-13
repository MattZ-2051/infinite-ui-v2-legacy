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
    'button inline-flex items-center justify-center border',
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
    padding: var(--button-padding, 8px 24px);
    border-radius: var(--button-border-radius, 20px);
  }

  .primary {
    color: var(--button-primary-color, #ffffff);
    background-color: var(--button-primary-bg-color, var(--primary, #000000));
    border-color: var(--button-primary-border-color, var(--primary, #000000));
  }

  .secondary {
    color: var(--button-secondary-color, #000000);
    background-color: var(--button-secondary-bg-color, #ffffff);
    border-color: var(--button-secondary-border-color, var(--button-secondary-color-border, var(--primary, #000000)));
  }

  .tertiary {
    color: var(--button-tertiary-color, #000000);
    background-color: var(--button-tertiary-bg-color, #ffffff);
    border-color: var(--button-tertiary-border-color, #ffffff);
  }
</style>
