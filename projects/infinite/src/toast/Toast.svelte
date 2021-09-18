<script lang="ts">
  import { mdiClose } from '@mdi/js';
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
>
  <div class="container py-3 pl-8 pr-3 rounded-full toast toast-{severity} mx-auto">
    <div class="flex gap-x-10 items-center justify-between">
      <div class="toast-message" on:click={onMessageClick}>{@html message}</div>
      {#if closeable}
        <button
          type="button"
          on:click={close}
          title="Close"
          class="bg-black bg-opacity-30 text-gray-900 hover:bg-opacity-60 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1 inline-flex items-center justify-center"
          ><Icon path={mdiClose} /></button
        >
      {/if}
    </div>
  </div>
</ToastContainer>

<style>
  .toast {
    max-width: fit-content;
    color: #000000;
  }

  .toast-danger {
    background: #f87474;
  }
  .toast-success {
    background: #ddf874;
  }
  .toast-warning {
    background: #f8c374;
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
