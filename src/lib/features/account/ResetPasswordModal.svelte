<script lang="ts">
  import { Modal, closeModal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';

  export let onConfirm: () => void;
  export let isOpen: boolean;
  export let onCancel: () => unknown = undefined;

  async function onCancelButton() {
    closeModal();
    if (onCancel) {
      onCancel();
    }
  }
</script>

{#if isOpen}
  <Modal persistent={true} class="max-w-md">
    <svelte:fragment slot="title"><span class="text-2xl">Reset Password</span></svelte:fragment>
    <div class="px-10">
      Caution: clicking this button will log you out and trigger a password change flow. You will receive further
      instructions via email.
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button type="button" on:click={onConfirm}>Reset Password</Button>
      <Button type="button" on:click={onCancelButton} variant="outline-brand">Cancel</Button>
    </div>
  </Modal>
{/if}
