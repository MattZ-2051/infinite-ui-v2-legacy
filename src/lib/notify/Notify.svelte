<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { user } from '$lib/user';
  import { subscription, fetchSubscriptionFx } from './subscriptions.store';
  import { handleNotify } from './notify.service';

  const loading = fetchSubscriptionFx.pending;

  $: $user && fetchSubscriptionFx(profile._id);

  export let profile: Profile;

  const notifyHandler = () => {
    handleNotify({ profile });
  };
</script>

<slot loading={$loading} subscription={$subscription} {notifyHandler} />
