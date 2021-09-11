<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import routes from '$project/routes';

  export let profile: Profile;
  export let own: boolean;
</script>

<div class="flex flex-col justify-center items-center">
  {#if profile.profilePhotoUrl}
    <img src={`${profile.profilePhotoUrl}?t=${profile.updatedAt}`} alt="" class="w-24 h-24 p-1 rounded-full" />
  {/if}
  <div class="text-xl md:text-2xl font-medium mt-6">
    {#if profile.firstName && profile.lastName}
      {profile.firstName} {profile.lastName}
    {:else}
      @{profile.username}
    {/if}
  </div>
  {#if profile.tagline}
    <div class="mt-2 text-sm font-medium text-white-opacity-50 text-center">{profile.tagline}</div>
  {/if}
  {#if own}
    <div class="flex border border-opacity-20 rounded-md overflow-hidden mt-6">
      <div class="border-r border-opacity-20">
        <a
          href={routes.wallet}
          class="flex items-center justify-center gap-2 hover:bg-primary text-center py-3 px-5 w-full h-full"
          >My Wallet</a
        >
      </div>
      <div>
        <a
          href={routes.account}
          class="flex items-center justify-center gap-2 hover:bg-primary text-center py-3 px-5 w-full h-full"
          >Account Settings</a
        >
      </div>
    </div>
  {/if}
</div>
