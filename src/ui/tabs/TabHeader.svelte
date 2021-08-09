<script lang="ts">
  import { usePrevious } from 'svelte-previous';
  import Icon from '$ui/icon/Icon.svelte';

  export let id: string;
  export let active = false;
  export let title = '';
  export let icon = undefined;
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
  class="cursor-pointer whitespace-nowrap transition-all ease-out duration-300 {_class || ''}"
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
    color: var(--tab-color, #9e9e9e);
  }

  li:hover:not(.active) {
    box-shadow: inset 0 -2px var(--tab-color, #9e9e9e);
  }

  .active {
    box-shadow: inset 0 -2px var(--tab-active-border-color, #000000);
    color: var(--tab-active-color, #000000);
  }
</style>
