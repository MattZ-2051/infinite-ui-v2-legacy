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
  /**
   * Class to be added on the title.
   */
  export let titleClass = '';

  let _class = '';
  export { _class as class };

  let disabled = false;

  async function onSelect(confirmed: boolean) {
    if (confirmed) {
      disabled = true;
      try {
        const result = onConfirm();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((result as any)?.then) {
          await result;
          closeModal();
        } else {
          closeModal();
          onConfirm();
        }
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
  <Modal class="max-w-md {_class}" {...$$restProps}>
    <svelte:fragment slot="title"
      ><span class="text-2xl text-left w-full modal-title {titleClass}">{title}</span></svelte:fragment
    >
    <div class="px-10 py-4">
      <slot name="message">
        {#if typeof message === 'string'}
          {@html message}
        {:else}
          <svelte:component this={message} {...messageData} />
        {/if}
      </slot>
    </div>
    <div slot="footer" class="flex flex-col gap-8 text-2xl font-normal">
      {#if labels?.confirm}
        <Button
          variant="brand"
          style="height: 4rem; border-radius: var(--button-confirm-modal-radius)"
          on:click={() => onSelect(true)}
          {disabled}
        >
          {labels.confirm}
        </Button>
      {/if}
      {#if labels?.cancel}
        <Button
          variant="outline-brand"
          style="height: 4rem; border-radius: var(--button-confirm-modal-radius)"
          on:click={() => onSelect(false)}
          {disabled}
        >
          {labels.cancel}
        </Button>
      {/if}
    </div>
  </Modal>
{/if}

<style>
  .modal-title {
    font-family: var(--modal-title-font);
  }

  @media (max-width: 768px) {
    .modal-title {
      max-width: 85%;
    }
  }
</style>
