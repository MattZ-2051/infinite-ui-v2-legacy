<script lang="ts">
  import { get_current_component } from 'svelte/internal';
  import { forwardEventsBuilder } from '../../util/forwardEvents';

  export let type = 'button';
  export let href: string = undefined;
  export let disabled = false;
  export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  let _class = '';
  export { _class as class };

  const forwardEvents = forwardEventsBuilder(get_current_component());
  let classes = '';
  // TODO: refactor with clsx when import issue is resolved
  $: classes = `${_class} ${variant} button inline-block text-xl text-center rounded-full p-4 w-full ${
    disabled ? 'opacity-50 pointer-events-none cursor-default' : 'hover:scale-105 transform duration-200'
  }`;
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
  }

  .primary {
    color: var(--button-primary-text-color, #ffffff);
    background-color: var(--button-primary-background-color, #000000);
    border-color: var(--button-primary-color-border, #000000);
  }

  .secondary {
    color: var(--button-secondary-text-color, #000000);
    background-color: var(--button-secondary-background-color, #ffffff);
    border-color: var(--button-neutral-color-border, #000000);
  }

  .tertiary {
    color: var(--button-tertiary-text-color, #000000);
    background-color: var(--button-tertiary-background-color, #ffffff);
    border-color: var(--button-tertiary-color-border, #ffffff);
  }
</style>
