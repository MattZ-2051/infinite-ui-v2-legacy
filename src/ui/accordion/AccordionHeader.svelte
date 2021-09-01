<script lang="ts">
  import { mdiChevronDown } from '@mdi/js';
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
  <span class="flex-1" style="color: var(--accordion-title-color)">
    <slot />
  </span>
  {#if collapsible}
    <button type="button"
      ><Icon color="var(--accordion-title-icon-color)" path={mdiChevronDown} size="1.3" flip={active} /></button
    >
  {/if}
</div>
