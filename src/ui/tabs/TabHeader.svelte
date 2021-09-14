<script lang="ts">
  import { usePrevious } from 'svelte-previous';
  import Icon from '$ui/icon/Icon.svelte';
  import addTooltip from '$ui/tooltip';

  export let id: string;
  export let active = false;
  export let title = '';
  export let icon = undefined;
  export let tooltip = '';
  let _class = '';
  export { _class as class };

  const [currentActive, previousActive] = usePrevious(active);
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
  {title}
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

<style>
  li {
    color: var(--tab-color);
  }

  li:hover:not(.active) {
    color: var(--tab-color-hover);
  }

  .active {
    box-shadow: inset 0 -2px var(--tab-border-color-active);
    color: var(--tab-color-active);
  }
</style>
