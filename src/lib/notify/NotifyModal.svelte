<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { mdiBell } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { closeModal, Modal } from '$ui/modals';
  import UserLink from '$lib/components/UserLink.svelte';
  import NotifyForm from './NotifyForm.svelte';

  export let isOpen = false;
  export let profile: Profile;
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div slot="title" class="text-2xl">
      <span class="flex items-center gap-2"><Icon path={mdiBell} /><span>Notify me</span></span>
    </div>
    <div class="px-10 pb-10 ">
      <div class="flex flex-col  items-center py-5 gray-border font-semibold mb-10">
        <span class="gray-text">Subscribe and stay up to date on the newest</span>
        <div>
          <span class="gray-text">updates from</span>
          <UserLink username={profile.username} />
        </div>
      </div>

      <NotifyForm on:close={closeModal} />
    </div>
  </Modal>
{/if}

<style>
  .gray-text {
    color: #9e9e9e;
  }
  .gray-border {
    border-top: 1px solid #ebebeb;
  }
</style>
