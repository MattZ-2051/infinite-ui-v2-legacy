<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from '$ui/icon/Icon.svelte';
  import mdiClose from '$lib/components/icons/close';

  export let removable = true;
  export let href: string = undefined;
  export let truncate = true;
  export let hasError = false;
  let _class = '';
  export { _class as class };

  $: classes = `${_class} ${removable ? 'pr-8' : 'pr-2'} focus:outline-none focus:ring-2 ${
    hasError ? 'border border-red-600 text-red-600' : ''
  } ${truncate ? 'truncate' : ''}`;

  const dispatch = createEventDispatcher();
</script>

<div transition:fade={{ duration: 100 }} class="tag relative inline-flex items-center max-w-full">
  {#if href}
    <a {href} class={classes} {...$$restProps}><slot /></a>
  {:else}
    <span class={classes} {...$$restProps}><slot /></span>
  {/if}
  {#if removable}
    <button
      title="Remove"
      type="button"
      on:click={() => dispatch('remove')}
      class="absolute transform -translate-y-1/2"
      style="right: var(--tag-button-close-position-right, 0.25rem); top: var(--tag-button-close-position-top, 50%)"
    >
      <Icon path={mdiClose} size="var(--filter-icon-size, 1.13rem)" />
    </button>
  {/if}
</div>

<style style="postcss">
  .tag {
    color: var(--tag-color, theme('colors.inverse'));
    background-color: var(--tag-background, var(--primary-color));
    border-radius: var(--tag-border-radius, 0px);
    padding: var(--tag-padding, 0.25rem 0 0.25rem 0.5rem);
  }
</style>
