import type { Profile, Sku, Product, SocialFileAsset } from '$lib/sku-item/types';
import { isMobile } from 'web-social-share/dist/collection/utils/utils';
import { browser } from '$app/env';
import { openModal } from '$ui/modals';
import { getFileType } from '$ui/file/file-utils';
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

export default function socialShare(
  node: HTMLButtonElement,
  data: { profile?: Profile; sku?: Sku; product?: Product }
) {
  let text = '';
  let socialImage: SocialFileAsset;

  if (data.profile) {
    text = `Meet ${data.profile.username}`;
    socialImage = chooseProfileSocialImage(data.profile);
  } else if (data.product) {
    text = `Check out my NFT collectible! ${data.product.sku.name}`;
    socialImage = chooseSkuSocialImage(data.product.sku);
  } else if (data.sku) {
    text = `Check out this NFT collectible! ${data.sku.name}`;
    socialImage = chooseSkuSocialImage(data.sku);
  }

  const url: string = window.location.href;
  const handleClick = (): void => {
    if (shouldUseShareApi()) {
      onShareApi({ text, url });
      return;
    }

    let title = 'Share';
    if (data.sku || data.product) {
      title = 'Share this collectible';
    }

    let socialImageUrl;
    if (getFileType(socialImage) === 'image') {
      socialImageUrl = socialImage?.url;
    }
    openModal(SocialShareModal, { text, url, title, image: socialImageUrl || CLIENT_SOCIAL_IMAGE.url });
  };

  node.addEventListener('click', handleClick);

  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}
