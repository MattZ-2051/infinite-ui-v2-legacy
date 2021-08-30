<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';

  export let issuer: Profile;
</script>

<div class="bg-white-opacity-75 absolute inset-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
  <div class="card-description-inner pt-6 pb-4 px-4 text-white h-full flex flex-col font-medium">
    <TalentLink profile={issuer} class="text-primary text-2xl mb-4" imageClass="w-10 h-10" />
    <div class="flex-1 overflow-hidden mb-4">
      <div
        class="card-description-text line-clamp-4 sm:line-clamp-8 md:line-clamp-8 lg:line-clamp-6 xl:line-clamp-5 2xl:line-clamp-8"
      >
        <!-- {sku.description} -->
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci excepturi eius suscipit. Sint, animi assumenda
        perspiciatis molestias sequi numquam iure ipsam beatae nemo inventore facere recusandae voluptates. Iste, harum itaque!
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .card-description-inner {
    background: rgba(196, 196, 196, 0.85);
  }
</style>
