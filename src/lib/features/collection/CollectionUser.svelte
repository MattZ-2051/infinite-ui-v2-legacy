<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import routes from '$project/routes';

  export let profile: Profile;
  export let own: boolean;
</script>

<div class="flex flex-col justify-center items-center max-w-4xl mx-auto break-all">
  {#if profile.profilePhotoUrl}
    <img src={`${profile.profilePhotoUrl}?t=${profile.updatedAt}`} alt="" class="w-24 h-24 p-1 rounded-full" />
  {/if}
  <div class="text-xl md:text-2xl font-medium text-center mt-6">
    {#if profile.firstName && profile.lastName}
      {profile.firstName} {profile.lastName}
    {:else}
      @{profile.username}
    {/if}
  </div>
  {#if profile.tagline}
    <div class="mt-2 text-sm font-medium text-gray-500 text-center">{profile.tagline}</div>
  {/if}
  {#if own}
    <ButtonGroup
      class="grid grid-flow-col auto-cols-auto divide-x divide-gray-200 border border-gray-200 rounded-md overflow-hidden mt-6"
    >
      <a href={routes.wallet} class="flex items-center justify-center text-center py-3 px-5 w-full h-full">My Wallet</a>
      <a href={routes.account} class="flex items-center justify-center text-center py-3 px-5 w-full h-full"
        >Account Settings</a
      >
    </ButtonGroup>
  {/if}
</div>
