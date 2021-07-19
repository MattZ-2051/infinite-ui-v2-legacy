<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiShareVariantOutline, mdiLinkVariant } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { Modal, closeModal } from '$ui/modals';
  import { browser } from '$app/env';

  export let isOpen: boolean;
  export let title = 'Share this NFT';
  export let text = 'Own the best NFTs.';
  export let url: string = undefined;

  let copiedLink = false;
  async function onCopyLink() {
    await copy(url || window.location.href);
    copiedLink = true;
    setTimeout(closeModal, 200);
  }

  function supportsShareApi() {
    return browser && 'share' in navigator;
  }

  async function onShareApi() {
    closeModal();
    await navigator.share({
      text,
      url: url || window.location.href,
    });
  }
</script>

{#if isOpen}
  <Modal on:close={closeModal} title="" class="w-64">
    <svelte:fragment slot="title"><span class="text-3xl font-semibold italic">{title}</span></svelte:fragment>
    <div class="flex flex-col gap-4 p-10 pt-5 text-xl">
      <button type="button" on:click={onCopyLink} class="flex items-center gap-6 hover:text-blue-500"
        ><Icon path={mdiLinkVariant} />
        {#if copiedLink}
          <span>Copied!</span>
        {:else}
          <span>Copy link</span>
        {/if}
      </button>
      {#if supportsShareApi()}
        <button type="button" on:click={onShareApi} class="flex items-center gap-6 hover:text-blue-500"
          ><Icon path={mdiShareVariantOutline} /><span>Share via...</span></button
        >
      {/if}
    </div>
  </Modal>
{/if}
