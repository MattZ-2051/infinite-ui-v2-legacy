<script lang="ts">
  import type { User } from '$lib/user/types';
  import { mdiAccount, mdiInformationVariant } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import imageError from '$util/imageError';
  import tooltip from '$ui/tooltip';
  import { passwordResetRequested } from './account.store';
  import AccountPhotoUpload from './AccountPhotoUpload.svelte';
  import AccountEditButton from './AccountEditButton.svelte';
  import AccountInfoForm from './AccountInfoForm.svelte';

  export let user: User;
  let editing = false;

  function onResetPassword() {
    passwordResetRequested({ email: user?.email });
  }
</script>

<div class="flex flex-col justify-center items-center">
  <div class="relative mb-8">
    <div class="relative flex justify-center items-center border-4 rounded-full overflow-hidden w-36 h-36 ">
      {#if user.profilePhotoUrl}
        <img
          src={`${user.profilePhotoUrl}?t=${user.updatedAt}`}
          alt={user.username}
          use:imageError={() => (user.profilePhotoUrl = undefined)}
        />
      {:else}
        <Icon path={mdiAccount} size="4" />
      {/if}
    </div>
    <AccountPhotoUpload />
  </div>
</div>
{#if !editing}
  <div class="flex flex-col">
    <div class="flex items-center justify-center gap-3 mb-2.5">
      <span class="text-2xl font-bold">@{user.username}</span>
      <AccountEditButton on:click={() => (editing = true)} />
    </div>
    {#if user.tagline}<span class="text-gray-700 font-black mb-5 text-center break-words">{user.tagline}</span>{/if}
  </div>
{:else}
  <AccountInfoForm on:closeForm={() => (editing = false)} {user} />
{/if}
<div class="flex flex-col gap-2 items-center mt-4 md:mt-24">
  <div class="flex flex-col gap-2 w-full">
    <span class="text-sm text-gray-500">Email</span>
    <div class="flex justify-between">
      <span class="font-bold">{user.email}</span>
      <div use:tooltip={'Your email uniquely identifies your account and cannot be changed.'}>
        <Icon path={mdiInformationVariant} class="px-1 bg-white bg-opacity-10 rounded-full" />
      </div>
    </div>
    <div style="height: 1px; background-color: #EBEBEB;" />
  </div>
  <button type="button" on:click={onResetPassword} class="mt-4 text-white link text-sm">Reset password</button>
</div>
