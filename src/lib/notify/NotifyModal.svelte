<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { mdiBell } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import { toast } from '$ui/toast';
  import { notifyItem } from './notify.api';

  export let isOpen = false;
  export let profile: Profile;
  export let email: string;

  async function handleNotify() {
    try {
      await notifyItem({ email });
      toast.success('You will now be notified of upcoming news from this creator.');
    } catch {
      toast.danger(`There was a problem with your subscription.`);
    }
  }
</script>

<ConfirmModal labels={{ cancel: 'Go back', confirm: 'Subscribe' }} onConfirm={handleNotify} {isOpen}>
  <div slot="title" class="text-2xl">
    <span class="flex items-center gap-2"><Icon path={mdiBell} /><span>Notify me</span></span>
  </div>
  <div slot="message" class="flex flex-col  items-center py-5 gray-border font-semibold mb-10">
    <span class="gray-text">Subscribe and stay up to date on the newest</span>
    <div>
      <span class="gray-text">updates from</span>
      <UserLink username={profile.username} />
    </div>
  </div>
</ConfirmModal>

<style>
  .gray-text {
    color: #9e9e9e;
  }
  .gray-border {
    border-top: 1px solid #ebebeb;
  }
</style>
