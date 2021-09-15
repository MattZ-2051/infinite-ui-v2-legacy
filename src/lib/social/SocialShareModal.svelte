<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiLinkVariant, mdiTwitter, mdiFacebook, mdiLinkedin, mdiPinterest, mdiReddit } from '@mdi/js';
  import { shareTwitter } from 'web-social-share/dist/collection/utils/twitter';
  import { shareFacebook } from 'web-social-share/dist/collection/utils/facebook';
  import { reddit } from 'web-social-share/dist/collection/utils/reddit';
  import { pinterest } from 'web-social-share/dist/collection/utils/pinterest';
  import { linkedin } from 'web-social-share/dist/collection/utils/linkedin';
  import Icon from '$ui/icon/Icon.svelte';
  import { Modal, closeModal } from '$ui/modals';

  export let isOpen: boolean;
  export let title = 'Share';
  export let text: string;
  export let url: string;

  let copiedLink = false;

  $: socialMedia = [
    { id: 'facebook', label: 'Facebook', path: mdiFacebook },
    { id: 'twitter', label: 'Twitter', path: mdiTwitter },
    { id: 'linkedin', label: 'Linkedin', path: mdiLinkedin },
    { id: 'copy', label: copiedLink ? 'Copied!' : 'Copy Link', path: mdiLinkVariant },
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
        pinterest({ socialShareText: text, socialShareUrl: url });
        return;
      default:
        return;
    }
  }
</script>

{#if isOpen}
  <Modal {title} on:close={closeModal} style="width:512px; height:441px;">
    <div class="flex flex-wrap items-center justify-center font-medium ">
      {#each socialMedia as social}
        <button
          type="button"
          on:click={() => onShare(social.id)}
          class="group w-36 h-36 flex flex-col gap-2 items-center justify-center rounded-lg hover:bg-primary"
        >
          <div class="w-12 h-12 rounded-full bg-gray-700 group-hover:bg-white flex items-center justify-center">
            <Icon path={social.path} class="group-hover:text-primary text-white" />
          </div>
          <div class="group-hover:text-white">{social.label}</div>
        </button>
      {/each}
    </div>
  </Modal>
{/if}
