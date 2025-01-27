<script lang="ts">
  import { withPrevious } from 'svelte-previous';
  import Icon from '$ui/icon/Icon.svelte';
  import addTooltip from '$ui/tooltip';

  export let id: string;
  export let active = false;
  export let title = '';
  export let icon = undefined;
  export let tooltip = '';
  let _class = '';
  export { _class as class };

  const [currentActive, previousActive] = withPrevious(active);
  let anchorElement: HTMLAnchorElement;

  $: {
    $currentActive = active;

    if ($currentActive && $previousActive === false) {
      anchorElement?.focus();
    }
  }
</script>

<li
  on:click
  class:active
  title={tooltip ? '' : title}
  role="presentation"
  class="flex cursor-pointer whitespace-nowrap transition-all ease-out duration-300 {_class || ''}"
  use:addTooltip={tooltip}
>
  <a
    bind:this={anchorElement}
    role="tab"
    tabindex={active ? 0 : -1}
    id={`${id}__item`}
    aria-controls={id}
    aria-selected={active}
    class="flex items-center justify-center"
  >
    {title}
    {#if icon}
      <Icon path={icon} class="ml-2" />
    {/if}
  </a>
</li>

<style lang="postcss">
  li {
    color: theme('colors.gray.500');
    border-bottom: solid var(--tab-border-image-width-active, 0) transparent;
  }

  li:hover:not(.active) {
    @apply text-default;
  }

  .active {
    box-shadow: inset 0 -2px var(--tab-border-color-active, var(--default-color));
    color: var(--tab-color-active, var(--default-color));
  }

  .active,
  li:hover,
  li:focus {
    border-image: var(--tab-border-image-active, none) 2;
  }

  a {
    font-size: var(--tab-title-size, inherit);
    text-transform: var(--tab-title-transform, inherit);
    letter-spacing: var(--tab-title-text-spacing, inherit);
  }
</style>
