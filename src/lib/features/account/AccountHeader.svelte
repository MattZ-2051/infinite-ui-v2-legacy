<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiAccount, mdiPencil } from '@mdi/js';
  import { user } from '$lib/user';
  import AvatarUpload from '$lib/features/account/AvatarUpload.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';
  import UserLink from '$lib/components/UserLink.svelte';
  import imageError from '$util/imageError';
  import routes from '$lib/routes';
  import { passwordResetRequested } from './account.store';

  const dispatch = createEventDispatcher();

  function onResetPassword() {
    passwordResetRequested({ email: $user['http://schemas.microsoft.com/ws/2008/06/identity/id/meta'].email });
  }
</script>

<div
  class="flex flex-col bg-img justify-center items-center bg-cover bg-center px-11 py-11"
  style={$user.bannerPhotoUrl ? `--photo-url: url(${$user.bannerPhotoUrl})` : ''}
>
  <div
    class="group mb-3.5 flex justify-center items-center relative border-4 rounded-full w-36 h-36 overflow-hidden bg-black bg-opacity-70"
  >
    {#if $user.profilePhotoUrl}
      <img
        src={`${$user.profilePhotoUrl}?t=${$user.updatedAt}`}
        alt={$user.username}
        use:imageError={() => ($user.profilePhotoUrl = undefined)}
      />
    {:else}
      <Icon path={mdiAccount} size="4" class="text-white" />
    {/if}
    <AvatarUpload />
  </div>
  <div class="flex items-center justify-center gap-2 mb-2.5">
    <span class="text-white	text-2xl">@{$user.username}</span>
    <button type="button" on:click={() => dispatch('edit')} use:tooltip={'Edit'}>
      <Icon path={mdiPencil} size="1.1" class="text-white bg-gray-800 hover:bg-gray-900 rounded-full p-1" />
    </button>
  </div>
  {#if $user.tagline}<span class="info italic font-black mb-5 text-center">{$user.tagline}</span>{/if}
  <div class="py-3 px-5 divide-x-2 bg-black bg-opacity-70 rounded-full text-white">
    <UserLink username={$user.username} class="mr-3">My Collection</UserLink>
    <span class="border-l border-gray-500 pl-4"
      ><a href={routes.wallet} sveltekit:prefetch class="link">My wallet</a></span
    >
  </div>
  <button type="button" on:click={onResetPassword} class="mt-4 text-white link text-sm">Reset password</button>
</div>

<style>
  .bg-img {
    background-color: #0d0d0d;
  }

  @media only screen and (min-width: 600px) {
    .bg-img {
      background-image: var(--photo-url, url(/user-header-bg.jpg));
    }
  }

  .info {
    color: #cbcbcb;
  }
</style>
