<script lang="ts">
  import type { Profile, Sku } from '$lib/sku-item/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import routes from '$project/routes';

  export let issuer: Profile;
  export let sku: Sku = undefined;
  export let hideTalentImage = false;

  $: link = sku ? routes.sku(sku._id) : routes.collection(issuer.username);
  $: description = sku ? sku.descriptionShort : issuer.descriptionShort;
</script>

<div
  class="hidden md:block bg-white-opacity-75 absolute inset-0 p-2 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
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
          {description || ''}
        </div>
      </div>
    </div>
    <a href={link} class="text-primary font-medium text-lg mt-2 self-end">Learn more</a>
  </div>
</div>

<style lang="postcss">
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
