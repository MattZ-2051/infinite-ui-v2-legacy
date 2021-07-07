<script lang="ts">
  import { wallet } from '$lib/features/wallet';
  import { loadWallet } from '$lib/features/wallet/wallet.api';
  import { user } from '$lib/user';

  $: $user && ($wallet || loadWallet());
</script>

<slot />
