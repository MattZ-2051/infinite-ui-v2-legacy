<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { Link } from './types';
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { browser } from '$app/env';
  import Links from './Links.svelte';

  export let user: User;
  export let links: Link[];

  const dispatch = createEventDispatcher();
  function onClose() {
    dispatch('close');
  }
  onMount(() => {
    document.body.classList.add('overflow-hidden');
  });

  onDestroy(() => {
    if (browser) {
      document.body.classList.remove('overflow-hidden');
    }
  });
</script>

<svelte:window on:sveltekit:navigation-start={onClose} />

<div class="w-full h-full flex light justify-end" on:click|self={onClose}>
  <div class="w-72 bg-black h-full " transition:fly={{ x: 200, duration: 700 }}>
    <div class="mt-36 text-xl flex flex-col items-center gap-10">
      <Links flatten {user} {links} />
    </div>
  </div>
</div>

<style>
  .light {
    background: rgba(0, 0, 0, 0.5);
  }
</style>
