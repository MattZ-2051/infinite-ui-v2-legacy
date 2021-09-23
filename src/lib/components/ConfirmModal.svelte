<script lang="ts">
  import { Modal, closeModal } from '$ui/modals';
  import Button from './Button.svelte';

  export let isOpen: boolean;
  export let title = 'Are you sure?';
  export let message = '';
  export let onConfirm: () => unknown;
  export let onCancel: () => unknown = undefined;
  export let labels = { cancel: 'Cancel', confirm: 'OK' };
  export let persistent = true;

  let disabled = false;

  async function onSelect(confirmed: boolean) {
    if (confirmed) {
      disabled = true;
      try {
        await onConfirm();
        closeModal();
      } catch {
        // Nothing special to do in case of error
      } finally {
        disabled = false;
      }
    } else {
      closeModal();
      if (onCancel) {
        onCancel();
      }
    }
  }
</script>

{#if isOpen}
  <Modal on:close={closeModal} {persistent} class="max-w-md">
    <svelte:fragment slot="title"><span class="text-2xl text-left w-full">{title}</span></svelte:fragment>
    <div class="px-10 py-5">
      <slot name="message">{@html message}</slot>
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button variant="brand" on:click={() => onSelect(true)} {disabled}>{labels?.confirm}</Button>
      <Button variant="outline-brand" on:click={() => onSelect(false)} {disabled}>{labels?.cancel}</Button>
    </div>
  </Modal>
{/if}
