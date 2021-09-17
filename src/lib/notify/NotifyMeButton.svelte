<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { mdiBellOutline, mdiBellOffOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { userId } from '$lib/user';
  import notifyAction from './notify.use';
  import { subscription, fetchSubscriptionFx } from './subscriptions.store';

  const loading = fetchSubscriptionFx.pending;

  $: $userId && fetchSubscriptionFx(profile._id);

  let _class = '';
  export { _class as class };
  export let profile: Profile;
</script>

<button
  type="button"
  class={`flex items-center justify-center gap-2 hover:bg-primary text-center py-3 px-5 w-full h-full ${_class}`}
  disabled={$loading}
  use:notifyAction={{ profile }}
  ><Icon path={$subscription ? mdiBellOffOutline : mdiBellOutline} />
  {#if $subscription}
    Unsubscribe
  {:else}
    Notify Me
  {/if}
</button>
