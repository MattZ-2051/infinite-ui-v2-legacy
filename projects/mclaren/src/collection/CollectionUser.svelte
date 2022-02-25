<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import ButtonGroup from '$lib/components/ButtonGroup.svelte';
  import routes from '$project/routes';
  import Button from '$lib/components/Button.svelte';

  export let profile: Profile;
  export let own: boolean;
</script>

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
  {#if own}
    <ButtonGroup
      class="grid grid-flow-row gap-y-2 md:grid-flow-col auto-cols-auto overflow-hidden mt-6 gap-x-7 w-full sm:w-auto "
    >
      <Button
        href={routes.wallet}
        class="flex items-center justify-center text-center py-3 px-5  mx-2 sm:mx-0 sm:w-60"
        variant="outline-brand">My Wallet</Button
      >
      <Button
        href={routes.account}
        class="flex items-center justify-center text-center py-3 px-5 mx-2 sm:mx-0 sm:w-60"
        variant="outline-brand">Account Settings</Button
      >
    </ButtonGroup>
  {/if}
</div>

<style>
  .title-font {
    font-family: var(--second-font);
  }
</style>
