<script lang="ts">
  import type { ToastSeverity } from './types';
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { get } from 'svelte/store';
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';

  /**
   * Useful to manually remove the Toast using toast.remove(toastId).
   */
  export let toastId;

  /**
   * The content of the Toast.
   */
  export let message = '';

  /**
   * The severity of the Toast.
   */
  export let severity: ToastSeverity = 'info';
  /**
   * Delay in ms to close the Toast. If set to 0, the Toast needs to be closed manually.
   */
  export let duration = 5000;

  /**
   * Show close button.
   */
  export let closeable = true;

  /**
   * Keep the timer running or not on hover.
   */
  export let pauseOnHover = true;

  /**
   * Display or not the progress bar below the toast(remaining time).
   */
  export let showProgressBar = true;

  /**
   * When any element inside message with `data-toast=id` is clicked, calls `onClick[id]`.
   */
  export let onClick = undefined;

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

  function onMessageClick(event) {
    if (!onClick) {
      return;
    }

    const callbackId = event.target.dataset?.toast;
    if (callbackId && callbackId in onClick) {
      onClick[callbackId]();
    }
  }
</script>

<svelte:window on:focus={resumeToast} on:blur={pauseToast} />

<div
  class="shadow relative toast toast-{severity}"
  on:mouseenter={pauseOnHover ? pauseToast : undefined}
  on:mouseleave={pauseOnHover ? resumeToast : undefined}
  in:fly={{ x: 250 }}
  out:fly={$progress === MAX_VALUE ? { x: 250 } : { duration: 0 }}
  role="status"
>
  <div class="container flex items-center justify-between">
    <div class="toast-message" on:click={onMessageClick}>{@html message}</div>
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
  .toast {
    color: #000000;
  }

  .toast-danger {
    background: linear-gradient(89.89deg, #fb5543 0%, #f24c66 100%), #fc5746;
  }
  .toast-success {
    background: linear-gradient(89.89deg, #00eb7c 0%, #11d6ec 100%);
  }
  .toast-warning {
    background: linear-gradient(45deg, #ffae12, #f0da16 98.96%);
  }
  .toast-info {
    background: #5bc0de;
  }

  .toast-message :global(a) {
    text-decoration: underline;
  }

  .toast-message :global(a):hover {
    text-decoration: none;
  }
</style>
