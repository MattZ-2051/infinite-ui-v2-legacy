<script lang="ts">
  import type { Profile } from '$lib/sku-item/types';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';

  export let issuer: Profile;
  export let description: string;
</script>

<div class="description bg-black bg-opacity-50 text-white p-3 h-full w-full">
  <TalentLink profile={issuer} />
  <div class="line-clamp-4">
    <p>{@html description}</p>
  </div>
</div>

<style>
  .description {
    --verify-icon-color: rgba(255, 255, 255, 0.5);
  }
</style>
