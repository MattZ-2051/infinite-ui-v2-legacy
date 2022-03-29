<script lang="ts">
  import copy from 'clipboard-copy';
  import { shareTwitter } from 'web-social-share/dist/collection/utils/twitter';
  import { shareFacebook } from 'web-social-share/dist/collection/utils/facebook';
  import { reddit } from 'web-social-share/dist/collection/utils/reddit';
  import { pinterest } from 'web-social-share/dist/collection/utils/pinterest';
  import {
    linkIcon,
    twitterIcon,
    facebookIcon,
    pinterestIcon,
    redditIcon,
  } from '$lib/components/icons/social/social-icons';
  import Icon from '$ui/icon/Icon.svelte';
  import { Modal, closeModal } from '$ui/modals';

  export let isOpen: boolean;
  export let title = 'Share';
  export let text: string;
  export let url: string;
  export let image = '';

  let copiedLink = false;

  $: socialMedia = [
    { id: 'facebook', label: 'Facebook', path: facebookIcon },
    { id: 'twitter', label: 'Twitter', path: twitterIcon },
    { id: 'copy', label: copiedLink ? 'Copied!' : 'Copy Link', path: linkIcon },
    { id: 'reddit', label: 'Reddit', path: redditIcon },
    { id: 'pinterest', label: 'Pinterest', path: pinterestIcon },
  ];

  async function onCopyLink() {
    await copy(url);
    copiedLink = true;
    setTimeout(closeModal, 200);
  }

  function onShare(id: string) {
    switch (id) {
      case 'copy':
        onCopyLink();
        return;
      case 'twitter':
        shareTwitter({
          socialShareText: text,
          socialShareUrl: url,
          socialSharePopupWidth: 700,
          socialSharePopupHeight: 800,
        });
        return;
      case 'facebook':
        shareFacebook({ socialShareUrl: url, socialSharePopupWidth: 700, socialSharePopupHeight: 700 });
        return;
      case 'reddit':
        reddit({ socialShareUrl: url, socialSharePopupWidth: 600, socialSharePopupHeight: 800 });
        return;
      case 'pinterest':
        pinterest({ socialShareText: text, socialShareUrl: url, socialShareMedia: image });
        return;
      default:
        return;
    }
  }
</script>

{#if isOpen}
  <Modal {title} style="width:512px; height:441px;">
    <span class="text-2xl" style="font-size: var(--share-title-size, inherit)" slot="title"> {title} </span>
    <div class="flex flex-wrap items-center justify-center font-medium ">
      {#each socialMedia as social}
        <button
          type="button"
          on:click={() => onShare(social.id)}
          class="group w-36 h-36 flex flex-col gap-2 items-center justify-center rounded-lg"
        >
          <div class="icon-container rounded-full flex items-center justify-center">
            <Icon path={social.path} />
          </div>
          <div class="icon-label">{social.label}</div>
        </button>
      {/each}
    </div>
  </Modal>
{/if}

<style lang="postcss">
  .icon-container {
    width: var(--share-icons-size, theme('width.12'));
    height: var(--share-icons-size, theme('height.12'));
    background: var(--share-icons-bg, theme('backgroundColor.gray.700'));
    border: var(--share-icons-border, 0) solid var(--share-icons-border-color, transparent);
    color: var(--share-icons-color, theme('textColor.white'));
  }
  .group:hover {
    background: var(--share-icons-hover-bg, theme('backgroundColor.primary'));
  }
  .group:hover .icon-container {
    background: var(--share-icons-hover-icon-bg, theme('backgroundColor.white'));
    color: var(--share-icons-hover-icon-color, theme('textColor.primary'));
  }
  .group:hover .icon-label {
    color: var(--share-icons-hover-label-color, theme('textColor.white'));
  }
</style>
