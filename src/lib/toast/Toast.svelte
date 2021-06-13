<script lang="ts">
  import { fly } from 'svelte/transition';
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import toast from './toast.store';
  import { getThemeStyle } from './themes';

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
            title="Close"
            class="bg-black bg-opacity-30 text-gray-100 hover:bg-opacity-60 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600 rounded-full p-1 inline-flex items-center justify-center"
            ><Icon path={mdiClose} /></button
          >
        {/if}
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  [data-style='toast-container'] {
    display: flex;
    flex-direction: column;
  }
</style>
