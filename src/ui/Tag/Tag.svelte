<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiWindowClose } from '@mdi/js';
  import { fade } from 'svelte/transition';
  import Icon from '$ui/icon/Icon.svelte';

  export let removable = true;
  export let href: string = undefined;
  export let truncate = true;
  export let hasError = false;
  let _class = '';
  export { _class as class };

  $: classes = `${_class} ${removable ? 'pr-7' : 'pr-2'} pl-2 py-1 focus:outline-none focus:ring-2 ${
    hasError ? 'border border-red-600 text-red-600' : ''
  } ${truncate ? 'truncate' : ''}`;

  const dispatch = createEventDispatcher();
</script>

<div transition:fade={{ duration: 100 }} class="relative inline-flex items-center max-w-full">
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
      class="absolute transform -translate-y-1/2 top-1/2 right-1.5"
    >
      <Icon path={mdiWindowClose} size="0.75" />
    </button>
  {/if}
</div>
