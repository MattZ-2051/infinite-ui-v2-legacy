<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { createEventDispatcher } from 'svelte';
  import { mdiAccount, mdiPencil } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import tooltip from '$ui/tooltip';

  export let profile: Profile;

  const dispatch = createEventDispatcher();
</script>

{#if profile}
  <div
    class="flex flex-col bg-img justify-center items-center bg-cover bg-center px-11 py-11"
    style={profile.bannerPhotoUrl ? `--photo-url: url(${profile.bannerPhotoUrl})` : ''}
  >
    <div
      class="group mb-3.5 flex justify-center items-center relative border-4 rounded-full w-36 h-36 overflow-hidden bg-black bg-opacity-70"
    >
      {#if profile.midPhotoUrl}
        <img src={profile.midPhotoUrl} alt={profile.username} />
      {:else}
        <Icon path={mdiAccount} size="4" class="text-white" />
      {/if}
      <div
        class="opacity-0 group-hover:opacity-100 upload absolute bg-black bg-opacity-70	bg-center bg-no-repeat cursor-pointer"
      />
    </div>
    <div class="flex items-center justify-center gap-2 mb-2.5">
      <span class="text-white	text-2xl">@{profile.username}</span>
      <button type="button" on:click={() => dispatch('edit')} use:tooltip={'Edit'}>
        <Icon
          path={mdiPencil}
          size="1.1"
          class="text-white bg-gray-800 hover:bg-gray-900 rounded-full p-1"
        />
      </button>
    </div>
    <span class="info italic font-black mb-5 text-center">{profile.tagline}</span>
    <div class="py-3 px-5 divide-x-2 bg-black bg-opacity-70 rounded-full text-white">
      <a href="/account/settings" class="pr-3">Account settings</a>
      <a href="/wallet" class="pl-4" style="border-color: #4f4f4f">My wallet</a>
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

  .upload {
    width: 32px;
    height: 32px;
    border-radius: 20px;
    background-image: url(/upload-avatar.svg);
  }

  .info {
    color: #cbcbcb;
  }
</style>
