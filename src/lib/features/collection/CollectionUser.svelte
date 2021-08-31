<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import imageError from '$util/imageError';
  import routes from '$lib/routes';

  export let profile: Profile;
  export let own: boolean;
</script>

<div class="flex flex-col justify-center items-center">
  <img
    src={`${profile.profilePhotoUrl}?t=${profile.updatedAt}`}
    alt=""
    class="w-24 h-24 p-1 rounded-full"
    use:imageError={() => (profile.profilePhotoUrl = undefined)}
  />
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

<!-- <div class="py-3 px-5 divide-x-2 bg-black bg-opacity-70 rounded-full text-white">
  <UserLink username={$user.username} class="mr-3">My Collection</UserLink>
  <span class="border-l border-gray-500 pl-4"
    ><a href={routes.wallet} sveltekit:prefetch class="link">My wallet</a></span
  >
</div> -->
