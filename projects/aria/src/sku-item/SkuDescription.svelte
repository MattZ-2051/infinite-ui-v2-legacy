<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';

  export let issuer: Profile;
</script>

<div class="bg-white-opacity-75 absolute inset-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
  <div class="card-description-inner md:pt-6 p-4 text-white h-full flex flex-col font-medium">
    <div class="scrollbox">
      <TalentLink profile={issuer} class="text-primary text-2xl mb-4" imageClass="w-10 h-10" />
      <div class="flex-1 overflow-hidden mb-4">
        <div class="card-description-text">
          {#if issuer.descriptionShort}{issuer.descriptionShort}{/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
