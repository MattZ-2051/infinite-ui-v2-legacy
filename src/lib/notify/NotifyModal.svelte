<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import type { Subscription } from '$lib/notify/types';
  import { mdiBell } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import UserLink from '$lib/components/UserLink.svelte';
  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import { subscription, createSubscriptionFx, deleteSubscriptionFx } from './subscriptions.store';

  export let isOpen = false;
  export let profile: Profile;

  async function handleNotify() {
    await ($subscription
      ? deleteSubscriptionFx(($subscription as Subscription)._id)
      : createSubscriptionFx(profile._id));
  }
</script>

<ConfirmModal
  title={!$subscription ? 'Confirm your subscription' : 'Update your subscription'}
  labels={{ cancel: 'Go back', confirm: !$subscription ? 'Yes, please' : 'Unsubscribe' }}
  onConfirm={handleNotify}
  {isOpen}
>
  <div slot="title" class="text-3xl">
    <span class="flex items-center gap-2"
      ><Icon path={mdiBell} /><span>
        {#if !$subscription}
          Notify me
        {:else}
          Unsubscribe
        {/if}
      </span></span
    >
  </div>
  <div slot="message" class="flex flex-col items-center gray-border font-medium">
    <div>
      {#if !$subscription}
        <span class="text-gray-500">Stay in the loop on all exclusive releases and updates from</span>
        <UserLink username={profile.username} />
      {:else}
        <span class="text-gray-500">Unsubscribe from</span>
        <UserLink username={profile.username} /> <span class="text-gray-500">updates</span>
      {/if}
    </div>
  </div>
</ConfirmModal>
