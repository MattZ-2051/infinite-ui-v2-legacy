<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiAccount, mdiPencil } from '@mdi/js';
  import { userProfile } from '$lib/features/account/account.api';
  import AvatarUpload from '$lib/features/account/AvatarUpload.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';

  const dispatch = createEventDispatcher();
</script>

{#if $userProfile}
  <div
    class="flex flex-col bg-img justify-center items-center bg-cover bg-center px-11 py-11"
    style={$userProfile.bannerPhotoUrl ? `--photo-url: url(${$userProfile.bannerPhotoUrl})` : ''}
  >
    <div
      class="group mb-3.5 flex justify-center items-center relative border-4 rounded-full w-36 h-36 overflow-hidden bg-black bg-opacity-70"
    >
      {#if $userProfile.midPhotoUrl}
        <img src={$userProfile.midPhotoUrl} alt={$userProfile.username} />
      {:else}
        <Icon path={mdiAccount} size="4" class="text-white" />
      {/if}
      <AvatarUpload />
    </div>
    <div class="flex items-center justify-center gap-2 mb-2.5">
      <span class="text-white	text-2xl">@{$userProfile.username}</span>
      <button type="button" on:click={() => dispatch('edit', { profile: $userProfile })} use:tooltip={'Edit'}>
        <Icon path={mdiPencil} size="1.1" class="text-white bg-gray-800 hover:bg-gray-900 rounded-full p-1" />
      </button>
    </div>
    <span class="info italic font-black mb-5 text-center">{$userProfile.tagline}</span>
    <div class="py-3 px-5 divide-x-2 bg-black bg-opacity-70 rounded-full text-white">
      <a href="/u/account/settings" class="pr-3">Account settings</a>
      <a href="/u/wallet" class="pl-4" style="border-color: #4f4f4f">My wallet</a>
    </div>
  </div>
{/if}

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
