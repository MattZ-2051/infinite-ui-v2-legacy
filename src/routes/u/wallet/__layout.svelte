<script lang="ts">
  import { wallet } from '$lib/features/wallet';
  import { loadWallet } from '$lib/features/wallet/wallet.api';
  import { userId } from '$lib/user';

  $: $userId && ($wallet || loadWallet());
</script>

<slot />
