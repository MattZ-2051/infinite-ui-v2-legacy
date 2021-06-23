<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';
  import { mdiClose } from '@mdi/js';
  import { browser } from '$app/env';
  import Icon from '$ui/icon/Icon.svelte';
  import Scrim from '$ui/scrim/Scrim.svelte';

  export let open = true;
  export let title = '';
  export let persistent = false;
  export let transition = { duration: 150, easing: quadIn, delay: 150 };

  $: browser && document.body.classList.toggle('overflow-hidden', open);

  const dispatch = createEventDispatcher();

  function onClose() {
    if (persistent) {
      return;
    }
    open = false;
    dispatch('close');
  }
</script>

{#if open}
  <div class="fixed w-full h-full top-0 left-0 z-40">
    <Scrim on:click={onClose} />
    <div class="h-full w-full absolute flex items-center justify-center z-20">
      <div in:scale={transition} class="relative rounded-3xl bg-white p-10 shadow text-black mx-4">
        {#if !persistent}
          <button
            type="button"
            on:click={onClose}
            data-style="close"
            title="Close"
            class="absolute right-5 top-4 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-0.5 inline-flex items-center justify-center"
            ><Icon path={mdiClose} size={0.8} /></button
          >
        {/if}
        {#if title || $$slots.title}
          <div class="text-2xl text-center font-normal pb-6">
            <slot name="title">{title}</slot>
          </div>
        {/if}
        <slot />
        {#if $$slots.actions}
          <div class="mt-8">
            <slot name="actions" />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
