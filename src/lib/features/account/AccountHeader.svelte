<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { createEventDispatcher } from 'svelte';

  export let profile: Profile;

  const dispatch = createEventDispatcher();
</script>

{#if profile}
  <div
    class="flex flex-col bg-img justify-center items-center bg-cover bg-center px-11"
    style="--photo-url: url({profile.bannerPhotoUrl})"
  >
    {#if profile.midPhotoUrl}
      <div class="group md:mt-11 mt-14 mb-3.5 flex justify-center items-center relative">
        <img
          class="avatar flex justify-center items-center border-4 bg-cover bg-center bg-no-repeat"
          src={profile.midPhotoUrl}
          alt="avatar"
        />
        <div
          class="opacity-0 group-hover:opacity-100 upload absolute bg-black bg-opacity-70	bg-center bg-no-repeat cursor-pointer"
        />
      </div>
    {/if}
    <div class="flex items-center justify-center gap-2 mb-2.5">
      <span class="text-white	text-2xl">@{profile.username}</span>
      <div
        on:click={() => dispatch('edit')}
        class="edit self-end w-6 h-6 bg-black bg-opacity-70 bg-center bg-no-repeat cursor-pointer"
      />
    </div>
    <span class="info italic font-black mb-5 text-center">{profile.tagline}</span>
    <div class="py-3 px-5 mb-11 divide-x-2 bg-black bg-opacity-70 rounded-full text-white">
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
      background-image: var(--photo-url);
    }
  }

  .avatar {
    width: 148px;
    height: 148px;
    border-radius: 68px;
  }

  .upload {
    width: 32px;
    height: 32px;
    border-radius: 20px;
    background-image: url(/upload-avatar.svg);
  }

  .edit {
    background-image: url(/edit.svg);
    border-radius: 20px;
  }

  .info {
    color: #cbcbcb;
  }
</style>
