<script lang="ts">
  import { fly } from 'svelte/transition';
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import trapFocus from '$util/trapFocus';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { closeModal } from './store';

  export let title = '';
  export let footer = '';
  export let persistent = false;
  export let closeButton = true;

  let _class = '';
  export { _class as class };

  export let modalElement: HTMLElement = undefined;

  function onClose(reason: 'esc' | 'backdrop' | 'close') {
    if (persistent) {
      return;
    }

    if (!beforeClose || beforeClose(reason)) {
      setTimeout(() => close());
    }
  }

  export let beforeClose: (reason?: 'esc' | 'backdrop' | 'close') => boolean = undefined;

  export let close: () => void = () => closeModal();

  $: trapFocusConfig = {
    active: !!modalElement,
    focusTrapOptions: {
      allowOutsideClick: true,
      initialFocus: () => (modalElement.querySelector('[data-initial-focus]') as HTMLElement) || modalElement,
    },
  };
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && onClose('esc')} />
<ThemeContext id="modal">
  <div
    tabindex="-1"
    bind:this={modalElement}
    class="fixed top-0 left-0 bottom-0 right-0 backdrop-filter backdrop-blur-sm z-modal"
    use:trapFocus={trapFocusConfig}
  >
    <div
      class="h-full w-full absolute flex items-center justify-center"
      transition:fly={{ y: 50 }}
      on:mousedown|self={() => onClose('backdrop')}
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
            class="absolute right-10 top-8 text-black py-1 inline-flex items-center justify-center"
            ><Icon path={mdiClose} /></button
          >
        {/if}
        {#if $$slots.header || $$slots.title || title || $$slots.icon}
          <slot name="header">
            <header class="flex items-center gap-2 pt-8 pb-4 px-10">
              <slot name="icon" /><slot name="title"><div class="text-2xl font-normal pr-8">{title}</div></slot>
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
</ThemeContext>
