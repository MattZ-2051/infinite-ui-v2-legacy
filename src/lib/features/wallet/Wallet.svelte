<script lang="ts">
  import WalletHead from './WalletHead.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletList from './WalletList.svelte';
</script>

<div>
  <WalletHead />
</div>
<div
  class="flex flex-col gap-x-24 gap-y-14 items-center md:flex-row md:justify-between mt-4 md:mt-16 md:items-baseline container"
>
  <div class="w-full md:w-1/3"><WalletBalance /></div>
  <div class="w-full md:w-2/3"><WalletList /></div>
</div>
