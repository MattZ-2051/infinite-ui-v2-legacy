<script lang="ts">
  import { mdiWindowClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { ToastContainer } from '$ui/toast';
</script>

<ToastContainer
  class="absolute top-0 left-0 right-0 overflow-hidden flex flex-col gap-1"
  let:severity
  let:message
  let:onMessageClick
  let:closeable
  let:close
  let:classes
>
  <div class="toast toast-{severity} mx-auto {classes}">
    <div class="flex items-stretch gap-x-10 items-center justify-between">
      <div class="p-6 toast-message" on:click={onMessageClick}>{@html message}</div>
      {#if closeable}
        <button type="button" on:click={close} title="Close" class="p-4 toast-close toast-close-{severity}">
          <Icon path={mdiWindowClose} />
        </button>
      {/if}
    </div>
  </div>
</ToastContainer>

<style>
  .toast {
    border-radius: 0.5rem;
    color: #000000;
    max-width: fit-content;
  }

  .toast-close:hover {
    border-radius: 0 0.5rem 0.5rem 0;
    transition: background-color 500ms;
  }

  .toast-success {
    box-shadow: 0 8px 24px 0 #255c051f;
    background: #f0fbd1;
    color: #255c05;
  }

  .toast-success:hover {
    box-shadow: 0 8px 24px 0 #255c0533;
  }

  .toast-close-success:hover {
    background-color: #def8a4;
  }

  .toast-warning {
    box-shadow: 0 8px 24px 0 #705e011f;
    background: #fdfacc;
    color: #705e01;
  }

  .toast-warning:hover {
    box-shadow: 0 8px 24px 0 #705e0133;
  }

  .toast-close-warning:hover {
    background-color: #fcf59a;
  }

  .toast-info {
    box-shadow: 0 8px 24px 0 #002a5b1f;
    background: #c9fbfa;
    color: #002a5b;
  }

  .toast-info:hover {
    box-shadow: 0 8px 24px 0 #002a5b33;
  }

  .toast-close-info:hover {
    background-color: #95f4f8;
  }

  .toast-danger {
    box-shadow: 0 8px 24px 0 #7404111f;
    background: #fee6d0;
    color: #740411;
  }

  .toast-danger:hover {
    box-shadow: 0 8px 24px 0 #74041133;
  }

  .toast-close-danger:hover {
    background-color: #fdc7a2;
  }

  .toast-message :global(a) {
    text-decoration: underline;
  }

  .toast-message :global(a):hover {
    text-decoration: none;
  }
</style>
