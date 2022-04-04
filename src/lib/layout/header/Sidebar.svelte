<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from './types';
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { browser } from '$app/env';
  import ThemeContext from '$lib/theme/ThemeContext.svelte';
  import { media } from '$lib/media-query.store';
  import Links from './Links.svelte';

  export let user: User;
  export let links: Link[];

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
      <div
        class="sidebar-content mt-[var(--header-height)] pt-20 px-6 h-full text-xl flex flex-col items-center gap-10"
      >
        <Links flatten {user} {links} on:select={onClose} />
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
  }
</style>
