<script lang="ts">
  import { loadWalletFx } from '$lib/features/wallet/wallet.store';
  import { userId } from '$lib/user';

  $: $userId && loadWalletFx();
</script>

<slot />
