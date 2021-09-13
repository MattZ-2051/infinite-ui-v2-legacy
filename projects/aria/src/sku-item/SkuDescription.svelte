<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import routes from '$project/routes';

  export let issuer: Profile;
  export let showBottomLink = false;
  export let hideTalentImage = false;
</script>

<div
  class="bg-white-opacity-75 absolute inset-0 p-2 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
>
  <div class="card-description-inner p-2 md:p-4 text-white h-full flex flex-col font-medium">
    <TalentLink
      profile={issuer}
      hideImage={hideTalentImage}
      class="text-primary text-xl md:text-2xl mb-2"
      imageClass="w-10 h-10"
    />
    <div class="scrollbox">
      <div class="flex-1 overflow-hidden mb-2 md:mb-4">
        <div class="text-sm md:text-base">
          {issuer.descriptionShort || ''}
        </div>
      </div>
    </div>
    {#if showBottomLink}
      <a href={routes.collection(issuer._id)} class="text-primary font-medium text-lg mt-2 self-end">Learn more</a>
    {/if}
  </div>
</div>

<style lang="postcss">
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
