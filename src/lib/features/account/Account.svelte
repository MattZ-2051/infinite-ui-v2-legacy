<script lang="ts">
  import type { User } from '$lib/user/types';
  import { openModal } from '$ui/modals';
  import AccountInfo from './AccountInfo.svelte';
  import AccountInfoModal from './AccountInfoModal.svelte';
  import AccountDetails from './AccountDetails.svelte';

  export let user: User;
</script>

<div class="container">
  <div class="text-2xl font-bold mt-6 mb-4">Account Settings</div>
  <div style="height: 2px; background-color: #EBEBEB;" />

  <div class="flex flex-col items-center md:flex-row md:items-start gap-x-24 gap-y-6 mt-6">
    <div class="w-full max-w-sm px-5 py-7" style="background-color: #1d1a54;">
      <AccountInfo {user} on:edit={() => openModal(AccountInfoModal)} />
    </div>

    <div class="w-full max-w-md px-5">
      <AccountDetails />
    </div>
  </div>
</div>
