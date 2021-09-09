import type { Profile, Sku } from '$lib/sku-item/types';
import { isMobile } from 'web-social-share/dist/collection/utils/utils';
import { browser } from '$app/env';
import { openModal } from '$ui/modals';
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

  if (data.profile) {
    text = `Meet ${data.profile.username}`;
  } else if (data.sku) {
    text = `Check ${data.sku.name}`;
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
    openModal(SocialShareModal, { text, url, title });
  };

  node.addEventListener('click', handleClick);

  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}
