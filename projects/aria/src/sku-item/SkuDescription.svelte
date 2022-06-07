<script lang="ts">
  import type { Profile, Sku } from '$lib/sku-item/types';
  import type { SkuV2 } from '$lib/infinite-api-sdk/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import routes from '$project/routes';

  export let issuer: Profile;
  export let sku: Sku | SkuV2 = undefined;
  export let hideTalentImage = false;

  $: link = sku ? routes.sku(sku._id) : routes.collection(issuer.username);
  $: description = sku ? sku.descriptionShort : issuer.descriptionShort;
</script>

<a href={link} sveltekit:prefetch>
  <div
    class="hidden md:block bg-white-opacity-75 absolute inset-0 p-2 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
  >
    <div class="card-description-inner p-2 md:p-4 text-white h-full flex flex-col font-medium">
      <TalentLink
        profile={issuer}
        hideImage={hideTalentImage}
        class="text-primary text-xl md:text-2xl mb-2"
        imageClass="w-10 h-10"
        applyLink={false}
      />
      <div class="scrollbox">
        <div class="flex-1 overflow-hidden mb-2 md:mb-4">
          <div class="text-sm md:text-base text-black-opacity-70">
            {description || ''}
          </div>
        </div>
      </div>
    </div>
  </div>
</a>

<style lang="postcss">
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
