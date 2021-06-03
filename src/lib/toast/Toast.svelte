<script context="module" lang="ts">
  import type { ToastType } from './toast.store';
  import { styles } from '$util/styles';

  const themes = {
    danger: 'linear-gradient(89.89deg, #FB5543 0%, #F24C66 100%), #FC5746;',
    success: 'linear-gradient(89.89deg, #00EB7C 0%, #11D6EC 100%);',
    warning: 'linear-gradient(45deg,#ffae12,#f0da16 98.96%)',
    info: '#5bc0de',
  };

  function getThemeStyle(key: ToastType) {
    return styles({ background: themes[key] });
  }
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';

  import Icon from '$ui/icon/Icon.svelte';
  import { mdiClose } from '@mdi/js';

  import toast from './toast.store';

  function remove(id: string) {
    toast.remove(id);
  }
</script>

<div data-style="toast-container" {...$$restProps}>
  {#each $toast as item (item.id)}
    <div class="shadow" style={getThemeStyle(item.type)} transition:fly={{ x: 250 }} role="status">
      <div class="container flex items-center justify-between">
        <div>{@html item.text}</div>
        {#if item.closeable}
          <button
            type="button"
            on:click={() => remove(item.id)}
            data-style="close"
            title="Close"
            class="rounded-full p-1 inline-flex items-center justify-center"
            ><Icon path={mdiClose} /></button
          >
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  [data-style='toast-container'] {
    display: flex;
    flex-direction: column;
  }

  [data-style='close'] {
    @apply bg-black;
    @apply bg-opacity-30;
    @apply text-gray-100;
    @apply hover:bg-opacity-60;
    @apply hover:text-white;
    @apply focus:outline-none;
    @apply focus:ring-2;
    @apply focus:ring-inset;
    @apply focus:ring-gray-600;
  }
</style>
