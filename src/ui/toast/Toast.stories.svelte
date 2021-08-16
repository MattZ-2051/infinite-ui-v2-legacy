<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
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

<Template let:args>
  <Toast {...args} />
</Template>

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
      <ToastContainer />
    </div>
  </div>
</Story>
<Story name="Info" args={{ severity: 'info', message: 'Info', showProgressBar: false }} />
<Story name="Success" args={{ severity: 'success', message: 'Success', showProgressBar: false }} />
<Story name="Warning" args={{ severity: 'warning', message: 'Warning', showProgressBar: false }} />
<Story name="Danger" args={{ severity: 'danger', message: 'Danger', showProgressBar: false }} />
