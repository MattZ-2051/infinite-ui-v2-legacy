<script lang="ts">
  import { mdiAlertDecagram } from '@mdi/js';
  import { Modal, closeModal } from '$ui/modals';
  import Icon from '$ui/icon/Icon.svelte';
  import Button from './Button.svelte';

  export let isOpen: boolean;
  export let title = 'Are you sure?';
  export let message: string;
  export let onConfirm: () => unknown;
  export let labels = { cancel: 'Cancel', confirm: 'OK' };
  export let persistent = false;
</script>

{#if isOpen}
  <Modal on:close={closeModal} {persistent}>
    <svelte:fragment slot="icon">⚠️</svelte:fragment>
    <svelte:fragment slot="title"><span class="text-2xl">{title}</span></svelte:fragment>
    <div class="px-10">
      <p class="text-gray-500 font-extrabold italic text-center pt-10 pb-5 border-t border-gray-400">
        {@html message}
      </p>
    </div>

    <div slot="footer" class="flex flex-col gap-4">
      <Button type="button" on:click={onConfirm}>{labels?.confirm}</Button>
      <Button type="button" on:click={closeModal} theme="secondary">{labels?.cancel}</Button>
    </div>
  </Modal>
{/if}
