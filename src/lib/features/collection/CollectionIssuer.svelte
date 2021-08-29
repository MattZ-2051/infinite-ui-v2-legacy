<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import { styles } from '$util/styles';

  export let profile: Profile;
</script>

<div class="bg-black" style=" height: 65vh;">
  <div
    class="container flex relative h-full bg-cover bg-no-repeat  bg-center"
    style={styles({
      'background-image': profile.bannerPhotoUrl && `url(${profile.bannerPhotoUrl})`,
      'background-position-y': '15%',
    })}
  >
    <div
      class="absolute left-1/2 transform -translate-x-1/2 md:transform-none md:left-16 bottom-5 md:bottom-12 flex flex-col items-center gap-4"
    >
      <div
        class="h-24 w-24 md:h-36 md:w-36 rounded-full bg-contain bg-center"
        style={styles({ 'background-image': profile.midPhotoUrl && `url(${profile.midPhotoUrl})` })}
      />
      <div class="text-gray-400 text-2xl">@{profile.username}</div>
    </div>
  </div>
</div>
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
