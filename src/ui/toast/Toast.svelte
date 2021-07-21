<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { get } from 'svelte/store';
  import { mdiClose } from '@mdi/js';
  import type { ToastSeverity } from './types';
  import Icon from '$ui/icon/Icon.svelte';
  import { getThemeStyle } from './themes';

  export let toastId: string;
  export let message: string;
  export let severity: ToastSeverity = 'info';
  export let duration = 5000;
  export let closeable = true;
  export let pauseOnHover = true;
  export let showProgressBar = true;

  const MIN_VALUE = 0;
  const MAX_VALUE = 1;
  const dispatch = createEventDispatcher<{ close: string }>();
  const progress = tweened(MIN_VALUE, { duration });

  $: $progress === MAX_VALUE && dispatch('close', toastId);

  onMount(() => {
    if (duration) {
      $progress = MAX_VALUE;
    }
  });

  function close(): void {
    progress.set(MAX_VALUE, { duration: 0 });
  }

  function resumeToast(): void {
    if (duration) {
      const value = get(progress);
      const remaining = duration - duration * value;
      progress.set(MAX_VALUE, { duration: remaining });
    }
  }

  function pauseToast(): void {
    if (duration) {
      const value = get(progress);
      progress.set(value, { duration: 0 });
    }
  }
</script>

<svelte:window on:focus={resumeToast} on:blur={pauseToast} />

<div
  class="shadow relative"
  style={getThemeStyle(severity)}
  on:mouseenter={pauseOnHover ? pauseToast : undefined}
  on:mouseleave={pauseOnHover ? resumeToast : undefined}
  in:fly={{ x: 250 }}
  out:fly={$progress === MAX_VALUE ? { x: 250 } : { duration: 0 }}
  role="status"
>
  <div class="container flex items-center justify-between">
    <div class="toast-message">{@html message}</div>
    {#if closeable}
      <button
        type="button"
        on:click={close}
        title="Close"
        class="bg-black bg-opacity-30 text-gray-100 hover:bg-opacity-60 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600 rounded-full p-1 inline-flex items-center justify-center"
        ><Icon path={mdiClose} /></button
      >
    {/if}
  </div>
  {#if showProgressBar}
    <div
      role="progressbar"
      aria-label="notification timer"
      class="absolute bg-black bg-opacity-40 h-1 bottom-0 left-0"
      style="width: {$progress * 100}%"
    />
  {/if}
</div>

<style>
  .toast-message :global(a) {
    text-decoration: underline;
  }

  .toast-message :global(a):hover {
    text-decoration: none;
  }
</style>
