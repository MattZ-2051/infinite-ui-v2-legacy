<script lang="ts">
  import WalletHead from './WalletHead.svelte';
  import WalletBalance from './WalletBalance.svelte';
  import WalletList from './WalletList.svelte';
  import AccountVerification from './kyc/AccountVerification.svelte';
</script>

<div>
  <WalletHead />
</div>
<div
  class="flex flex-col gap-x-24 gap-y-14 items-center md:flex-row md:justify-between mt-4 md:mt-16 md:items-baseline container"
>
  <div class="w-full md:w-1/5">
    <WalletBalance />
    <hr class="section-divider h-px m-5" />
    <div class="mb-2 mx-6">Account Verification Status:</div>
    <AccountVerification status={'unverified'} class="mx-8" />
  </div>
  <div class="w-full md:w-4/5"><WalletList /></div>
</div>

<style>
  .section-divider {
    background: rgba(0, 0, 0, 0.12);
  }
</style>
