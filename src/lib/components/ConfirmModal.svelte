<script lang="ts">
  import { Modal, closeModal } from '$ui/modals';
  import Button from './Button.svelte';

  export let isOpen: boolean;
  export let title = 'Are you sure?';
  export let message: string;
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
  <Modal on:close={closeModal} {persistent} class="max-w-sm">
    <svelte:fragment slot="icon">⚠️</svelte:fragment>
    <svelte:fragment slot="title"><span class="text-2xl">{title}</span></svelte:fragment>
    <div class="px-10">
      <p class="text-gray-500 font-extrabold italic text-center pt-10 pb-5 border-t border-gray-400">
        {@html message}
      </p>
    </div>

    <div slot="footer" class="flex flex-col gap-4">
      <Button type="button" on:click={() => onSelect(true)} {disabled}>{labels?.confirm}</Button>
      <Button type="button" on:click={() => onSelect(false)} theme="secondary" {disabled}>{labels?.cancel}</Button>
    </div>
  </Modal>
{/if}
