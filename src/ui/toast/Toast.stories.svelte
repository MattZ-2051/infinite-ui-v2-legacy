<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import Toast from './Toast.svelte';
  import toast from './toast.store';
  import ToastContainer from './ToastContainer.svelte';
</script>

<Meta
  title="UI / Toast"
  component={Toast}
  argTypes={{
    severity: {
      options: ['info', 'success', 'warning', 'danger'],
      control: { type: 'select' },
    },
    toastId: {
      control: { type: 'text' },
    },
  }}
/>

<Story name="Usage" parameters={{ chromatic: { disableSnapshot: true } }}>
  <div class="flex">
    <div class="flex flex-col px-2">
      <button class="py-1" on:click={() => toast.info('Info')}>Info</button>
      <button class="py-1" on:click={() => toast.success('Success')}>Success</button>
      <button class="py-1" on:click={() => toast.warning('Warning')}>Warning</button>
      <button class="py-1" on:click={() => toast.danger('Danger', { toastId: 'danger' })}>Danger</button>
      <button
        class="py-1"
        on:click={() =>
          toast.danger('You can <a data-toast="cb">click me</a> for alert!', {
            onClick: { cb: () => alert('clicked!') },
          })}>Callback</button
      >
    </div>
    <div class="fixed top-0 left-28 right-0 text-xl italic font-extrabold z-50">
      <ToastContainer
        class="absolute top-0 left-0 right-0 overflow-hidden text-xl italic font-extrabold"
        let:severity
        let:message
        let:onMessageClick
        let:closeable
        let:close
        let:showProgressBar
        let:progress
      >
        <div class="shadow relative toast toast-{severity}">
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
    </div>
  </div>
</Story>

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
