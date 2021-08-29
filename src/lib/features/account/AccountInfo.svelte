<script lang="ts">
  import type { User } from '$lib/user/types';
  import { createEventDispatcher } from 'svelte';
  import { mdiAccount } from '@mdi/js';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import imageError from '$util/imageError';
  import routes from '$lib/routes';
  import { passwordResetRequested } from './account.store';
  import AccountPhotoUpload from './AccountPhotoUpload.svelte';
  import AccountEditButton from './AccountEditButton.svelte';

  export let user: User;

  const dispatch = createEventDispatcher();

  function onResetPassword() {
    passwordResetRequested({ email: user['http://schemas.microsoft.com/ws/2008/06/identity/id/meta'].email });
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
  <div class="flex items-center justify-center gap-3 mb-2.5">
    <span class="text-2xl font-bold">@{user.username}</span>
    <AccountEditButton on:click={() => dispatch('edit')} />
  </div>
  {#if user.tagline}<span class="text-white-opacity-70 font-black mb-5 text-center">{user.tagline}</span>{/if}

  <div class="flex justify-center">
    <Button href={routes.wallet} sveltekit:prefetch>My wallet</Button>
  </div>
  <button type="button" on:click={onResetPassword} class="mt-4 text-white link text-sm">Reset password</button>
</div>
