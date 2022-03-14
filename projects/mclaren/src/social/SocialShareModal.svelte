<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiPinterest, mdiReddit } from '@mdi/js';
  import { shareTwitter } from 'web-social-share/dist/collection/utils/twitter';
  import { shareFacebook } from 'web-social-share/dist/collection/utils/facebook';
  import { reddit } from 'web-social-share/dist/collection/utils/reddit';
  import { pinterest } from 'web-social-share/dist/collection/utils/pinterest';
  import { linkedin } from 'web-social-share/dist/collection/utils/linkedin';
  import Icon from '$ui/icon/Icon.svelte';
  import { Modal, closeModal } from '$ui/modals';
  import linkedinIcon from '../assets/lib/social/linkedin';
  import twitterIcon from '../assets/lib/social/twitter';
  import facebookIcon from '../assets/lib/social/facebook';
  import linkVariantIcon from '../assets/lib/social/linkVariant';

  export let isOpen: boolean;
  export let title = 'Share';
  export let text: string;
  export let url: string;
  export let image = '';

  let copiedLink = false;

  $: socialMedia = [
    { id: 'facebook', label: 'Facebook', path: facebookIcon },
    { id: 'twitter', label: 'Twitter', path: twitterIcon },
    { id: 'linkedin', label: 'Linkedin', path: linkedinIcon },
    { id: 'copy', label: copiedLink ? 'Copied!' : 'Copy Link', path: linkVariantIcon },
    { id: 'reddit', label: 'Reddit', path: mdiReddit },
    { id: 'pinterest', label: 'Pinterest', path: mdiPinterest },
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
      case 'linkedin':
        linkedin({ socialShareText: text, socialShareUrl: url });
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
  <Modal style="width:512px; height:441px;">
    <span class="text-3xl" slot="title"> {title} </span>
    <div class="flex flex-wrap items-center justify-center font-medium ">
      {#each socialMedia as social}
        <button
          type="button"
          on:click={() => onShare(social.id)}
          class="group w-36 h-36 flex flex-col gap-2 items-center justify-center rounded-lg custom-share-button"
        >
          <div class="w-16 h-16 rounded-full flex items-center justify-center border border-gray-100">
            <Icon path={social.path} />
          </div>
          <div>{social.label}</div>
        </button>
      {/each}
    </div>
  </Modal>
{/if}

<style lang="postcss">
  .custom-share-button:hover {
    background: rgba(0, 0, 0, 0.05);
  }
</style>
