<script lang="ts">
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { ToastContainer } from '$ui/toast';
</script>

<ToastContainer
  class="absolute top-0 left-0 right-0 overflow-hidden text-xl italic font-extrabold"
  let:severity
  let:message
  let:onMessageClick
  let:closeable
  let:close
  let:showProgressBar
  let:progress
  let:classes
>
  <div class="shadow relative toast toast-{severity} {classes}">
    <div class="container flex items-center justify-between">
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
    {#if showProgressBar}
      <div
        role="progressbar"
        aria-label="notification timer"
        class="absolute bg-black bg-opacity-40 h-1 bottom-0 left-0"
        style="width: {progress * 100}%"
      />
    {/if}
  </div>
</ToastContainer>

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
