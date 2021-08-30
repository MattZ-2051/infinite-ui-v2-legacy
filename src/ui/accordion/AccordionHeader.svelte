<script lang="ts">
  import { mdiChevronDown } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let active: boolean;
  export let collapsible: boolean;
  let _class = '';
  export { _class as class };
</script>

<div
  class="flex items-center justify-between py-4 px-6 {_class}"
  on:click
  class:cursor-pointer={collapsible}
  {...$$restProps}
>
  <button type="button" style="color: var(--accordion-title-color)"><slot /> </button>
  {#if collapsible}
    <Icon color="var(--accordion-title-icon-color)" path={mdiChevronDown} size="1.3" flip={active} />
  {/if}
</div>
