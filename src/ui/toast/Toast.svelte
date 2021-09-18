<script lang="ts">
  import type { ToastSeverity } from './types';
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { get } from 'svelte/store';

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
  on:mouseenter={pauseOnHover ? pauseToast : undefined}
  on:mouseleave={pauseOnHover ? resumeToast : undefined}
  in:fly={{ x: 250 }}
  out:fly={$progress === MAX_VALUE ? { x: 250 } : { duration: 0 }}
  role="status"
>
  <slot {severity} {message} {onMessageClick} {closeable} {close} {showProgressBar} progress={$progress} />
</div>
