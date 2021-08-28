import { openModal } from '$ui/modals';
import SocialShareModal from './SocialShareModal.svelte';

const handleClick = () => {
  openModal(SocialShareModal);
};

export default function socialShare(node: HTMLButtonElement) {
  node.addEventListener('click', handleClick);

  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}
