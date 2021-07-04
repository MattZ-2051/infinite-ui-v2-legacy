<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  export let title = '';
  export let footer = '';
  export let persistent = false;
  export let closeButton = true;

  const dispatch = createEventDispatcher();

  function onClose(reason?: string) {
    if (persistent) {
      return;
    }
    dispatch('close', reason);
  }
</script>

<div class="fixed top-0 left-0 bottom-0 right-0 z-40">
  <div
    class="h-full w-full absolute flex items-center justify-center z-20"
    transition:fly={{ y: 50 }}
    on:click|self={() => onClose('backdrop')}
  >
    <div class="flex flex-col relative rounded-lg bg-white shadow text-black" style="max-height: 90vh;">
      {#if !persistent && closeButton}
        <button
          type="button"
          on:click={() => onClose('close')}
          data-style="close"
          title="Close"
          class="absolute right-3 top-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-0.5 inline-flex items-center justify-center"
          ><Icon path={mdiClose} size={0.8} /></button
        >
      {/if}
      {#if $$slots.header || $$slots.title || title || $$slots.icon}
        <slot name="header">
          <header class="flex items-center justify-center gap-2 pt-8 pb-4 px-10">
            <slot name="icon" /><slot name="title"><div class="text-2xl text-center font-normal">{title}</div></slot>
          </header>
        </slot>
      {/if}
      <div class="overflow-y-auto"><slot /></div>
      {#if $$slots.footer || footer}
        <footer class="py-5 px-10">
          <slot name="footer">{footer}</slot>
        </footer>
      {/if}
    </div>
  </div>
</div>
