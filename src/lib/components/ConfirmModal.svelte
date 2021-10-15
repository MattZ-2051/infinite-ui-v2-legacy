<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { Modal, closeModal } from '$ui/modals';
  import Button from './Button.svelte';

  export let isOpen: boolean;
  export let title = 'Are you sure?';
  export let message: string | SvelteComponent = '';
  export let messageData: { [key: string]: string | number } = {};
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
      <slot name="message">
        {#if typeof message === 'string'}
          {@html message}
        {:else}
          <svelte:component this={message} {...messageData} />
        {/if}
      </slot>
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button variant="brand" on:click={() => onSelect(true)} {disabled}>{labels?.confirm}</Button>
      <Button variant="outline-brand" on:click={() => onSelect(false)} {disabled}>{labels?.cancel}</Button>
    </div>
  </Modal>
{/if}
