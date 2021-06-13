<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import { mdiChevronDown } from '@mdi/js';

  export let open: boolean;
  export let collapsible: boolean;
</script>

<div class="flex items-center justify-between pb-4" on:click class:cursor-pointer={collapsible}>
  <button type="button" class="text-xl md:text-2xl lg:text-2xl font-light" {...$$restProps}
    ><slot /></button
  >

  {#if collapsible}
    <Icon path={mdiChevronDown} flip={open} />
  {/if}
</div>

<style>
  div {
    border-bottom: var(--accordion-border-bottom, 2px solid #ebebeb);
  }

  button {
    color: var(--accordion-color, theme('colors.black'));
  }
</style>
