<script lang="ts">
  import chevronDown from '$ui/accordion/assets/chevron-down';
  import Icon from '$ui/icon/Icon.svelte';

  export let active: boolean;
  export let collapsible: boolean;
  let _class = '';
  export { _class as class };
</script>

<div
  class="w-full flex items-center justify-between {_class}"
  on:click
  class:cursor-pointer={collapsible}
  {...$$restProps}
>
  <span class="flex-1 accordion-title">
    <slot />
  </span>
  {#if collapsible}
    <button type="button"
      ><Icon
        color="var(--accordion-title-icon-color, var(--default-color))"
        path={chevronDown}
        size="1.3"
        flip={active}
      />
      <span class="sr-only">{active ? 'Close' : 'Open'}</span>
    </button>
  {/if}
</div>

<style>
  .accordion-title {
    color: var(--accordion-title-color, var(--gray-500));
    font-family: var(--accordion-title-font);
  }
</style>
