<script lang="ts">
  import type { TooltipInput } from '$ui/tooltip';
  import { mdiShare } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { openModal } from '$ui/modals';
  import SocialShareModal from './SocialShareModal.svelte';

  export let tooltip: TooltipInput = '';
  let _class = '';
  export { _class as class };

  function openSocialShare() {
    openModal(SocialShareModal);
  }
</script>

<button
  type="button"
  on:click={openSocialShare}
  class="bg-white text-black hover:bg-black hover:text-white shadow-sm p-1.5 rounded-full transition duration-300 ease-in-out {_class ||
    ''}"
  {...$$restProps}
>
  <Icon size="20px" path={mdiShare} {tooltip} />
</button>
