import type { Profile, Sku, SocialFileAsset } from '$lib/sku-item/types';
import { isMobile } from 'web-social-share/dist/collection/utils/utils';
import { browser } from '$app/env';
import { openModal } from '$ui/modals';
import { chooseSkuSocialImage, chooseProfileSocialImage } from '$lib/seo/seo.service';
import { CLIENT_SOCIAL_IMAGE } from '$project/variables';
import SocialShareModal from './SocialShareModal.svelte';

function shouldUseShareApi() {
  return browser && 'share' in navigator && isMobile();
}

async function onShareApi({ text, url }) {
  await navigator.share({
    text,
    url,
  });
}

export default function socialShare(node: HTMLButtonElement, data: { profile?: Profile; sku?: Sku }) {
  let text = '';
  let socialImage: SocialFileAsset;

  if (data.profile) {
    text = `Meet ${data.profile.username}`;
    socialImage = chooseProfileSocialImage(data.profile);
  } else if (data.sku) {
    text = `Check out my NFT collectible! ${data.sku.name}`;
    socialImage = chooseSkuSocialImage(data.sku);
  }

  const url: string = window.location.href;
  const handleClick = (): void => {
    if (shouldUseShareApi()) {
      onShareApi({ text, url });
      return;
    }

    let title = 'Share';
    if (data.sku) {
      title = 'Share this Collectible';
    }
    openModal(SocialShareModal, { text, url, title, image: socialImage?.url || CLIENT_SOCIAL_IMAGE.url });
  };

  node.addEventListener('click', handleClick);

  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}
