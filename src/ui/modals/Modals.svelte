<script lang="ts">
  import { browser } from '$app/env';
  import { beforeNavigate } from '$app/navigation';
  import { modals, exitBeforeEnter, transitioning, closeAllModals } from './store';

  $: browser && document.body.classList.toggle('overflow-hidden', $modals.length > 0);

  beforeNavigate(closeAllModals);
</script>

{#if $modals.length > 0}
  <slot name="backdrop" />
{/if}

<slot>
  {#each $modals as modal, i (i)}
    <svelte:component
      this={modal.component}
      isOpen={i === $modals.length - 1 && !$transitioning}
      on:introstart={() => {
        $exitBeforeEnter = true;
      }}
      on:outroend={() => {
        $transitioning = false;
      }}
      {...modal.props || {}}
    />
  {/each}
</slot>
