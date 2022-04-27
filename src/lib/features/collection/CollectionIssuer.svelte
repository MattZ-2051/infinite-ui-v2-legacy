<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { styles } from '$util/styles';

  export let profile: Profile;
</script>

{#if profile?.bannerPhotoUrl}
  <div class="bg-black" style="height: 65vh;">
    <div
      class="container flex relative h-full bg-cover bg-no-repeat bg-center"
      style={styles({
        'background-image': profile?.bannerPhotoUrl && `url(${profile?.bannerPhotoUrl})`,
        'background-position-y': '15%',
      })}
    >
      <div
        class="absolute left-1/2 transform -translate-x-1/2 md:transform-none md:left-16 bottom-5 md:bottom-12 flex flex-col items-center gap-4"
      >
        <div
          class="h-24 w-24 md:h-36 md:w-36 rounded-full bg-contain bg-center"
          style={styles({ 'background-image': profile?.midPhotoUrl && `url(${profile?.midPhotoUrl})` })}
        />
        <div class="text-gray-400 text-2xl">@{profile.username}</div>
      </div>
    </div>
  </div>
{:else}
  <div class="flex flex-col justify-center items-center max-w-4xl mx-auto break-all">
    {#if profile.profilePhotoUrl}
      <img src={`${profile.profilePhotoUrl}?t=${profile.updatedAt}`} alt="" class="w-24 h-24 p-1 rounded-full" />
    {/if}
    <div class="text-3xl font-medium text-center mt-6 title-font">
      @{profile.username}
    </div>
    {#if profile.tagline}
      <div class="mt-2 text-xs sm:text-sm font-medium sm:text-gray-500 text-center">{profile.tagline}</div>
    {/if}
  </div>
{/if}

<div class="flex-grow">
  <div class="flex md:justify-end mt-8">
    <div class="flex flex-col w-full md:w-1/2">
      {#if profile.descriptionHeader}
        <div class="text-white text-3xl font-light">
          {profile.descriptionHeader}
        </div>
      {/if}
      {#if profile.descriptionBody}
        <div class="text-gray-400 mt-10 md:mt-16">
          {profile.descriptionBody}
        </div>
      {/if}
    </div>
  </div>
</div>
