<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import trapFocus from '$util/trapFocus';

  export let title = '';
  export let footer = '';
  export let persistent = false;
  export let closeButton = true;

  let _class = '';
  export { _class as class };

  let modal: HTMLElement;
  const dispatch = createEventDispatcher();

  function onClose(reason?: string) {
    if (persistent) {
      return;
    }
    dispatch('close', reason);
  }
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && onClose('esc')} />
<div
  tabindex="-1"
  bind:this={modal}
  class="fixed top-0 left-0 bottom-0 right-0 backdrop-filter backdrop-blur-sm z-modal"
  use:trapFocus={{
    focusTrapOptions: {
      allowOutsideClick: true,
      initialFocus: () => modal.querySelector('[data-initial-focus]') || modal,
    },
  }}
>
  <div
    class="h-full w-full absolute flex items-center justify-center z-20"
    transition:fly={{ y: 50 }}
    on:click|self={() => onClose('backdrop')}
  >
    <div
      class="flex flex-col relative rounded-lg bg-white shadow text-black mx-2 {_class}"
      style="min-width: 24rem; max-height: 90vh;"
      {...$$restProps}
    >
      {#if !persistent && closeButton}
        <button
          type="button"
          on:click={() => onClose('close')}
          data-style="close"
          title="Close"
          class="absolute right-3 top-3 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-0.5 inline-flex items-center justify-center z-10"
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
