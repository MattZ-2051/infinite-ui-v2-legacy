<script lang="ts">
  import Wallethead from '$lib/wallet/wallet-head.svelte';
  import Walletbalance from '$lib/wallet/wallet-balance.svelte';
  import Walletlist from '$lib/wallet/wallet-list.svelte';
</script>

<div>
  <Wallethead />
</div>
<div
  class="flex flex-col gap-x-24 gap-y-14 items-center md:flex-row md:justify-between mt-4 md:mt-16 md:items-baseline container"
>
  <div class="w-full md:w-1/3"><Walletbalance /></div>
  <div class="w-full md:w-2/3"><Walletlist /></div>
</div>
