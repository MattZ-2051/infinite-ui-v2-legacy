<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { mdiWindowClose } from '@mdi/js';
  import { browser } from '$app/env';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { media } from '$lib/media-query.store';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$ui/icon/Icon.svelte';

  export let Logo;

  const dispatch = createEventDispatcher();
  function onClose() {
    dispatch('close');
  }

  $: if ($media.md) onClose();

  onMount(() => {
    document.body.classList.add('overflow-hidden');
  });

  onDestroy(() => {
    if (browser) {
      document.body.classList.remove('overflow-hidden');
    }
  });
</script>

<ThemeContext id="sidebar-menu">
  <div class="w-full h-full flex light justify-end" on:click|self={onClose}>
    <div
      class="sidebar-container h-full"
      transition:fly={{ x: 200, duration: 700 }}
      style="background-color:var(--mobile-menu-background-color, black)"
    >
      <div class="sidebar-content pt-20 text-xl flex flex-col items-center">
        <div class="flex items-center justify-between w-full p-4 header">
          <svelte:component this={Logo} />
          <Button on:click={onClose} class="!p-0">
            <Icon path={mdiWindowClose} />
          </Button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</ThemeContext>

<style>
  .light {
    background: var(--mobile-menu-overlay-color, rgba(0, 0, 0, 0.5));
  }
  .sidebar-container {
    width: var(--mobile-menu-width, theme('width.72'));
  }
  .sidebar-content {
    background: var(--mobile-menu-content-background-color, none);
    padding-top: var(--mobile-menu-padding-top, theme('padding.20'));
    height: calc(100vh - var(--header-height));
    gap: var(--mobile-menu-links-gap, 2.5rem);
  }

  .header {
    border-bottom: 1px solid var(--mobile-menu-header-border-color, #fff);
    height: var(--header-height);
  }
</style>
